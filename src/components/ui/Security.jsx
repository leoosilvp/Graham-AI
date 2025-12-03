const Security = () => {
    return (
        <section className="settings-area-content">
            <section className="settings-area-header">
                <h1>Segurança</h1>
            </section>

            <section className="ctn-settings-input">
                <div className="settings-input">
                    <h2>E-mail</h2>
                    <input type="text" value={'teste@gmail.com'} readOnly/>
                </div>
                <button>Editar</button>
            </section>

            <hr className="settings-divisor-area"/>

            <section className="ctn-settings-input">
                <div className="settings-input">
                    <h2>Senha</h2>
                    <input type="password" value={'Leo259249'} readOnly/>
                </div>
                <button>Editar</button>
            </section>

            <hr />

            <section className="ctn-settings-button">
                <div className="settings-button">
                    <h2>Terminar sessão neste dispositivo</h2>
                    <button>Terminar sessão</button>
                </div>
            </section>

            <hr />

            <section className="ctn-settings-button">
                <div className="settings-button">
                    <h2>Terminar sessão em todos os dispositivos</h2>
                    <button className="active">Terminar sessão para todos</button>
                </div>
                <p>Terminar sessão de todas as sessões ativas em todos os dispositivos, incluindo a sua sessão atual. Pode demorar até 15 minutos para os outros dispositivos terminarem sessão.</p>
            </section>

        </section>
    )
}

export default Security
