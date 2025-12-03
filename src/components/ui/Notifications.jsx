const Notifications = () => {
    return (
        <section className="settings-area-content">
            <section className="settings-area-header">
                <h1>Notificações</h1>
            </section>

            <section className="ctn-settings-change">
                <div className="settings-change">
                    <h2>Respostas</h2>
                    <button>Push <i className="fa-solid fa-chevron-down"></i></button>
                </div>
                <p>Receba uma notificação quando o Graham AI responder a pedidos que demoram algum tempo, tal como uma investigação ou geração de imagens.</p>
            </section>

            <hr className="settings-divisor-area"/>

            <section className="ctn-settings-change">
                <div className="settings-change">
                    <h2>Recomendações</h2>
                    <button>Push, e-mail <i className="fa-solid fa-chevron-down"></i></button>
                </div>
                <p>Mantenha-se a par das novas ferramentas, dicas e funcionalidades do Graham AI.</p>
            </section>

        </section>
    )
}

export default Notifications
