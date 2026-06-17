import { ChevronRight } from "@geist-ui/icons"
import { Link } from "react-router-dom"

const Privacy = () => {
    return (
        <main className="settings-general-main">
            <div className="highlighted">
                <h4>O Graham valoriza a transparência e a privacidade dos seus dados. Saiba como suas informações são protegidas e consulte nossa <a href="">Central de Privacidade</a> e <a href="">Política de Privacidade</a> para mais detalhes.</h4>
                <hr />
                <Link className="active">Como usamos seus dados <ChevronRight size={16} /></Link>
            </div>

            <h1>Preferências</h1>

            <section>
                <div>
                    <h2>Ajude a melhorar nossos modelos de IA</h2>
                    <p>Permitir que suas conversas sejam utilizadas para aprimorar os modelos, recursos e a experiência do Graham.</p>
                </div>
                <label className='switch-container disabled'>
                    <input type="checkbox" className="switch-input" />
                    <span className="switch-slider"> <span className="switch-thumb" /></span>
                </label>
            </section>
        </main>
    )
}

export default Privacy
