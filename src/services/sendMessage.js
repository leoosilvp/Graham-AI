export async function sendMessageToAI(messages, files, options = {}) {
  const controller = new AbortController();
  if (options.signal) {
    options.signal.addEventListener("abort", () => controller.abort());
  }

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, files, stream: true }),
    signal: controller.signal,
  });

  if (!response.ok) {
    throw new Error("Erro na requisição da IA");
  }

  if (!response.body) {
    const data = await response.json();
    return data;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let partialText = "";
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      partialText += chunk;

      window.dispatchEvent(
        new CustomEvent("aiStreamChunk", { detail: { text: chunk } })
      );
    }
  }

  return { reply: partialText };
}
