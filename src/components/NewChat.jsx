import { useEffect } from 'react';
import '../css/aside.css';

function NewChat() {
    const createNewChat = () => {
        const all = JSON.parse(localStorage.getItem("chats") || "[]");

        const emptyChat = all.find(chat => chat.messages.length === 0);

        if (emptyChat) {
            localStorage.setItem("activeChatId", emptyChat.id);
            window.dispatchEvent(new CustomEvent("chatsUpdated"));
            window.dispatchEvent(new CustomEvent("openChat", { detail: { id: emptyChat.id } }));
            window.location.reload()
            window.location.href=('/chat')
            return;
        }

        const newId = Date.now().toString();
        all.push({
            id: newId,
            title: "Novo chat",
            messages: [],
            updatedAt: Date.now()
        });
        localStorage.setItem("chats", JSON.stringify(all));

        localStorage.setItem("activeChatId", newId);
        window.dispatchEvent(new CustomEvent("chatsUpdated"));
        window.dispatchEvent(new CustomEvent("openChat", { detail: { id: newId } }));
        window.location.reload()
        window.location.href=('/chat')
    };

    useEffect(() => {
        const handleShortcut = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'o') {
                e.preventDefault();
                createNewChat();
                window.location.href=('/chat')
            }
        };

        window.addEventListener('keydown', handleShortcut);
        return () => {
            window.removeEventListener('keydown', handleShortcut);
        };
    }, []);

    return (
        <article className='new-chat'>
            <button onClick={createNewChat}>
                <p><i className="fa-regular fa-pen-to-square"></i> Novo chat</p>
                <span>Ctrl + Shift + O</span>
            </button>
        </article>
    );
}

export default NewChat;
