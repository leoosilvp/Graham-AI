import { NavLink, Outlet } from "react-router-dom"
import Faq from "../Faq"

const Features = () => {
    return (
        <section className='docs-content'>
            <div className='docs-aside-left'>
                <nav>
                    <ul>
                        <li><NavLink to="chat">Chat Inteligente</NavLink></li>
                        <li><NavLink to="memory">Memória de Conversa</NavLink></li>
                        <li><NavLink to="performance">Performace e Escala</NavLink></li>
                        <li><NavLink to="generation">Geração de Conteúdo</NavLink></li>
                        <li><NavLink to="security">Segurança e Privacidade</NavLink></li>
                    </ul>

                </nav>
            </div>

            <section className='docs-feed'>
                <Outlet />

                <hr />

                <div className="social-links">
                    <a href=""><i className="fa-brands fa-instagram" /></a>
                    <a href=""><i className="fa-brands fa-github" /></a>
                    <a href=""><i className="fa-brands fa-linkedin" /></a>
                    <a href=""><i className="fa-brands fa-youtube" /></a>
                </div>
            </section>

            <div className='docs-aside-right'>
                <Faq />
            </div>
        </section>
    )
}

export default Features
