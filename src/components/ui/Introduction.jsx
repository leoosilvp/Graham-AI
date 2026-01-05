import { NavLink } from "react-router-dom"
import Faq from "../Faq"

const Introduction = () => {
    return (
        <section className='docs-content'>
            <div className='docs-aside-left'>
                <nav>
                    <ul>
                        <li><NavLink className='active'>Bem-Vindo/a</NavLink></li>
                    </ul>
                </nav>
            </div>

            <section className='docs-feed'>
                <h1>Seja Bem-vindo/a</h1>
                <h2>Saiba mais sobre Graham AI e como começar.</h2>

                <video src='https://anonymousai-hub.github.io/DB/video/upd-1.5.mp4' controls />

                <p>O Graham AI é um assistente de IA avançado, projetado para ser claro, preciso e empático em todas as interações. Seu objetivo é não apenas responder perguntas, mas facilitar o aprendizado, resolver problemas complexos e entregar resultados confiáveis de maneira didática e acessível.</p>
                
                <h1>O que torna Graham AI diferente?</h1>
                <p>Enquanto assistentes comuns se limitam a responder perguntas, o <span>Graham AI executa</span>, resolve e entrega resultados completos. Ele opera de forma autônoma em tarefas complexas, sem exigir microgerenciamento, mantendo contexto persistente em projetos longos e entregando soluções prontas para uso - desde análises detalhadas e cálculos precisos como: <span>E = mc²</span> até documentos formatados profissionalmente. Não apenas informa: resolve problemas de forma independente. Defina a tarefa e o Graham AI cuida de todo o processo, liberando você para focar no que realmente importa. Pronto para transformar sua produtividade?</p>
                
                <hr />

                <div className="social-links">
                    <a href=""><i className="fa-brands fa-instagram" /></a>
                    <a href="https://github.com/leoosilvp/Graham-AI"><i className="fa-brands fa-github" /></a>
                    <a href="https://www.linkedin.com/company/grahamai/?viewAsMember=true"><i className="fa-brands fa-linkedin" /></a>
                    <a href=""><i className="fa-brands fa-youtube" /></a>
                </div>
            </section>

            <div className='docs-aside-right'>
                <Faq />
            </div>
        </section>
    )
}

export default Introduction
