import { useState, useEffect, useCallback } from "react";

export function useChats() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(localStorage.getItem("activeChatId") || null);

  const loadChats = useCallback(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("chats") || "[]");
      const sorted = saved.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      setChats(sorted);
    } catch {
      setChats([]);
    }
  }, []);

  const saveChats = useCallback((updated) => {
    localStorage.setItem("chats", JSON.stringify(updated));
    setChats(updated);
    window.dispatchEvent(new CustomEvent("chatsUpdated"));
  }, []);

  const deleteChat = useCallback(
    (id) => {
      const updated = chats.filter((c) => c.id !== id);
      saveChats(updated);

      if (id === activeChatId) {
        localStorage.removeItem("activeChatId");
        setActiveChatId(null);
        window.dispatchEvent(new CustomEvent("openChat", { detail: { id: null } }));
        window.location.reload()
    }
},
    [chats, activeChatId, saveChats]
  );

  const updateChatTitle = useCallback(
    (id, newTitle) => {
      const updated = chats.map((c) =>
        c.id === id ? { ...c, title: newTitle.trim(), updatedAt: Date.now() } : c
      );
      saveChats(updated);
    },
    [chats, saveChats]
  );

  const openChat = useCallback((id) => {
    localStorage.setItem("activeChatId", id);
    setActiveChatId(id);
    window.dispatchEvent(new CustomEvent("openChat", { detail: { id } }));
  }, []);

  useEffect(() => {
    loadChats();

    const onUpdated = () => loadChats();
    window.addEventListener("chatsUpdated", onUpdated);
    return () => window.removeEventListener("chatsUpdated", onUpdated);
  }, [loadChats]);

  return {
    chats,
    activeChatId,
    openChat,
    deleteChat,
    updateChatTitle,
    reload: loadChats,
  };
}
