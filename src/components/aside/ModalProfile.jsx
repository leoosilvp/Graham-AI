import { ArrowUpRight, Help, Logout, Rule, Settings, } from "@carbon/icons-react"
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
            <button onClick={() => { navigate('/settings'), onClose?.() }}><Settings size={16} color={'var(--light-color)'} />Configurações</button>
            <button onClick={() => { navigate('/settings/privacy'), onClose?.() }}><Rule color={'var(--light-color)'} size={16} />Privacidade</button>
            <hr />
            <button onClick={() => { navigate('/upgrade'), onClose?.() }}><ArrowUpRight color={'var(--light-color)'} size={16} />Fazer Upgrade</button>
            <button onClick={() => { navigate('/settings/help'), onClose?.() }}><Help color={'var(--light-color)'} size={16} />Ajuda</button>
            <hr />
            <button onClick={handleLogout}><Logout color={'var(--light-color)'} size={16} />Sair</button>
        </article>
    )
}

export default ModalProfile
