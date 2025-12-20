import Credits from "../Credits";
import { useChats } from "../../hooks/useChats";

const Usage = () => {
  const { chats, openChat, activeChatId } = useChats();

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Data inválida";
      
      if (dateString.includes("-")) {
        const [day, month, year] = dateString.split("-");
        return `${day}/${month}/${year}`;
      }
      
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
    } catch {
      return "Data inválida";
    }
  };

  return (
    <section className="settings-area-content">
      <section className="settings-area-header">
        <h1>
          <i className="fa-regular fa-circle-user" /> Consumo
        </h1>
      </section>

      <Credits opened />

      <article className="usage-ctn">
        <section className="usage-header">
          <h1>Título Chat</h1>
          <h1>Data</h1>
          <h1>Tokens</h1>
        </section>

        <section className="usage-content">
          {chats.length === 0 ? (
            <article className="usage empty">
              <h3>Nenhum chat encontrado</h3>
            </article>
          ) : (
            chats.map((chat) => (
              <article
                className={`usage ${chat.id === activeChatId ? "active" : ""}`}
                key={chat.id}
                onClick={() => openChat(chat.id)}
              >
                <h3 className="card-usage-title">
                  {chat.title || "Sem título"}
                </h3>

                <h3 className="card-usage-data">
                  {formatDate(chat.date)}
                </h3>

                <h3 className="card-usage-total">
                  {chat.usageToken?.toLocaleString("pt-BR") ?? 0}
                </h3>
              </article>
            ))
          )}
        </section>
      </article>
    </section>
  );
};

export default Usage;
