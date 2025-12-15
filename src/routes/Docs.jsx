import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import '../css/docs.css'
import logo from '../assets/img/logo.svg'
import icon from '../assets/img/icon-light.svg'

const Docs = () => {

    const [overallStatus, setOverallStatus] = useState('')

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch('/api/status')
                if (!res.ok) return

                const data = await res.json()
                setOverallStatus(data.overallStatus)
            } catch (error) {
                console.error('Erro ao buscar status:', error)
            }
        }

        fetchStatus()
    }, [])

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
                            <li><NavLink to='plans' className={({ isActive }) => isActive ? 'active' : ''}>Planos e Preços</NavLink></li>
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
                                <li><Link to='/chat'>Chat</Link></li>
                                <li><Link to='/docs'>Docs</Link></li>
                                <li><Link to='/chat/settings'>Configurações</Link></li>
                                <li><Link to='/chat/settings/support'>Ajuda</Link></li>
                                <li><Link to='/chat/settings/terms%20and%20privacy'>Politicas e Privacidade</Link></li>
                                <li><Link to='/chat/settings/support#contact'>Contato</Link></li>
                            </ul>
                        </nav>
                    </section>

                    <Link to='/status' className='system-stats'>
                        <div style={{ background: overallStatus === '' ? '#444444ff' : overallStatus === 'success' ? '#006efe' : overallStatus === 'warning' ? '#efa422' : '#ec2222' }} />
                        <h1 style={{ color: overallStatus === '' ? '#444444ff' : overallStatus === 'success' ? '#006efe' : overallStatus === 'warning' ? '#efa422' : '#ec2222' }}>
                            {overallStatus === '' ? 'Sistema fora do ar. Sem registros recentes.'
                                : overallStatus === 'success'
                                    ? 'Sistema funcionando normalmente.'
                                    : overallStatus === 'warning'
                                        ? 'Sistema pode estar instável.'
                                        : 'Sistema com falhas recentes.'}</h1>
                    </Link>
                </footer>
            </section>
        </main>
    )
}

export default Docs
