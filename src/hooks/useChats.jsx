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

  // Carrega todos os chats do localStorage
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

  // Salva chats no localStorage e dispara evento de atualização
  const saveChats = useCallback((updated) => {
    const normalized = updated.map((chat) => ({
      ...chat,
      usageToken: chat.usageToken ?? 0,
    }));

    localStorage.setItem("chats", JSON.stringify(normalized));
    setChats(normalized);
    window.dispatchEvent(new CustomEvent("chatsUpdated"));
  }, []);

  // Deleta um chat específico
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
      }
    },
    [chats, activeChatId, saveChats]
  );

  // Atualiza título de chat
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

  // Abre chat ativo sem recarregar a página
  const openChat = useCallback((id) => {
    localStorage.setItem("activeChatId", id);
    setActiveChatId(id);
    window.dispatchEvent(new CustomEvent("openChat", { detail: { id } }));
  }, []);

  // Listener para atualizações e tokens de uso
  useEffect(() => {
    loadChats();

    const onUpdated = () => loadChats();

    const onUsage = (e) => {
      const { chatId, tokens } = e.detail || {};
      if (!chatId || tokens == null) return;

      setChats((prev) => {
        const updated = prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                usageToken: (chat.usageToken ?? 0) + tokens,
                updatedAt: Date.now(),
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
