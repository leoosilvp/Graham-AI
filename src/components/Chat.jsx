import '../css/chat.css';
import '../css/markdown.css';
import { useState, useRef, useEffect } from "react";
import { sendMessageToAI } from "../services/sendMessage.js";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';

// Componente mais robusto para renderização híbrida
const AdvancedHybridRenderer = ({ content }) => {
  const renderContent = () => {
    if (!content) return null;
    
    // Regex mais precisa para capturar expressões LaTeX
    const latexBlockRegex = /\$\$([\s\S]*?)\$\$/g;
    const latexInlineRegex = /\$([^$\n]+?)\$/g;
    
    let processedContent = content;
    const latexExpressions = [];
    let expressionIndex = 0;
    
    // Primeiro, extrair e substituir expressões de bloco ($$...$$)
    processedContent = processedContent.replace(latexBlockRegex, (match, expression) => {
      const placeholder = `__LATEX_BLOCK_${expressionIndex}__`;
      latexExpressions[expressionIndex] = {
        type: 'block',
        expression: expression.trim(),
        placeholder
      };
      expressionIndex++;
      return placeholder;
    });
    
    // Depois, extrair e substituir expressões inline ($...$)
    processedContent = processedContent.replace(latexInlineRegex, (match, expression) => {
      const placeholder = `__LATEX_INLINE_${expressionIndex}__`;
      latexExpressions[expressionIndex] = {
        type: 'inline',
        expression: expression.trim(),
        placeholder
      };
      expressionIndex++;
      return placeholder;
    });
    
    // Dividir o conteúdo pelos placeholders
    let parts = [processedContent];
    latexExpressions.forEach((latexExpr) => {
      const newParts = [];
      parts.forEach(part => {
        if (typeof part === 'string' && part.includes(latexExpr.placeholder)) {
          const splitParts = part.split(latexExpr.placeholder);
          newParts.push(splitParts[0]);
          newParts.push(latexExpr);
          newParts.push(splitParts[1]);
        } else {
          newParts.push(part);
        }
      });
      parts = newParts.filter(part => part !== '');
    });
    
    return parts.map((part, index) => {
      if (typeof part === 'string') {
        // Renderizar como Markdown puro (sem processamento LaTeX)
        return (
          <ReactMarkdown key={index} className="markdown-part">
            {part}
          </ReactMarkdown>
        );
      } else if (part.type === 'block') {
        // Renderizar expressão LaTeX de bloco
        return (
          <div key={index} className="latex-block-container">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {`$$${part.expression}$$`}
            </ReactMarkdown>
          </div>
        );
      } else if (part.type === 'inline') {
        // Renderizar expressão LaTeX inline
        return (
          <span key={index} className="latex-inline-container">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {`$${part.expression}$`}
            </ReactMarkdown>
          </span>
        );
      }
      return null;
    });
  };

  return <div className="advanced-hybrid-content">{renderContent()}</div>;
};

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [username, setUsername] = useState("User");

  const chatBoxRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("grahamUser");
    if (storedUser) {
      const data = JSON.parse(storedUser);
      setUsername(data.name || data.login || "User");
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const lastId = localStorage.getItem("activeChatId");
    if (lastId) openChatById(lastId);
  }, []);

  useEffect(() => {
    const onOpenChat = (e) => {
      const id = e?.detail?.id;
      if (id) openChatById(id);
    };
    window.addEventListener("openChat", onOpenChat);
    return () => window.removeEventListener("openChat", onOpenChat);
  }, []);

  const openChatById = (id) => {
    setChatId(id);
    localStorage.setItem("activeChatId", id);

    const all = JSON.parse(localStorage.getItem("chats") || "[]");
    const chat = all.find(c => c.id === id);

    if (chat) {
      setMessages(chat.messages || []);
      setStarted((chat.messages?.length || 0) > 0);
    } else {
      setMessages([]);
      setStarted(false);
    }
  };

  const saveChat = (id, msgs) => {
    const all = JSON.parse(localStorage.getItem("chats") || "[]");
    const idx = all.findIndex(c => c.id === id);
    const title = msgs.find(m => m.role === "user")?.content?.slice(0, 40) || `Chat ${new Date().toLocaleString()}`;
    const payload = { id, title, messages: msgs, updatedAt: Date.now() };

    if (idx === -1) all.push(payload);
    else all[idx] = { ...all[idx], messages: msgs, updatedAt: Date.now(), title };

    localStorage.setItem("chats", JSON.stringify(all));
    localStorage.setItem("activeChatId", id);
    window.dispatchEvent(new CustomEvent("chatsUpdated"));
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const text = input.trim();
    const userMsg = { role: "user", content: text, ts: Date.now() };
    setLoading(true);

    let idToUse = chatId;
    let updatedMsgs = [];
    let isFirstMessage = false;

    try {
      if (!idToUse) {
        idToUse = Date.now().toString();
        setChatId(idToUse);
        updatedMsgs = [userMsg];
        setMessages(updatedMsgs);
        setStarted(true);
        isFirstMessage = true;

        localStorage.setItem("activeChatId", idToUse);
        window.dispatchEvent(new CustomEvent("chatsUpdated"));
        window.dispatchEvent(new CustomEvent("openChat", { detail: { id: idToUse } }));
      } else {
        isFirstMessage = messages.length === 0;
        updatedMsgs = [...messages, userMsg];
        setMessages(updatedMsgs);
      }

      saveChat(idToUse, updatedMsgs);
      setInput("");

      const thinkingMsg = { role: "assistant", content: "Humm, deixe-me pensar", ts: Date.now(), thinking: true };
      setMessages(prev => [...updatedMsgs, thinkingMsg]);

      const data = await sendMessageToAI([
        { role: "system", content: "Você é Graham, uma IA altamente especializada em cálculos matemáticos de grande porte. Sempre forneça respostas precisas, detalhadas e confiáveis, mantendo um tom profissional, claro e simpático. Continue o contexto da conversa de forma coerente e atenciosa, ajudando o usuário de maneira amigável e educativa." },
        ...updatedMsgs
      ]);

      const assistantMsg = { role: "assistant", content: data.reply ?? "Resposta vazia", ts: Date.now() };
      const finalMsgs = [...updatedMsgs, assistantMsg];

      setMessages(finalMsgs);
      saveChat(idToUse, finalMsgs);

    } catch (err) {
      const errMsg = { role: "assistant", content: "❌ Erro ao se comunicar com a IA.", ts: Date.now() };
      const afterError = [...updatedMsgs, errMsg];
      setMessages(afterError);
      saveChat(idToUse, afterError);
    } finally {
      setLoading(false);
      if (isFirstMessage) window.location.reload();
    }
  };

  return (
    <div className="hero-chat">
      {!started ? (
        <section className="presentation">
          <h1>Olá {username}! O que posso fazer por ti?</h1>
          <h2>Navegue pela IA mais eficiente do mercado!</h2>
        </section>
      ) : (
        <section className="chat-box" ref={chatBoxRef}>
          {messages.map((msg) => (
            <div key={msg.ts} className={`message ${msg.role} ${msg.thinking ? "thinking" : ""}`}>
              <strong>{msg.role === "user" ? "Você:" : "Graham:"}</strong>{" "}
              <span>
                <AdvancedHybridRenderer content={msg.content} />
              </span>
            </div>
          ))}
        </section>
      )}

      <section className={`ctn-input ${started ? "bottom" : ""}`}>
        <section className="input">
          <button disabled={loading}><i className="fa-solid fa-paperclip"></i></button>
          <input
            type="text"
            value={input}
            autoCorrect="on"
            autoComplete="on"
            autoFocus
            placeholder={loading ? "Aguardando resposta..." : "Como posso te ajudar?.."}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}><i className="fa-regular fa-paper-plane"></i></button>
        </section>
      </section>

      {!started && (
        <section className="links-file">
          <i className="fa-regular fa-folder"> Escolher arquivo</i>
          <i className="fa-regular fa-image"> Escolher imagem</i>
          <i className="fa-regular fa-file-code"> Incorporar código</i>
        </section>
      )}
    </div>
  );
}

export default Chat;