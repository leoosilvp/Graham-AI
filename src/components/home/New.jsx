import { useUser } from "../../hooks/useUser"
import icon from '../../assets/svg/icon-light.svg'
import BarChat from "./BarChat"
import { useCallback, useEffect } from "react"
import { useChat } from "../../hooks/useChat"
import { useNavigate } from "react-router-dom"

const New = () => {

    const navigate = useNavigate()
    const { user } = useUser()

    const FirstName = () => {
        return user?.profile?.name?.trim().split(/\s+/).filter(Boolean)[0] || ''
    }

    const welcomes = [
        `${FirstName()} está de volta.`,
        `Boa madrugada, ${FirstName()}`,
        `Encontre padrões.`,
        `${FirstName()}, pronto para começar.`,
        `Bem-vindo de volta, ${FirstName()}.`,
        `${FirstName()}, bom te ver novamente.`,
        `Pronto de novo, ${FirstName()}?`,
        `Siga a lógica.`,
        `Onde paramos, ${FirstName()}?`,
        `Bem-vindo, ${FirstName()}.`,
        `Quando quiser, ${FirstName()}.`,
        `Tudo certo, ${FirstName()}?`,
    ]

    const welcome = welcomes[Math.floor(new Date().getHours() / 2) % welcomes.length]

    const {
        isLoading,
        sendMessage,
        stop,
        reset
    } = useChat()

    useEffect(() => {
        reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const handler = (e) => {
            const newId = e.detail
            if (newId) {
                navigate(`/chat/${newId}`, { replace: true })
            }
        }

        window.addEventListener('chat:created', handler)
        return () => window.removeEventListener('chat:created', handler)
    }, [navigate])


    const handleSend = useCallback((payload) => {
        sendMessage(payload)
    }, [sendMessage])

    const handleStop = useCallback(() => {
        stop()
    }, [stop])

    return (
        <main className="new-main">
            <section className="new-welcome">
                <img src={icon} draggable={false} />
                <h1 style={{ '--chars': welcome.length }} className="typing">{welcome}</h1>
            </section>
            <section className="new-input">
                <BarChat
                    onSend={handleSend}
                    onStop={handleStop}
                    isLoading={isLoading}
                />
            </section>
        </main>
    )
}

export default New
