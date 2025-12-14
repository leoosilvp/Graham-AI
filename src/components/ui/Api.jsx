import { NavLink, Outlet } from "react-router-dom"
import Faq from "../Faq"

const Api = () => {
  return (
    <section className='docs-content'>
            <div className='docs-aside-left'>
                <nav>
                    <ul>
                        <li><NavLink to='Graham-api'>Graham API</NavLink></li>
                        <li><NavLink to='references'>Referências</NavLink></li>
                        <li><NavLink to='api-key'>Chave API</NavLink></li>
                        <li><NavLink to='settings'>Configurações</NavLink></li>
                    </ul>
                </nav>
            </div>

            <section className='docs-feed'>
                <Outlet />
            </section>

            <div className='docs-aside-right'>
                <Faq />
            </div>
        </section>
  )
}

export default Api
