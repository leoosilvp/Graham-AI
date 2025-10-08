export async function sendMessageToAI(messages, attachedFiles = []) {
  const filesToSend = await Promise.all(
    attachedFiles.map(async (file) => {
      const text = await file.text();
      return { name: file.name, content: text };
    })
  );

  const payload = {
    messages,
    files: filesToSend,
  };

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro na comunicação com o backend");
  }

  return response.json();
}
