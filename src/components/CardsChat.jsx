import { useState, useRef, useEffect } from "react";
import "../css/aside.css";
import ConfirmDelete from "./ConfirmDelete";
import { useChats } from "../hooks/useChats";

function CardsChat() {
  const {
    chats,
    activeChatId,
    openChat,
    deleteChat,
    updateChatTitle,
    reload,
  } = useChats();

  const [hoveredMenuId, setHoveredMenuId] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [chatToDelete, setChatToDelete] = useState(null);
  const [filteredChats, setFilteredChats] = useState([]);
  const editRef = useRef(null);

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  useEffect(() => {
    const onFilter = (e) => {
      const query = e.detail.query.toLowerCase();
      setFilteredChats(chats.filter((c) => c.title.toLowerCase().includes(query)));
    };
    window.addEventListener("filterChats", onFilter);
    return () => window.removeEventListener("filterChats", onFilter);
  }, [chats]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editingChatId && editRef.current && !editRef.current.contains(event.target)) {
        cancelEdit();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingChatId]);

  const startEditing = (id, title) => {
    setEditingChatId(id);
    setEditTitle(title);
  };

  const confirmEdit = () => {
    if (!editTitle.trim()) return;
    updateChatTitle(editingChatId, editTitle);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingChatId(null);
    setEditTitle("");
  };

  const requestDelete = (chat) => {
    if (window.innerWidth < 720) confirmDelete(chat);
    else setChatToDelete(chat);
  };

  const confirmDelete = (chat = chatToDelete) => {
    if (!chat) return;
    deleteChat(chat.id);
    setChatToDelete(null);
    reload();
  };

  const cancelDelete = () => setChatToDelete(null);

  return (
    <div className="ctn-chats">
      <h1>Chats</h1>
      <section className="chats">
        {filteredChats.length === 0 && (
          <p><i className="fa-regular fa-comment-dots"></i> Sem conversas</p>
        )}

        {filteredChats.map((c) => {
          const isEditing = editingChatId === c.id;
          const isMenuVisible = hoveredMenuId === c.id;

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
                      maxLength={22}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") confirmEdit();
                        if (e.key === "Escape") cancelEdit();
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
                    <button onClick={() => requestDelete(c)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                    <button onClick={() => startEditing(c.id, c.title)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </>
                )}
              </section>
            </article>
          );
        })}
      </section>

      {chatToDelete && (
        <ConfirmDelete
          cActive="active"
          h1="Deletar chat?"
          h2="Isto irá deletar:"
          span={chatToDelete.title}
          h3="Esta ação não tem volta! Você concorda em deletar TODOS os conteúdos guardados durante este chat?"
          button1="Cancelar"
          onClick1={cancelDelete}
          button2="Deletar"
          onClick2={() => confirmDelete(chatToDelete)}
        />
      )}
    </div>
  );
}

export default CardsChat;
