import '../css/aside.css';

function NewChat() {
    const createNewChat = () => {
        const newId = Date.now().toString();
        const all = JSON.parse(localStorage.getItem("chats") || "[]");

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
    };

    return (
        <article className='new-chat'>
            <h2><i className="fa-regular fa-pen-to-square"></i> New chat</h2>
            <button onClick={createNewChat}>New chat! <i className="fa-solid fa-comments"></i>
            </button>
        </article>
    );
}

export default NewChat;
