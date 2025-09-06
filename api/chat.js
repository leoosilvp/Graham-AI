export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Mensagem não fornecida." });
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-5-nano",
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();

      return res.status(200).json({ reply: data.choices[0].message.content });
    } catch (err) {
      console.error("Erro na função chat:", err);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
