export async function sendMessageToAI(messages) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro na comunicação com o backend");
  }

  return response.json();
}
