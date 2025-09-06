export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensagem não fornecida." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Chave da OpenAI não configurada." });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro na API da OpenAI:", data);
      return res.status(500).json({
        error: data.error?.message || "Erro na comunicação com a OpenAI",
      });
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Resposta inesperada da OpenAI:", data);
      return res.status(500).json({ error: "Resposta inesperada da OpenAI" });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error("Erro na função chat:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
