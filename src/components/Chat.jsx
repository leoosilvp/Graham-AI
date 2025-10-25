import { sendMessageToAI } from "../services/sendMessage.js";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import '../css/chat.css';
import '../css/markdown.css';
import Alert from "./Alert.jsx";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [username, setUsername] = useState("User");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const chatBoxRef = useRef(null);
  const confRef = useRef(null);
  const [showConf, setShowConf] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const codeInputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("grahamUser");
    if (storedUser) {
      const data = JSON.parse(storedUser);
      setUsername(data.name || data.login || "User");
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
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
    const chat = all.find((c) => c.id === id);

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
    const idx = all.findIndex((c) => c.id === id);
    const title = (() => {
      const msg = msgs.find((m) => m.role === "user")?.content || '';
      return msg.length >= 19 ? msg.slice(0, 19) + '...' : msg || 'Nova conversa';
    })();
    const payload = { id, title, messages: msgs, updatedAt: Date.now() };

    if (idx === -1) all.push(payload);
    else all[idx] = { ...all[idx], messages: msgs, updatedAt: Date.now(), title };

    localStorage.setItem("chats", JSON.stringify(all));
    localStorage.setItem("activeChatId", id);
    window.dispatchEvent(new CustomEvent("chatsUpdated"));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (attachedFiles.length + files.length > 8) {
      setShowAlert(true);
      setShowConf(false);
      setTimeout(() => setShowAlert(false), 4000);
      return;
    }

    setAttachedFiles((prev) => [...prev, ...files]);
    setShowConf(false);
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  let abortController = null;

  const handleSend = async () => {
    if (loading) {
      if (abortController) {
        abortController.abort();
        setLoading(false);
        const cancelMsg = {
          role: "assistant",
          content: "⚠️ Conversa cancelada pelo usuário.",
          ts: Date.now(),
        };
        setMessages((prev) => [...prev, cancelMsg]);
      }
      return;
    }

    if (!input.trim() && attachedFiles.length === 0) return;

    const text = input.trim();
    const userMsg = {
      role: "user",
      content: text || "file",
      files: attachedFiles.map((f) => ({
        name: f.name,
        type: f.type,
        url: URL.createObjectURL(f),
      })),
      ts: Date.now(),
    };

    setLoading(true);
    abortController = new AbortController();

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
      setAttachedFiles([]);

      const thinkingMsg = {
        role: "assistant",
        content: "Humm, deixe-me pensar...",
        ts: Date.now(),
        thinking: true,
      };
      setMessages([...updatedMsgs, thinkingMsg]);

      const systemPrompt = {
        role: "system",
        content: "Você é GrahamAI, um assistente inteligente, detalhista e confiável. Responda com clareza, precisão e empatia, mantendo um tom profissional e simpático.Use emojis com moderação, apenas quando agregarem ao contexto. Mantenha coerência com o contexto da conversa e transições naturais. Explique de forma didática e completa, com exemplos práticos quando útil. Todas as fórmulas e cálculos devem estar em LaTeX: $...$ para inline $$...$$ para bloco Estruture respostas com organização visual (negrito, listas, parágrafos curtos). Seja transparente e educado — nunca invente informações. Adote um estilo parecido com o ChatGPT, mas com toque humano e acolhedor.",
      };

      const data = await sendMessageToAI(
        [systemPrompt, ...updatedMsgs],
        attachedFiles,
        { signal: abortController.signal }
      );

      const assistantMsg = {
        role: "assistant",
        content: data.reply ?? "Resposta vazia",
        ts: Date.now(),
      };
      const finalMsgs = [...updatedMsgs, assistantMsg];

      setMessages(finalMsgs);
      saveChat(idToUse, finalMsgs);

      // 🔽 Salvar imagens geradas pela IA no localStorage (sem alterar nada do fluxo)
      try {
        const imageUrls = [];

        // Captura URLs diretas ou markdown de imagem
        const regexMarkdown = /!\[.*?\]\((.*?)\)/g;
        const regexUrl = /(https?:\/\/[^\s]+?\.(?:png|jpg|jpeg|gif|webp))/g;

        let match;
        while ((match = regexMarkdown.exec(data.reply)) !== null) {
          imageUrls.push(match[1]);
        }
        while ((match = regexUrl.exec(data.reply)) !== null) {
          imageUrls.push(match[1]);
        }

        if (imageUrls.length > 0) {
          const stored = JSON.parse(localStorage.getItem("libraryImages") || "[]");
          const updated = [
            ...stored,
            ...imageUrls.map((url) => ({
              url,
              chatId: idToUse,
              timestamp: Date.now(),
            })),
          ];
          localStorage.setItem("libraryImages", JSON.stringify(updated));
        }
      } catch (err) {
        console.error("Erro ao salvar imagem no localStorage:", err);
      }

    } catch (err) {

      let userMessage = "❌ Ocorreu um erro inesperado. Tente novamente em instantes.";

      if (err.name === "AbortError") {
        userMessage = "Resposta cancelada.";
      } else {
        const code = err?.error?.code;
        const message = err?.error?.message || err?.message || "";

        if (code === 429 || message.toLowerCase().includes("rate-limit")) {
          userMessage = "⚠️ O servidor está sobrecarregado. Aguarde alguns segundos e tente novamente.";
        } else if (code === 401 || message.includes("401")) {
          userMessage = "🔑 Erro de autenticação com a API. Verifique sua chave de acesso.";
        } else if (code === 500 || message.includes("500")) {
          userMessage = "💥 Erro interno do servidor da IA. Tente novamente mais tarde.";
        } else if (message.toLowerCase().includes("network") || message.toLowerCase().includes("fetch")) {
          userMessage = "🌐 Falha de conexão. Verifique sua internet.";
        }
      }

      console.error(userMessage + ' Erro: ' + err);

      const errMsg = {
        role: "assistant",
        content: userMessage,
        ts: Date.now(),
      };

      const afterError = [...updatedMsgs, errMsg];
      setMessages(afterError);
      saveChat(idToUse, afterError);
    } finally {
      setLoading(false);
      if (isFirstMessage) window.location.reload();
    }
  };

  const toggleConf = useCallback(() => {
    setShowConf((prev) => !prev);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        showConf &&
        confRef.current &&
        !confRef.current.contains(e.target) &&
        !e.target.closest(".btn-profile")
      ) {
        setShowConf(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showConf]);

  return (
    <div className="hero-chat">
      {!started ? (
        <section className="presentation">
          <h1>Olá {username}! O que posso fazer por ti?</h1>
          <h2>Navegue pela IA mais eficiente do mercado!</h2>
        </section>
      ) : (

        <section className="ctn-chat-box" ref={chatBoxRef}>
          <section className="chat-box">
            {messages.map((msg) => (
              <div
                key={msg.ts}
                className={`message ${msg.role} ${msg.thinking ? "thinking" : ""}`}
              >
                <strong>{msg.role === "user" ? "Você:" : "Graham:"}</strong>{" "}
                <div className="markdown-wrapper">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {msg.files && msg.files.length > 0 && (
                  <div className="msg-files">
                    {msg.files.map((file, i) => (
                      <div key={i} className="msg-file">
                        {file.type.startsWith("image/") ? (
                          <img src={file.url} alt={file.name} />
                        ) : (
                          <a href={file.url} target="_blank" rel="noopener noreferrer">
                            <i className="fa-regular fa-file"></i> {file.name}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        </section>
      )}

      <section className={`ctn-input ${started ? "bottom" : ""}`}>
        <section className="input">
          <button onClick={toggleConf} disabled={loading}>
            <i className="fa-solid fa-paperclip"></i>
          </button>

          {showConf && (
            <article ref={confRef} className="send-files">
              <button onClick={() => fileInputRef.current.click()}>
                <i className="fa-regular fa-folder"></i> Escolher arquivo
              </button>
              <button onClick={() => imageInputRef.current.click()}>
                <i className="fa-regular fa-image"></i> Escolher imagem
              </button>
              <button onClick={() => codeInputRef.current.click()}>
                <i className="fa-regular fa-file-code"></i> Escolher código
              </button>

              <input
                type="file"
                ref={fileInputRef}
                hidden
                multiple
                onChange={handleFileSelect}
              />
              <input
                type="file"
                ref={imageInputRef}
                hidden
                multiple
                accept="image/*"
                onChange={handleFileSelect}
              />
              <input
                type="file"
                ref={codeInputRef}
                hidden
                multiple
                accept=".js,.jsx,.ts,.tsx,.py,.html,.css"
                onChange={handleFileSelect}
              />
            </article>
          )}

          {attachedFiles.length > 0 && (
            <section className="ctn-file-preview">
              <div className="file-preview">
                {attachedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    {file.type.startsWith("image/") ? (
                      <img src={URL.createObjectURL(file)} alt={file.name} />
                    ) : (
                      <i className="fa-regular fa-file"></i>
                    )}
                    <span>{file.name}</span>
                    <button onClick={() => removeFile(index)}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

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

          <button onClick={handleSend} disabled={loading}>
            <i className={loading ? "fa-solid fa-square" : "fa-regular fa-paper-plane"}></i>
          </button>
        </section>
      </section>

      {!started && (
        <section className="links-file">
          <i className="fa-regular fa-folder" onClick={() => fileInputRef.current.click()}>
            Escolher arquivo
          </i>
          <i className="fa-regular fa-image" onClick={() => imageInputRef.current.click()}>
            Escolher imagem
          </i>
          <i className="fa-regular fa-file-code" onClick={() => codeInputRef.current.click()}>
            Escolher código
          </i>

          <input
            type="file"
            ref={fileInputRef}
            hidden
            multiple
            onChange={handleFileSelect}
          />
          <input
            type="file"
            ref={imageInputRef}
            hidden
            multiple
            accept="image/*"
            onChange={handleFileSelect}
          />
          <input
            type="file"
            ref={codeInputRef}
            hidden
            multiple
            accept=".js,.jsx,.ts,.tsx,.py,.html,.css"
            onChange={handleFileSelect}
          />
        </section>
      )}

      <Alert visible={showAlert} message="Limite excedido!" />
    </div>
  );
}

export default Chat;
