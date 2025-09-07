import { useState, useEffect } from "react";
import "../css/aside.css";

function CardsChat() {
    const [chats, setChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(localStorage.getItem("activeChatId"));

    const loadChats = () => {
        const saved = JSON.parse(localStorage.getItem("chats") || "[]");
        saved.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        setChats(saved);
        setFilteredChats(saved);
        setActiveChatId(localStorage.getItem("activeChatId"));
    };

    useEffect(() => {
        loadChats();

        const onUpdated = () => loadChats();

        const onFilter = (e) => {
            const query = e.detail.query.toLowerCase();
            const currentChats = JSON.parse(localStorage.getItem("chats") || "[]");
            const filtered = currentChats.filter(c => c.title.toLowerCase().includes(query));
            setFilteredChats(filtered);
        };

        window.addEventListener("chatsUpdated", onUpdated);
        window.addEventListener("filterChats", onFilter);

        return () => {
            window.removeEventListener("chatsUpdated", onUpdated);
            window.removeEventListener("filterChats", onFilter);
        };
    }, []);

    const openChat = (id) => {
        localStorage.setItem("activeChatId", id);
        setActiveChatId(id);
        window.dispatchEvent(new CustomEvent("openChat", { detail: { id } }));
    };

    const deleteChat = (id) => {
        const all = JSON.parse(localStorage.getItem("chats") || "[]").filter(c => c.id !== id);
        localStorage.setItem("chats", JSON.stringify(all));
        if (id === activeChatId) localStorage.removeItem("activeChatId");
        window.dispatchEvent(new CustomEvent("chatsUpdated"));
    };

    return (
        <div className="ctn-chats">
            <h1>Your chats</h1>
            <section className="chats">
                {filteredChats.length === 0 && <p>No conversations</p>}
                {filteredChats.map(c => (
                    <article
                        key={c.id}
                        className={`card-chat ${c.id === activeChatId ? "active" : ""}`}
                        onClick={() => openChat(c.id)}
                    >
                        <section className="title-card">
                            <i className="fa-solid fa-comments"></i>
                            <h1>{c.title}</h1>
                        </section>
                        <button onClick={(e) => { e.stopPropagation(); deleteChat(c.id); window.location.reload();}}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default CardsChat;
