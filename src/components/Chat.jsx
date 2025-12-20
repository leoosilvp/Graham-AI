import { sendMessageToAI } from "../services/sendMessage.js";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import '../css/chat.css';
import '../css/markdown.css';
import Alert from "./Alert.jsx";
import { Link } from "react-router-dom";
import Credits from "./Credits.jsx";

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
  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const codeInputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Carrega mensagens do localStorage ao montar
  useEffect(() => {
    const storedUser = localStorage.getItem("grahamUser");
    if (storedUser) {
      const data = JSON.parse(storedUser);
      setUsername(data.name || data.login || "User");
    }

    // Limpa qualquer estado de streaming pendente
    const activeId = localStorage.getItem("activeChatId");
    if (activeId) {
      const stored = localStorage.getItem("chats");
      if (stored) {
        const all = JSON.parse(stored);
        const chat = all.find((c) => c.id === activeId);
        
        if (chat) {
          // Remove propriedades de streaming das mensagens
          const cleanedMessages = (chat.messages || []).map(msg => ({
            ...msg,
            streaming: false, // Garante que streaming seja false
            thinking: false
          }));
          
          setMessages(cleanedMessages);
          setStarted(cleanedMessages.length > 0);
          setChatId(activeId);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const openChatById = useCallback((id) => {
    if (!id) return;
    setChatId(id);
    localStorage.setItem("activeChatId", id);

    const stored = localStorage.getItem("chats");
    const all = stored ? JSON.parse(stored) : [];
    const chat = all.find((c) => c.id === id);

    if (chat) {
      // Limpa estado de streaming ao carregar chat
      const cleanedMessages = (chat.messages || []).map(msg => ({
        ...msg,
        streaming: false,
        thinking: false
      }));
      setMessages(cleanedMessages);
      setStarted(cleanedMessages.length > 0);
    } else {
      setMessages([]);
      setStarted(false);
    }
  }, []);

  useEffect(() => {
    const lastId = localStorage.getItem("activeChatId");
    if (lastId) openChatById(lastId);
  }, [openChatById]);

  useEffect(() => {
    const onOpenChat = (e) => {
      const id = e?.detail?.id;
      if (id) openChatById(id);
    };
    window.addEventListener("openChat", onOpenChat);
    return () => window.removeEventListener("openChat", onOpenChat);
  }, [openChatById]);

  const saveChat = (id, msgs) => {
    const stored = localStorage.getItem("chats");
    const all = stored ? JSON.parse(stored) : [];

    const idx = all.findIndex((c) => c.id === id);
    const title = (() => {
      const msg = msgs.find((m) => m.role === "user")?.content || "";
      return msg.length >= 19 ? msg.slice(0, 19) + "..." : msg || "Nova conversa";
    })();

    // Remove propriedades de streaming antes de salvar
    const cleanedMessages = msgs.map(msg => {
      const { streaming, thinking, ...rest } = msg;
      return rest;
    });

    const payload = { 
      id, 
      title, 
      messages: cleanedMessages, 
      updatedAt: Date.now() 
    };

    if (idx === -1) all.push(payload);
    else all[idx] = payload;

    localStorage.setItem("chats", JSON.stringify(all));
    localStorage.setItem("activeChatId", id);
    window.dispatchEvent(new CustomEvent("chatsUpdated"));
  };

  const handleFileSelect = () => {
    // ... código existente ...
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (loading) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        setLoading(false);
        // Remove mensagens de streaming
        setMessages((prev) => prev.filter(m => !m.streaming));
        setMessages((prev) => [
          ...prev,
          { 
            role: "assistant", 
            content: "⚠️ Conversa cancelada pelo usuário.", 
            ts: Date.now() 
          },
        ]);
      }
      return;
    }

    if (!input.trim() && attachedFiles.length === 0) return;

    const text = input.trim();
    const userMsg = {
      role: "user",
      content: text,
      files: attachedFiles.map((f) => ({
        name: f.name,
        type: f.type,
        url: URL.createObjectURL(f),
      })),
      ts: Date.now(),
    };

    setLoading(true);
    abortControllerRef.current = new AbortController();

    let idToUse = chatId;
    let updatedMsgs = [];
    let isFirstMessage = false;

    try {
      if (!idToUse) {
        idToUse = Date.now().toString();
        setChatId(idToUse);
        updatedMsgs = [userMsg];
        setStarted(true);
        isFirstMessage = true;
      } else {
        isFirstMessage = messages.length === 0;
        updatedMsgs = [...messages, userMsg];
      }

      setInput("");
      setAttachedFiles([]);

      const thinkingMsg = {
        role: "assistant",
        content: "Humm, deixe-me pensar...",
        ts: Date.now(),
        streaming: true, // Marca como streaming
      };
      
      const initialMessages = [...updatedMsgs, thinkingMsg];
      setMessages(initialMessages);
      saveChat(idToUse, initialMessages);

      const systemPrompt = {
        role: "system",
        content:
          "Você é GrahamAI, um assistente inteligente, detalhista e confiável. Responda com clareza, precisão e empatia, mantendo um tom profissional e simpático. Use emojis apenas quando agregarem ao contexto. Mantenha coerência com o contexto e explique de forma didática. Todas as fórmulas e cálculos devem estar em LaTeX: $...$ (inline) e $$...$$ (bloco). Seja transparente, nunca invente informações. Estilo parecido com o ChatGPT, porém mais humano e acolhedor.",
      };

      let streamedContent = "Humm, deixe-me pensar...";

      await sendMessageToAI([systemPrompt, ...updatedMsgs], attachedFiles, {
        signal: abortControllerRef.current.signal,
        chatId: idToUse,
        onStream: (token) => {
          streamedContent += token;
          setMessages((prev) => {
            const updated = [...prev];
            const assistantIndex = updated.findIndex((m) => m.role === "assistant" && m.streaming);
            if (assistantIndex !== -1) {
              updated[assistantIndex] = {
                ...updated[assistantIndex],
                content: streamedContent,
              };
            }
            return updated;
          });
        },
      });

      // Remove a flag de streaming e salva
      const finalAssistant = {
        role: "assistant",
        content: streamedContent || "Resposta vazia.",
        ts: Date.now(),
      };

      const finalMessages = [...updatedMsgs, finalAssistant];
      
      // Atualiza estado removendo streaming
      setMessages(finalMessages);
      
      // Salva sem flags de streaming
      saveChat(idToUse, finalMessages);

    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      
      // Remove mensagens de streaming em caso de erro
      setMessages((prev) => prev.filter(m => !m.streaming));
      
      const errMsg = {
        role: "assistant",
        content:
          err.name === "AbortError"
            ? "Resposta cancelada."
            : "❌ Ocorreu um erro inesperado. Tente novamente mais tarde.",
        ts: Date.now(),
      };
      
      const errorMessages = [...updatedMsgs, errMsg];
      setMessages(errorMessages);
      saveChat(idToUse, errorMessages);
      
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
      
      if (isFirstMessage && idToUse) {
        openChatById(idToUse);
      }
    }
  };

  const toggleConf = useCallback(() => setShowConf((prev) => !prev), []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showConf &&
        confRef.current &&
        !confRef.current.contains(e.target) &&
        !e.target.closest(".btn-profile")
      ) {
        setShowConf(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showConf]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const stored = localStorage.getItem("chats");
      if (stored) {
        const all = JSON.parse(stored);
        const cleaned = all.map(chat => ({
          ...chat,
          messages: (chat.messages || []).map(msg => {
            const { streaming, thinking, ...rest } = msg;
            return rest;
          })
        }));
        localStorage.setItem("chats", JSON.stringify(cleaned));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="hero-chat">

      {!started ? (
        <>
          <section className="chat-header">
            <article className="notification-btn">
              <Link to='/notification' title="Notificações">
                <i className="fa-regular fa-bell" />
              </Link>
            </article>

            <Credits />
          </section>

          <section className="presentation">
            <h1>Olá {username}! O que posso fazer por ti?</h1>
            <h2>Navegue pela IA mais eficiente do mercado!</h2>
          </section>
        </>

      ) : (
        <section className="ctn-chat-box" ref={chatBoxRef}>
          <section className="chat-box">
            {messages.map((msg) => (
              <div
                key={msg.ts}
                className={`message ${msg.role} ${msg.streaming ? "thinking" : ""}`}
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
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.cc,.cxx,.h,.hpp,.cs,.go,.rs,.kt,.kts,.swift,.rb,.php,.sql,.r,.pl,.pm,.scala,.sh,.bash,.lua,.hs,.m,.dart,.html,.css,.json,.jsonc,.xml,.md,.txt"
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
            <i
              className={
                loading
                  ? "fa-solid fa-square"
                  : "fa-regular fa-paper-plane"
              }
            ></i>
          </button>
        </section>
      </section>

      {!started && (
        <section className="links-file">
          <i
            className="fa-regular fa-folder"
            onClick={() => fileInputRef.current.click()}
          >
            Escolher arquivo
          </i>
          <i
            className="fa-regular fa-image"
            onClick={() => imageInputRef.current.click()}
          >
            Escolher imagem
          </i>
          <i
            className="fa-regular fa-file-code"
            onClick={() => codeInputRef.current.click()}
          >
            Escolher código
          </i>

          <input type="file" ref={fileInputRef} hidden multiple onChange={handleFileSelect} />
          <input type="file" ref={imageInputRef} hidden multiple accept="image/*" onChange={handleFileSelect} />
          <input type="file" ref={codeInputRef} hidden multiple accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.cc,.cxx,.h,.hpp,.cs,.go,.rs,.kt,.kts,.swift,.rb,.php,.sql,.r,.pl,.pm,.scala,.sh,.bash,.lua,.hs,.m,.dart,.html,.css,.json,.jsonc,.xml,.md,.txt" onChange={handleFileSelect} />
        </section>
      )}

      <Alert visible={showAlert} message={alertMsg} />
    </div>
  );
}

export default Chat;
