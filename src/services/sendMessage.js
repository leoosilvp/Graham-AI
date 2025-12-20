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

  if (!response.ok) throw new Error("Erro na requisição da IA");

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";
  let reply = "";
  let currentEvent = "message";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop();

    for (const evt of events) {
      const lines = evt.split("\n");

      for (const line of lines) {
        if (line.startsWith("event:")) {
          currentEvent = line.replace("event:", "").trim();
          continue;
        }

        if (!line.startsWith("data:")) continue;

        const data = line.replace("data:", "").trim();

        if (currentEvent === "done") {
          return reply;
        }

        if (currentEvent === "usage") {
          try {
            const parsed = JSON.parse(data);

            if (options.chatId && parsed.totalTokens !== undefined) {
              window.dispatchEvent(
                new CustomEvent("chatUsage", {
                  detail: {
                    chatId: options.chatId,
                    tokens: parsed.totalTokens,
                  },
                })
              );
            }
          } catch {
            // ignore
          }
          continue;
        }

        if (data === "[DONE]") continue;

        try {
          const json = JSON.parse(data);
          const token = json.choices?.[0]?.delta?.content || "";
          reply += token;
          if (options.onStream) options.onStream(token);
        } catch {
          continue;
        }
      }
    }
  }

  return reply;
}
