export async function sendMessageToAI(messages, files, options = {}) {
  const controller = new AbortController();
  if (options.signal) options.signal.addEventListener("abort", () => controller.abort());

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

    const parts = buffer.split("\n\n");
    buffer = parts.pop();

    for (const part of parts) {
      if (part.startsWith("data: ")) {
        const dataStr = part.replace("data: ", "").trim();
        if (dataStr === "[DONE]") break;

        try {
          const json = JSON.parse(dataStr);
          const token = json.choices?.[0]?.delta?.content || "";
          reply += token;
          if (options.onStream) options.onStream(token);
        } catch {
          continue;
        }
      }
    }
  }

  return reply.replace(/<｜begin▁of▁sentence｜>$/, "");
}
