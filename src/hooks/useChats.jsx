import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const CHATS_STORAGE_KEY = "chats";

const loadChatsFromLocalStorage = () => {
  try {
    const chats = localStorage.getItem(CHATS_STORAGE_KEY);
    // Garante que o usageToken seja inicializado para chats antigos
    return chats ? JSON.parse(chats).map(chat => ({ ...chat, usageToken: chat.usageToken ?? 0 })) : [];
  } catch (error) {
    console.error("Erro ao carregar chats do localStorage:", error);
    return [];
  }
};

const saveChatsToLocalStorage = (chats) => {
  try {
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error("Erro ao salvar chats no localStorage:", error);
  }
};

export const useChats = () => {
  const [chats, setChats] = useState(loadChatsFromLocalStorage());
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    if (chats.length > 0 && !activeChatId) {
      setActiveChatId(chats[0].id);
    }
  }, [chats, activeChatId]);

  const createNewChat = () => {
    const newChat = {
      id: uuidv4(),
      title: "Novo Chat",
      date: new Date().toLocaleDateString("pt-BR"),
      messages: [],
      usageToken: 0, // Inicializa o contador de tokens
    };
    setChats((prevChats) => {
      const newChats = [newChat, ...prevChats];
      saveChatsToLocalStorage(newChats);
      return newChats;
    });
    setActiveChatId(newChat.id);
  };

  const openChat = (chatId) => {
    setActiveChatId(chatId);
  };

  const deleteChat = (chatId) => {
    setChats((prevChats) => {
      const newChats = prevChats.filter((chat) => chat.id !== chatId);
      saveChatsToLocalStorage(newChats);
      if (activeChatId === chatId) {
        setActiveChatId(newChats.length > 0 ? newChats[0].id : null);
      }
      return newChats;
    });
  };

  const updateChatMessages = (chatId, newMessages) => {
    setChats((prevChats) => {
      const newChats = prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: newMessages } : chat
      );
      saveChatsToLocalStorage(newChats);
      return newChats;
    });
  };

  // ====================================================================
  // NOVO CÓDIGO PARA RASTREAMENTO DE USO DE TOKENS
  // ====================================================================

  useEffect(() => {
    const handleChatUsage = (event) => {
      // O evento é disparado pela função sendMessageToAI
      const { chatId, tokens } = event.detail;

      if (chatId && tokens !== undefined) {
        setChats((prevChats) => {
          const newChats = prevChats.map((chat) => {
            if (chat.id === chatId) {
              // Atualiza o usageToken com o total de tokens fornecido pelo evento
              return { ...chat, usageToken: tokens };
            }
            return chat;
          });
          
          // Salva o estado atualizado no localStorage
          saveChatsToLocalStorage(newChats);
          return newChats;
        });
      }
    };

    // Adiciona o listener para o evento customizado 'chatUsage'
    window.addEventListener("chatUsage", handleChatUsage);

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener("chatUsage", handleChatUsage);
    };
  }, []); // O array de dependências vazio garante que o listener seja adicionado apenas uma vez

  // ====================================================================

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  return {
    chats,
    activeChat,
    activeChatId,
    createNewChat,
    openChat,
    deleteChat,
    updateChatMessages,
  };
};
