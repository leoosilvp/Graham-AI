import { useState, useEffect, useRef } from "react";
import "../css/aside.css";

function CardsChat() {
    const [chats, setChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(localStorage.getItem("activeChatId"));
    const [hoveredMenuId, setHoveredMenuId] = useState(null);
    const [editingChatId, setEditingChatId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const editRef = useRef(null);

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

    // Fecha edição ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editingChatId && editRef.current && !editRef.current.contains(event.target)) {
                cancelEdit();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [editingChatId]);

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
        window.location.reload();
    };

    const startEditing = (id, currentTitle) => {
        setEditingChatId(id);
        setEditTitle(currentTitle);
    };

    const confirmEdit = () => {
        if (!editTitle.trim()) return;
        const all = JSON.parse(localStorage.getItem("chats") || "[]");
        const updated = all.map(c =>
            c.id === editingChatId ? { ...c, title: editTitle.trim(), updatedAt: Date.now() } : c
        );
        localStorage.setItem("chats", JSON.stringify(updated));
        setEditingChatId(null);
        setEditTitle("");
        window.dispatchEvent(new CustomEvent("chatsUpdated"));
    };

    const cancelEdit = () => {
        setEditingChatId(null);
        setEditTitle("");
    };

    return (
        <div className="ctn-chats">
            <h1>Chats</h1>
            <section className="chats">
                {filteredChats.length === 0 && <p>Sem conversas</p>}
                {filteredChats.map(c => {
                    const isMenuVisible = hoveredMenuId === c.id;
                    const isEditing = editingChatId === c.id;

                    return (
                        <article
                            key={c.id}
                            className={`card-chat ${c.id === activeChatId ? "active" : ""}`}
                            onClick={() => openChat(c.id)}
                        >
                            <section className="title-card">
                                <i className="fa-solid fa-comments"></i>

                                {isEditing ? (
                                    <div className="inline-edit" ref={editRef}>
                                        <input
                                            type="text"
                                            value={editTitle}
                                            autoFocus
                                            maxLength={20}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    confirmEdit();
                                                } else if (e.key === "Escape") {
                                                    e.preventDefault();
                                                    cancelEdit();
                                                }
                                            }}
                                        />
                                        <button onClick={confirmEdit}>
                                            <i className="fa-solid fa-square-check"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <h1>{c.title}</h1>
                                )}
                            </section>

                            <section
                                className="options-card"
                                onMouseEnter={() => setHoveredMenuId(c.id)}
                                onMouseLeave={() => setHoveredMenuId(null)}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {!isMenuVisible && !isEditing && (
                                    <button className="ellipsis-btn">
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>
                                )}

                                {isMenuVisible && !isEditing && (
                                    <>
                                        <button onClick={(e) => { e.stopPropagation(); deleteChat(c.id); }}>
                                            <i className="fa-regular fa-trash-can"></i>
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); startEditing(c.id, c.title); }}>
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </button>
                                    </>
                                )}
                            </section>
                        </article>
                    );
                })}
            </section>
        </div>
    );
}

export default CardsChat;
