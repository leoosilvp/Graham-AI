import { useState, useEffect, useCallback } from "react";

function getTodayDate() {
  const now = new Date();
  return `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;
}

export function useChats() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(
    localStorage.getItem("activeChatId") || null
  );

  const loadChats = useCallback(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("chats") || "[]");
      console.log("Chats carregados do localStorage:", saved);

      const normalized = saved.map((chat) => ({
        ...chat,
        date: chat.date || getTodayDate(),
        usageToken: chat.usageToken || 0,
      }));

      const sorted = normalized.sort(
        (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
      );

      console.log("Chats normalizados e ordenados:", sorted);
      setChats(sorted);
    } catch (err) {
      console.error("Erro ao carregar chats:", err);
      setChats([]);
    }
  }, []);

  const saveChats = useCallback((updated) => {
    try {
      console.log("Salvando chats:", updated);
      localStorage.setItem("chats", JSON.stringify(updated));
      setChats(updated);
      window.dispatchEvent(new CustomEvent("chatsUpdated"));
    } catch (err) {
      console.error("Erro ao salvar chats:", err);
    }
  }, []);

  const updateChatTokens = useCallback((chatId, tokens) => {
    console.log(`Atualizando tokens para chat ${chatId}: ${tokens}`);
    setChats((prevChats) => {
      const chatExists = prevChats.find(chat => chat.id === chatId);
      if (!chatExists) {
        console.log(`Chat ${chatId} não encontrado para atualizar tokens`);
        return prevChats;
      }

      const updated = prevChats.map((chat) => {
        if (chat.id === chatId) {
          const updatedChat = {
            ...chat,
            usageToken: tokens,
            updatedAt: Date.now(),
          };
          console.log("Chat atualizado:", updatedChat);
          return updatedChat;
        }
        return chat;
      });

      localStorage.setItem("chats", JSON.stringify(updated));
      console.log("Chats atualizados no localStorage");

      return updated;
    });
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

    const handleChatUsage = (e) => {
      console.log("Evento chatUsage recebido:", e.detail);
      const { chatId, tokens } = e.detail || {};
      if (chatId && tokens !== undefined) {
        updateChatTokens(chatId, tokens);
      }
    };

    const onUpdated = () => {
      console.log("Chats atualizados, recarregando...");
      loadChats();
    };

    window.addEventListener("chatUsage", handleChatUsage);
    window.addEventListener("chatsUpdated", onUpdated);

    return () => {
      window.removeEventListener("chatUsage", handleChatUsage);
      window.removeEventListener("chatsUpdated", onUpdated);
    };
  }, [loadChats, updateChatTokens]);

  return {
    chats,
    activeChatId,
    openChat,
    deleteChat,
    updateChatTitle,
    reload: loadChats,
    updateChatTokens,
  };
}