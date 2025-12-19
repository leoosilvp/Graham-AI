export async function sendMessageToAI(messages, files, options = {}) {
  const controller = new AbortController();
  if (options.signal)
    options.signal.addEventListener("abort", () => controller.abort());

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, files }),
    signal: controller.signal,
  });

  if (!response.ok) throw new Error("Erro na requisição da IA");

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let reply = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n\n");
    buffer = chunks.pop();

    for (const chunk of chunks) {
      const lines = chunk.split("\n");

      let eventType = "message";
      let dataLine = "";

      for (const line of lines) {
        if (line.startsWith("event:")) {
          eventType = line.replace("event:", "").trim();
        }
        if (line.startsWith("data:")) {
          dataLine += line.replace("data:", "").trim();
        }
      }

      if (!dataLine) continue;

      if (eventType === "usage") {
        try {
          const { totalTokens } = JSON.parse(dataLine);

          window.dispatchEvent(
            new CustomEvent("chatUsage", {
              detail: {
                chatId: localStorage.getItem("activeChatId"),
                tokens: totalTokens,
              },
            })
          );
        } catch {
          /* ignora */
        }
        continue;
      }

      if (dataLine === "[DONE]") break;

      try {
        const json = JSON.parse(dataLine);
        const token = json.choices?.[0]?.delta?.content || "";
        reply += token;
        if (options.onStream) options.onStream(token);
      } catch {
        continue;
      }
    }
  }

  return reply.replace(/<｜begin▁of▁sentence｜>$/, "");
}
