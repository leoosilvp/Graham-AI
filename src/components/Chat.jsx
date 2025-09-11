import { useState, useRef, useEffect } from "react";
import { sendMessageToAI } from "../services/sendMessage.js";
import '../css/chat.css';

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const lastId = localStorage.getItem("activeChatId");
    if (lastId) {
      setChatId(lastId);
      const all = JSON.parse(localStorage.getItem("chats") || "[]");
      const chat = all.find(c => c.id === lastId);
      if (chat) {
        setMessages(chat.messages || []);
        setStarted((chat.messages?.length || 0) > 0);
      }
    }
  }, []);

  useEffect(() => {
    const onOpenChat = (e) => {
      const id = e?.detail?.id;
      if (!id) return;
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
    window.addEventListener("openChat", onOpenChat);
    return () => window.removeEventListener("openChat", onOpenChat);
  }, []);

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
    if (!idToUse) {
      idToUse = Date.now().toString();
      setChatId(idToUse);
      setMessages([userMsg]);
      setStarted(true);
      saveChat(idToUse, [userMsg]);
    } else {
      const afterUser = [...messages, userMsg];
      setMessages(afterUser);
      saveChat(idToUse, afterUser);
    }

    setInput("");

    try {
      const data = await sendMessageToAI(text);
      const assistantMsg = { role: "assistant", content: data.reply ?? "Resposta vazia", ts: Date.now() };

      const finalMsgs = [...messages, userMsg, assistantMsg];
      setMessages(finalMsgs);
      saveChat(idToUse, finalMsgs);
    } catch (err) {
      const errMsg = { role: "assistant", content: "❌ Erro ao se comunicar com a IA.", ts: Date.now() };
      const afterError = [...messages, userMsg, errMsg];
      setMessages(afterError);
      saveChat(idToUse, afterError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-chat">
      {!started && (
        <section className="presentation">
          <h1>Olá Leonardo! O que posso fazer por ti?</h1>
          <h2>Navegue pela IA mais eficiente do mercado!</h2>
        </section>
      )}

      {started && (
        <section className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, i) => (
            <p key={i} className={msg.role}>
              <strong>{msg.role === "user" ? "Você:" : "Graham:"}</strong> <span>{msg.content}</span>
            </p>
          ))}
        </section>
      )}

      <section className={`ctn-input ${started ? "bottom" : ""}`}>
        <section className="input">
          <button disabled={loading}>
            <i className="fa-solid fa-paperclip"></i>
          </button>
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
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </section>
      </section>

      {!started && (<section className="links-file">
        <i className="fa-regular fa-folder"> Escolher arquivo</i> 
        <i className="fa-regular fa-image"> Escolher imagem</i> 
        <i className="fa-regular fa-file-code"> Incorporar código</i> 
      </section>)}
    </div>
  );
}

export default Chat;
