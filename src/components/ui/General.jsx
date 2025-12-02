const General = () => {
    return (
        <section className="settings-area-content">
            <section className="settings-area-header">
                <h1>Geral</h1>
            </section>

            <section className="ctn-settings-change">
                <div className="settings-change">
                    <h2>Tema</h2>
                    <button>Sistema <i className="fa-solid fa-chevron-down"></i></button>
                </div>
            </section>

            <hr />

            <section className="ctn-settings-change">
                <div className="settings-change">
                    <h2>Cor favorita</h2>
                    <button><div></div> Padrão <i className="fa-solid fa-chevron-down"></i></button>
                </div>
            </section>

            <hr />

            <section className="ctn-settings-change">
                <div className="settings-change">
                    <h2>Idioma</h2>
                    <button>Detectar automaticamente <i className="fa-solid fa-chevron-down"></i></button>
                </div>
            </section>

        </section>
    )
}

export default General
