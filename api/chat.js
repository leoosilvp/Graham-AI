export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Mensagens não fornecidas." });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "Chave da OpenRouter não configurada." });
    }

    const systemPrompt = {
      role: "system",
      content:
        "Você é Graham, uma IA especialista em cálculos matemáticos de alto porte. Sempre responda como Graham e continue o contexto da conversa.",
    };

    const payload = {
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [systemPrompt, ...messages],
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro na API da OpenRouter:", data);
      return res.status(500).json({
        error: data.error?.message || "Erro na comunicação com a OpenRouter",
      });
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Resposta inesperada da OpenRouter:", data);
      return res.status(500).json({ error: "Resposta inesperada da OpenRouter" });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error("Erro na função chat:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
