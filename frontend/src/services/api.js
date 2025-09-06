export async function sendMessageToAI(message) {
  const response = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Erro na comunicação com o backend");
  }

  return response.json();
}
