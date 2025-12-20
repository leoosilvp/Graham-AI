import { useState, useEffect, useCallback } from "react";

function getTodayDate() {
  const now = new Date();
  return `${String(now.getDate()).padStart(2, "0")}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${now.getFullYear()}`;
}

export function useChats() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(
    localStorage.getItem("activeChatId") || null
  );

  const loadChats = useCallback(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("chats") || "[]");

      const normalized = saved.map((chat) => ({
        ...chat,
        date: chat.date || getTodayDate(),
        usageToken: chat.usageToken ?? 0,
      }));

      const sorted = normalized.sort(
        (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
      );

      setChats(sorted);
    } catch (err) {
      console.error("Erro ao carregar chats:", err);
      setChats([]);
    }
  }, []);

  const saveChats = useCallback((updated) => {
    try {
      localStorage.setItem("chats", JSON.stringify(updated));
      setChats(updated);
      window.dispatchEvent(new CustomEvent("chatsUpdated"));
    } catch (err) {
      console.error("Erro ao salvar chats:", err);
    }
  }, []);

  const deleteChat = useCallback(
    (id) => {
      try {
        const updated = chats.filter((c) => c.id !== id);
        saveChats(updated);

        if (id === activeChatId) {
          localStorage.removeItem("activeChatId");
          setActiveChatId(null);
          window.dispatchEvent(
            new CustomEvent("openChat", { detail: { id: null } })
          );
          window.location.reload();
        }
      } catch (err) {
        console.error("Erro ao deletar chat:", err);
      }
    },
    [chats, activeChatId, saveChats]
  );

  const updateChatTitle = useCallback(
    (id, newTitle) => {
      try {
        const updated = chats.map((c) =>
          c.id === id
            ? { ...c, title: newTitle.trim(), updatedAt: Date.now() }
            : c
        );
        saveChats(updated);
      } catch (err) {
        console.error("Erro ao atualizar título:", err);
      }
    },
    [chats, saveChats]
  );

  const openChat = useCallback((id) => {
    try {
      localStorage.setItem("activeChatId", id);
      setActiveChatId(id);
      window.dispatchEvent(new CustomEvent("openChat", { detail: { id } }));
      window.location.href = "/chat";
    } catch (err) {
      console.error("Erro ao abrir chat:", err);
    }
  }, []);

  useEffect(() => {
    loadChats();

    const onUpdated = () => {
      console.log("Chats atualizados, recarregando...");
      loadChats();
    };

    window.addEventListener("chatsUpdated", onUpdated);

    return () => {
      window.removeEventListener("chatsUpdated", onUpdated);
    };
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