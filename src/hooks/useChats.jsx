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
    } catch {
      setChats([]);
    }
  }, []);

  const saveChats = useCallback((updated) => {
    const normalized = updated.map((chat) => ({
      ...chat,
      usageToken: chat.usageToken ?? 0,
    }));

    localStorage.setItem("chats", JSON.stringify(normalized));
    setChats(normalized);
    window.dispatchEvent(new CustomEvent("chatsUpdated"));
  }, []);


  const deleteChat = useCallback(
    (id) => {
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
    },
    [chats, activeChatId, saveChats]
  );

  const updateChatTitle = useCallback(
    (id, newTitle) => {
      const updated = chats.map((c) =>
        c.id === id
          ? { ...c, title: newTitle.trim(), updatedAt: Date.now() }
          : c
      );
      saveChats(updated);
    },
    [chats, saveChats]
  );

  const openChat = useCallback((id) => {
    localStorage.setItem("activeChatId", id);
    setActiveChatId(id);
    window.dispatchEvent(new CustomEvent("openChat", { detail: { id } }));
    window.location.href = "/chat";
  }, []);

  useEffect(() => {
    loadChats();

    const onUpdated = () => loadChats();

    const onUsage = (e) => {
      const { chatId, tokens } = e.detail || {};
      if (!chatId || !tokens) return;

      setChats((prev) => {
        const updated = prev.map((chat) =>
          chat.id === chatId
            ? {
              ...chat,
              usageToken: (chat.usageToken ?? 0) + tokens,
              updatedAt: Date.now(),
              messages: chat.messages,
            }
            : chat
        );

        localStorage.setItem("chats", JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener("chatsUpdated", onUpdated);
    window.addEventListener("chatUsage", onUsage);

    return () => {
      window.removeEventListener("chatsUpdated", onUpdated);
      window.removeEventListener("chatUsage", onUsage);
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