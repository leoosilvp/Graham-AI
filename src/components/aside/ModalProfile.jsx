import { HelpCircle, Info, LogOut, Settings } from "@geist-ui/icons"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { logout } from "../../services/auth"

const ModalProfile = () => {

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

    return (
        <article className="modal-profile">
            <p>{user?.email}</p>
            <button onClick={() => navigate('/settings')}><Settings size={19} />Configurações</button>
            <button onClick={() => window.open('https://osx-org.vercel.app/', '_blank', 'noopener,noreferrer')}><HelpCircle size={19} />Ajuda</button>
            <hr />
            <button onClick={() => window.open('https://osx-org.vercel.app/', '_blank', 'noopener,noreferrer')}><Info size={19} />Saiba mais</button>
            <hr />
            <button onClick={handleLogout}><LogOut size={19} />Sair</button>
        </article>
    )
}

export default ModalProfile
