import '../css/settings.css'
import { NavLink, Outlet } from 'react-router-dom'
import { ArrowLeft, HelpCircle, Shield, Sliders, Settings as St, User, } from '@geist-ui/icons'

const Settings = () => {
    return (
        <main className='settings-main'>
            <header className='settings-header'>
                <h1>Configurações</h1>
                <button onClick={() => history.back()}><ArrowLeft size={18} />Voltar</button>
            </header>

            <section className='settings-grid'>
                <aside className='settings-aside'>
                    <NavLink to='general'><St size={17} />Geral</NavLink>
                    <NavLink to='account'><User size={17} />Conta</NavLink>
                    <NavLink to='privacy'><Shield size={17} />Privacidade</NavLink>
                    <NavLink to='personalize'><Sliders size={17} />Personalizar</NavLink>
                    <NavLink to='help'><HelpCircle size={17} />Ajuda</NavLink>
                </aside>
                <section className='settings-content'>
                    <Outlet />
                </section>
            </section>
        </main>
    )
}

export default Settings
