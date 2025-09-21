const handleSend = async () => {
    if (!input.trim() || loading) return;

    const text = input.trim();
    const userMsg = { role: "user", content: text, ts: Date.now() };
    setLoading(true);

    let idToUse = chatId;
    let updatedMsgs = [];
    let isFirstMessage = false;

    try {
      if (!idToUse) {
        idToUse = Date.now().toString();
        setChatId(idToUse);
        updatedMsgs = [userMsg];
        setMessages(updatedMsgs);
        setStarted(true);
        isFirstMessage = true;

        localStorage.setItem("activeChatId", idToUse);
        window.dispatchEvent(new CustomEvent("chatsUpdated"));
        window.dispatchEvent(new CustomEvent("openChat", { detail: { id: idToUse } }));
      } else {
        isFirstMessage = messages.length === 0;
        updatedMsgs = [...messages, userMsg];
        setMessages(updatedMsgs);
      }

      saveChat(idToUse, updatedMsgs);
      setInput("");

      const thinkingMsg = { role: "assistant", content: "Humm, deixe-me pensar", ts: Date.now(), thinking: true };
      setMessages(prev => [...updatedMsgs, thinkingMsg]);

      const data = await sendMessageToAI(text);
      const assistantMsg = { role: "assistant", content: data.reply ?? "Resposta vazia", ts: Date.now() };

      const finalMsgs = [...updatedMsgs, assistantMsg];
      setMessages(finalMsgs);
      saveChat(idToUse, finalMsgs);

    } catch (err) {
      const errMsg = { role: "assistant", content: "❌ Erro ao se comunicar com a IA.", ts: Date.now() };
      const afterError = [...updatedMsgs, errMsg];
      setMessages(afterError);
      saveChat(idToUse, afterError);
    } finally {
      setLoading(false);
      if (isFirstMessage) window.location.reload();
    }
  };