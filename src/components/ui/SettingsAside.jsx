import { NavLink } from "react-router-dom"

const SettingsAside = () => {
    return (
        <section className='settings-aside'>
            <nav>
                <ul>
                    <li><NavLink to='general' className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-gear"/> Geral</NavLink></li>
                    <li><NavLink to='notifications' className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-regular fa-bell"/> Notificações</NavLink></li>
                    <li><NavLink to='customization' className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-regular fa-face-grin-tongue-wink"/> Personalização</NavLink></li>
                    <li><NavLink to='security' className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-fingerprint"/> Segurança</NavLink></li>
                    <li><NavLink to='account' className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-regular fa-circle-user"/> Conta</NavLink></li>
                    <li><NavLink to='usage' className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-regular fa-copyright"/> Consumo</NavLink></li>
                    <li><NavLink to='support' className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-regular fa-life-ring"/> Suporte</NavLink></li>
                    <li><NavLink to='terms and privacy' className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-regular fa-address-book"/> Termos e privacidade</NavLink></li>
                </ul>
            </nav>
        </section>
    )
}

export default SettingsAside
