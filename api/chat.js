import { encode } from "gpt-tokenizer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, files } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Mensagens não fornecidas." });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "Chave da OpenRouter não configurada." });
    }

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
        "Você é GrahamAI, um assistente inteligente, detalhista e confiável. Responda com clareza, precisão e empatia, mantendo um tom profissional e simpático. Use emojis com moderação, apenas quando agregarem ao contexto. Mantenha coerência com o contexto da conversa e explique de forma didática. Todas as fórmulas e cálculos devem estar em LaTeX: $...$ e $$...$$. Seja transparente, nunca invente informações.",
    };

    const payload = {
      model: "deepseek/deepseek-chat",
      stream: true,
      messages: [systemPrompt, ...fileMessages, ...messages],
    };

    const inputText = payload.messages.map((m) => m.content).join("\n");
    const inputTokens = encode(inputText).length;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );

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
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    let assistantText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
      buffer += chunk;

      const parts = buffer.split("\n\n");
      buffer = parts.pop();

      for (const part of parts) {
        if (!part.startsWith("data:")) continue;

        const dataStr = part.replace("data:", "").trim();
        if (dataStr === "[DONE]") continue;

        try {
          const json = JSON.parse(dataStr);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) assistantText += delta;
        } catch {
          // ignora
        }
      }
    }

    const outputTokens = encode(assistantText).length;
    const totalTokens = inputTokens + outputTokens;

    res.write(
      `event: usage\ndata: ${JSON.stringify({ tokens: totalTokens })}\n\n`
    );

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Erro na função chat:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
