import { ArrowUpRight, HelpCircle, LogOut, Settings, Shield } from "@geist-ui/icons"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { logout } from "../../services/auth"

const ModalProfile = ({ open, onClose }) => {

    const { user } = useUser()

    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault()

        try {
            await logout()
            window.location.reload()
            navigate('/login', { replace: true })
        } catch (err) {
            console.error('Logout failed', err)
        }
    }

    if (!open) return

    return (
        <article className="modal-profile">
            <p>{user?.email}</p>
            <button onClick={() => { navigate('/settings'), onClose?.() }}><Settings size={18} color={'var(--light-color)'} />Configurações</button>
            <button onClick={() => { navigate('/settings/privacy'), onClose?.() }}><Shield color={'var(--light-color)'} size={18} />Privacidade</button>
            <hr />
            <button onClick={() => { navigate('/upgrade'), onClose?.() }}><ArrowUpRight color={'var(--light-color)'} size={18} />Fazer Upgrade</button>
            <button onClick={() => { navigate('/settings/help'), onClose?.() }}><HelpCircle color={'var(--light-color)'} size={18} />Ajuda</button>
            <hr />
            <button onClick={handleLogout}><LogOut color={'var(--light-color)'} size={18} />Sair</button>
        </article>
    )
}

export default ModalProfile
