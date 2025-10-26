export async function sendMessageToAI(messages, files, options = {}) {
  const controller = new AbortController();
  if (options.signal) {
    options.signal.addEventListener("abort", () => controller.abort());
  }

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, files }),
    signal: controller.signal,
  });

  if (!response.ok) {
    throw new Error("Erro na requisição da IA");
  }

  const data = await response.json();

  return data.reply ? data.reply.replace(/<｜begin▁of▁sentence｜>$/, "") : "";
}
