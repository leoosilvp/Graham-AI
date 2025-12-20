export async function sendMessageToAI(messages, files, options = {}) {
  const controller = new AbortController();

  if (options.signal) {
    options.signal.addEventListener("abort", () => controller.abort());
  }

  console.log("Enviando mensagem para IA, chatId:", options.chatId);

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages,
      files,
      chatId: options.chatId,
    }),
    signal: controller.signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro na resposta:", errorText);
    throw new Error("Erro na requisição da IA");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";
  let reply = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.trim() === "") continue;

      if (line.startsWith("data: ")) {
        const data = line.slice(6).trim();

        if (data === "[DONE]") {
          console.log("Stream finalizado");
          return reply;
        }

        try {
          const json = JSON.parse(data);

          if (json.type === "usage" && json.totalTokens !== undefined) {
            console.log("Recebido uso de tokens:", json);

            if (options.chatId) {
              window.dispatchEvent(
                new CustomEvent("chatUsage", {
                  detail: {
                    chatId: options.chatId,
                    tokens: json.totalTokens,
                  },
                })
              );
            }
            continue;
          }

          const token = json.choices?.[0]?.delta?.content || "";
          if (token) {
            reply += token;
            if (options.onStream) options.onStream(token);
          }
        } catch (err) {
          console.warn("Erro ao parsear linha:", line, err);
        }
      }
    }
  }

  return reply;
}