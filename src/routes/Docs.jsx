import { Link, NavLink, Outlet } from 'react-router-dom'
import '../css/docs.css'
import logo from '../assets/img/logo.svg'

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
            </section>
        </main>
    )
}

export default Docs
