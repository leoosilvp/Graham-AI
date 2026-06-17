import { Headphones } from "@geist-ui/icons"

const Help = () => {
    return (
        <main className="settings-general-main">
            <div className="highlighted">
                <h3>Tem alguma dúvida? Entre em contato com nossa equipe de suporte para obter ajuda e mais informações.</h3>
            </div>

            <hr />

            <section className="margin-top">
                <h2>Entrar em contato</h2>
                <div className="btn">
                    <button><Headphones size={16} />Suporte</button>
                </div>
            </section>
        </main>
    )
}

export default Help
