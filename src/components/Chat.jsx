import { useState, useRef, useEffect } from "react";
import { sendMessageToAI } from "../services/api";
import '../css/chat.css';

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (!started) setStarted(true);

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const data = await sendMessageToAI(input);
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Erro ao se comunicar com a IA." },
      ]);
    } finally {
      setLoading(false);
    }

    setInput("");
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
              <strong>{msg.role === "user" ? "Você:" : "Indiano:"}</strong> <span>{msg.content}</span>
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
            autoComplete="on"
            autoFocus
            placeholder={loading ? "Aguardando resposta..." : "Como posso te ajudar?.." }
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}>
            <i className="fa-regular fa-paper-plane"></i>
          </button>
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
