export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages, files } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0)
      return res.status(400).json({ error: "Mensagens não fornecidas." });

    if (!process.env.OPENROUTER_API_KEY)
      return res.status(500).json({ error: "Chave da OpenRouter não configurada." });

    let fileMessages = [];
    if (files && Array.isArray(files)) {
      fileMessages = files.map((f) => ({
        role: "user",
        content: `Conteúdo do arquivo "${f.name}":\n${f.content || "(vazio)"}`,
      }));
    }

    const systemPrompt = {
      role: "system",
      content:
        "Você é GrahamAI, um assistente inteligente, detalhista e confiável. Responda com clareza, precisão e empatia, mantendo um tom profissional e simpático. Use emojis com moderação, apenas quando agregarem ao contexto. Mantenha coerência com o contexto da conversa e explique de forma didática. Todas as fórmulas e cálculos devem estar em LaTeX: $...$ e $$...$$. Seja transparente, nunca invente informações. Estilo parecido com o ChatGPT, porém mais humano e acolhedor.",
    };

    const payload = {
      model: "deepseek/deepseek-chat-v3.1:free",
      stream: true,
      messages: [systemPrompt, ...fileMessages, ...messages],
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Erro na API da OpenRouter:", err);
      return res.status(500).json({ error: "Erro na comunicação com a OpenRouter" });
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      res.write(chunk);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Erro na função chat:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
