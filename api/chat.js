import { encode } from "gpt-tokenizer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, files, chatId } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Mensagens não fornecidas." });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "Chave da OpenRouter não configurada." });
    }

    function countTokens(text = "") {
      if (!text) return 0;
      return encode(text).length;
    }

    function countTokensFromMessages(msgs = []) {
      return msgs.reduce((acc, m) => acc + countTokens(m.content || ""), 0);
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
        "Você é GrahamAI, um assistente inteligente, detalhista e confiável. Responda com clareza, precisão e empatia, mantendo um tom profissional e simpático.",
    };

    const payload = {
      model: "deepseek/deepseek-chat",
      stream: true,
      messages: [systemPrompt, ...fileMessages, ...messages],
    };

    const inputTokens =
      countTokensFromMessages([systemPrompt]) +
      countTokensFromMessages(fileMessages) +
      countTokensFromMessages(messages);

    console.log(`Input tokens: ${inputTokens} for chat ${chatId}`);

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
      console.error("Erro OpenRouter:", err);
      return res.status(500).json({ error: "Erro na comunicação com a OpenRouter" });
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    let outputTokens = 0;
    let receivedFirstToken = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim() === "") continue;

        if (line.startsWith("data: ")) {
          const data = line.slice(6).trim();

          if (data === "[DONE]") {
            const totalTokens = inputTokens + outputTokens;
            console.log(`Total tokens: ${totalTokens} for chat ${chatId}`);

            res.write(`data: ${JSON.stringify({ type: "usage", chatId, totalTokens })}\n\n`);
            res.write(`data: [DONE]\n\n`);
            continue;
          }

          try {
            const json = JSON.parse(data);
            const content = json.choices?.[0]?.delta?.content;

            if (content) {
              if (!receivedFirstToken) {
                receivedFirstToken = true;
                console.log("Recebendo stream da IA...");
              }

              outputTokens += countTokens(content);
              res.write(`data: ${JSON.stringify(json)}\n\n`);
            } else if (json.choices?.[0]?.delta?.role) {
              res.write(`data: ${JSON.stringify(json)}\n\n`);
            }
          } catch (err) {
            console.error("Erro ao parsear JSON:", err, "Data:", data);
          }
        }
      }
    }

    res.end();

  } catch (err) {
    console.error("Erro interno:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}