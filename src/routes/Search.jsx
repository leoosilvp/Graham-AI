import '../css/recents.css'
import { useEffect, useMemo, useState } from "react"
import { Edit, Search, Trash2, X, Check, Frown } from "@geist-ui/icons"
import { Link, useNavigate } from "react-router-dom"
import { ChatService } from "../services/chatService"

const Recents = () => {

    const navigate = useNavigate()

    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("")
    const [editingChatId, setEditingChatId] = useState(null)
    const [editingValue, setEditingValue] = useState("")
    const [deletingChatId, setDeletingChatId] = useState(null)

    useEffect(() => {
        let mounted = true

        const load = async () => {
            try {
                setLoading(true)

                const data = await ChatService.list()

                if (!mounted) return

                const list = data?.chats ?? data?.data ?? (Array.isArray(data) ? data : [])
                setChats(list)

            } catch (err) {
                console.error("[Recents] erro ao listar:", err)
            } finally {
                if (mounted) setLoading(false)
            }
        }

        load()

        return () => {
            mounted = false
        }
    }, [])

    const formatTimeAgo = (dateString) => {
        if (!dateString) return ""

        const diff = new Date() - new Date(dateString)
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const weeks = Math.floor(days / 7)
        const months = Math.floor(days / 30)
        const years = Math.floor(days / 365)

        if (minutes < 1) return "agora mesmo"
        if (minutes < 60) return `há ${minutes} min`
        if (hours < 24) return `há ${hours}h`
        if (days < 7) return `há ${days} dia${days > 1 ? "s" : ""}`
        if (weeks < 5) return `há ${weeks} semana${weeks > 1 ? "s" : ""}`
        if (months < 12) return `há ${months} mês${months > 1 ? "es" : ""}`
        return `há ${years} ano${years > 1 ? "s" : ""}`
    }

    const startEditing = (chat) => {
        setEditingChatId(chat.id)
        setEditingValue(chat.title ?? "")
        setDeletingChatId(null)
    }

    const cancelEditing = () => {
        setEditingChatId(null)
        setEditingValue("")
    }

    const confirmEditing = async (id) => {
        const newTitle = editingValue.trim()
        cancelEditing()
        if (!newTitle) return

        try {
            await ChatService.updateTitle(id, newTitle)
            setChats(prev => prev.map(chat => chat.id === id ? { ...chat, title: newTitle } : chat))
        } catch (err) {
            console.error("[Recents] erro ao renomear:", err)
        }
    }

    const startDeleting = (id) => {
        setDeletingChatId(id)
        setEditingChatId(null)
    }

    const cancelDeleting = () => setDeletingChatId(null)

    const confirmDelete = async (id) => {
        try {
            await ChatService.delete(id)
            setChats(prev => prev.filter(chat => chat.id !== id))
            navigate("/new", { replace: true })
        } catch (err) {
            console.error("[Recents] erro ao deletar:", err)
        } finally {
            setDeletingChatId(null)
        }
    }

    const filteredChats = useMemo(() => {
        const q = query.toLowerCase()
        return chats.filter(chat => (chat.title || "novo chat").toLowerCase().includes(q))
    }, [chats, query])

    return (
        <main className="recents-main">
            <header className="recents-header">
                <h1>Procurar</h1>
                <div>
                    <button className="active" onClick={() => navigate("/new")}>
                        Novo bate-papo
                    </button>
                </div>
            </header>

            <article className="recents-search"><Search size={18} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Pesquisar conversa..." />
            </article>

            <section className="recents-grid-chats">

                {loading && <div className="chat-aside-loading"><div className="loader" /></div>}

                {!loading && filteredChats.length === 0 && <div className="chat-nochats"><Frown size={16} /> Nenhuma conversa encontrada</div>}

                {filteredChats.map(chat => {
                    const isEditing = chat.id === editingChatId
                    const isDeleting = chat.id === deletingChatId

                    return (
                        <Link key={chat.id} to={`/chat/${chat.id}`} className="recents-card-chat" onClick={(e) => { if (isEditing || isDeleting) e.preventDefault() }}>

                            <div>
                                {isEditing ? (
                                    <input autoFocus value={editingValue} maxLength={30} onChange={(e) => setEditingValue(e.target.value)} onBlur={() => confirmEditing(chat.id)} onKeyDown={(e) => { if (e.key === "Enter") confirmEditing(chat.id); if (e.key === "Escape") cancelEditing() }} />
                                ) : (
                                    <>
                                        <h1>{chat.title || "Novo chat"}</h1>
                                        <p>{formatTimeAgo(chat.created_at)}</p>
                                    </>
                                )}
                            </div>

                            <span>
                                {isEditing ? (
                                    <>
                                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); cancelEditing() }}><X size={16} /></button>
                                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); confirmEditing(chat.id) }}><Check size={16} /></button>
                                    </>
                                ) : isDeleting ? (
                                    <>
                                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); cancelDeleting() }}><X size={16} /></button>
                                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); confirmDelete(chat.id) }}><Check size={16} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); startDeleting(chat.id) }}><Trash2 size={16} /></button>
                                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); startEditing(chat) }}><Edit size={16} /></button>
                                    </>
                                )}
                            </span>
                        </Link>
                    )
                })}

            </section>
        </main>
    )
}

export default Recents