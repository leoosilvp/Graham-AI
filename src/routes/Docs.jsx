import { Link, NavLink, Outlet } from 'react-router-dom'
import '../css/docs.css'
import logo from '../assets/img/logo.svg'
import icon from '../assets/img/icon-light.svg'

const Docs = () => {
    return (
        <main className='ctn-docs-page'>
            <section className='docs-page'>
                <header>
                    <section className="docs-header-content">
                        <Link to='/chat'>
                            <img src={logo} alt='logo Graham AI' />
                        </Link>

                        <section className="docs-search">
                            <div className="sec-left-search">
                                <i className='fa-solid fa-search' />
                                <p>Search...</p>
                            </div>
                            <p>Ctrl + p</p>
                        </section>

                        <Link to='/chat/settings/account'><i className='fa-regular fa-circle-user'></i></Link>
                    </section>

                    <nav>
                        <ul>
                            <li><NavLink to='introduction/welcome' className={({ isActive }) => isActive ? 'active' : ''}>Introdução</NavLink></li>
                            <li><NavLink to='features' className={({ isActive }) => isActive ? 'active' : ''}>Recursos</NavLink></li>
                            <li><NavLink to='plans and services' className={({ isActive }) => isActive ? 'active' : ''}>Planos e Preços</NavLink></li>
                            <li><NavLink to='api' className={({ isActive }) => isActive ? 'active' : ''}>API</NavLink></li>
                            <li><NavLink to='enterprise' className={({ isActive }) => isActive ? 'active' : ''}>Para empresas</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Outlet />

                <footer className='docs-footer'>
                    <section className='graham-info'>
                        <img src={icon} alt="icon Graham AI" />
                        <nav>
                            <ul>
                                <li><NavLink>Chat</NavLink></li>
                                <li><NavLink>Docs</NavLink></li>
                                <li><NavLink>Configurações</NavLink></li>
                                <li><NavLink>Ajuda</NavLink></li>
                                <li><NavLink>Politicas e Privacidade</NavLink></li>
                                <li><NavLink>Contato</NavLink></li>
                            </ul>
                        </nav>
                    </section>

                    <NavLink to='/status' className='system-stats'>
                        <div />
                        <h1>Sistema funcionando normalmente.</h1>
                    </NavLink>
                </footer>
            </section>
        </main>
    )
}

export default Docs
