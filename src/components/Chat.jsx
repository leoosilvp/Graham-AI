import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { sendMessageToAI } from "../services/sendMessage.js";
import '../css/chat.css';

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

    const userText = input.trim();
    const userMsg = { role: "user", content: userText, ts: Date.now() };
    setLoading(true);
    setInput("");

    let idToUse = chatId;
    let updatedMsgs = [];

    if (!idToUse) {
      idToUse = Date.now().toString();
      setChatId(idToUse);
      updatedMsgs = [userMsg];
      setStarted(true);
      localStorage.setItem("activeChatId", idToUse);
      window.dispatchEvent(new CustomEvent("chatsUpdated"));
      window.dispatchEvent(new CustomEvent("openChat", { detail: { id: idToUse } }));
    } else {
      updatedMsgs = [...messages, userMsg];
    }

    setMessages(updatedMsgs);
    saveChat(idToUse, updatedMsgs);

    const aiMsg = { role: "assistant", content: "", typing: true, ts: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    const aiIndex = updatedMsgs.length;

    try {
      const data = await sendMessageToAI(userText);
      const reply = data.reply || "Resposta vazia";

      for (let i = 1; i <= reply.length; i++) {
        await new Promise(r => setTimeout(r, 20));
        setMessages(prev =>
          prev.map((m, idx) => idx === aiIndex ? { ...m, content: reply.slice(0, i) } : m)
        );
      }

      setMessages(prev =>
        prev.map((m, idx) => idx === aiIndex ? { ...m, typing: false } : m)
      );

      saveChat(idToUse, [...updatedMsgs, { ...aiMsg, content: reply, typing: false }]);

    } catch (err) {
      const errorMsg = { role: "assistant", content: "❌ Erro ao se comunicar com a IA.", ts: Date.now() };
      setMessages(prev => [...updatedMsgs, errorMsg]);
      saveChat(idToUse, [...updatedMsgs, errorMsg]);
    } finally {
      setLoading(false);
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
          {messages.map((msg, i) => (
            <p key={i} className={`message ${msg.role} ${msg.typing ? "typing" : ""}`}>
              <strong>{msg.role === "user" ? "Você:" : "Graham:"}</strong>{" "}
              <span>
                <ReactMarkdown className="markdown">
                  {msg.content}{msg.typing && <span className="cursor">|</span>}
                </ReactMarkdown>
              </span>
            </p>
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
