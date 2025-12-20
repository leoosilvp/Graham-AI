export async function sendMessageToAI(messages, files, options = {}) {
  const controller = new AbortController();

  if (options.signal) {
    options.signal.addEventListener("abort", () => controller.abort());
  }

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
  let usageData = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("event:")) {
        const eventType = line.replace("event:", "").trim();

        continue;
      }

      if (line.startsWith("data:")) {
        const data = line.replace("data:", "").trim();

        if (data === "[DONE]") continue;

        try {
          const json = JSON.parse(data);

          if (json.totalTokens !== undefined) {
            usageData = json;

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
        } catch {
          // ignore
          continue;
        }
      }
    }
  }

  return reply;
}