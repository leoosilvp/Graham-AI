import { Monitor, Moon, Sun } from "@geist-ui/icons"

const General = () => {
    return (
        <main className="settings-general-main">
            <h1 className="first">Preferências</h1>

            <section>
                <h2>Aparência</h2>
                <div className="settings-btns-select">
                    <button className="active" title="Sistema"><Monitor size={17} /></button>
                    <button title="Claro"><Sun size={17} /></button>
                    <button title="Escuro"><Moon size={17} /></button>
                </div>
            </section>

            <hr />

            <section>
                <h2>Idioma</h2>
                <h3>Pt - Br</h3>
            </section>

            <hr />

            <h1>Notificações</h1>

            <section>
                <div>
                    <h2>Respostas</h2>
                    <p>Não espere na tela. Receba uma notificação quando a resposta estiver pronta.</p>
                </div>
                <label className='switch-container disabled'>
                    <input type="checkbox" className="switch-input" />
                    <span className="switch-slider"> <span className="switch-thumb" /></span>
                </label>
            </section>

            <hr />

            <section>
                <div>
                    <h2>Marketing</h2>
                    <p>Mantenha-se a par das novas ferramentas e funcionalidades do Graham.</p>
                </div>
                <label className='switch-container disabled'>
                    <input type="checkbox" className="switch-input" />
                    <span className="switch-slider"> <span className="switch-thumb" /></span>
                </label>
            </section>

            <hr />

            <section>
                <div>
                    <h2>Utilização</h2>
                    <p>Receba uma notificação quando os limites forem repostos.</p>
                </div>
                <label className='switch-container disabled'>
                    <input type="checkbox" className="switch-input" />
                    <span className="switch-slider"> <span className="switch-thumb" /></span>
                </label>
            </section>
        </main>
    )
}

export default General
