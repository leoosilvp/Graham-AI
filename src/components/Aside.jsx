import '../css/aside.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../assets/svg/logo-text.svg'
import { Check, ChevronUpDown, Code, Edit, Folder, Frown, Search, Sidebar, Trash2, X } from '@geist-ui/icons'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ChatService } from '../services/chatService'
import { useUser } from '../hooks/useUser'
import ModalProfile from './aside/ModalProfile'

const Aside = () => {

    const { user } = useUser()

    const [isOpen, setIsOpen] = useState(() => {
        return localStorage.getItem('aside_open') !== 'false'
    })

    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef(null)

    const scrollRef = useRef(null)
    const [isScrolled, setIsScrolled] = useState(false)

    const asideRef = useRef(null)

    const closeAsideOnMobile = () => {
        if (isMobile) {
            localStorage.setItem('aside_open', 'false')
            setIsOpen(false)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (
                isMobile &&
                asideRef.current &&
                !asideRef.current.contains(event.target)
            ) {
                localStorage.setItem('aside_open', 'false')
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [isMobile])

    useEffect(() => {
        const element = scrollRef.current

        if (!element) return

        const handleScroll = () => {
            setIsScrolled(element.scrollTop > 1)
        }

        element.addEventListener('scroll', handleScroll)

        return () => {
            element.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const getFirstName = () => {
        return (user?.profile?.name || '')
            .trim()
            .split(/\s+/)
            .filter(Boolean)[0] || '';
    }

    function getLastName() {
        const partes = (user?.profile?.name || '')
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        return partes.length > 1 ? partes[partes.length - 1] : '';
    }

    useEffect(() => {
        const handleAsideToggle = () => {
            setIsOpen(localStorage.getItem('aside_open') !== 'false')
        }

        window.addEventListener('aside-toggle', handleAsideToggle)

        return () => {
            window.removeEventListener('aside-toggle', handleAsideToggle)
        }
    }, [])

    const handleToggleAside = () => {
        const newValue = !isOpen

        localStorage.setItem('aside_open', newValue.toString())

        window.dispatchEvent(new Event('aside-toggle'))
    }

    const navigate = useNavigate()
    const { id: activeIdFromRoute } = useParams()

    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)

    const [editingChatId, setEditingChatId] = useState(null)
    const [editingValue, setEditingValue] = useState('')
    const [deletingChatId, setDeletingChatId] = useState(null)

    const reloadChats = useCallback(async (silent = false) => {
        try {
            if (!silent) setLoading(true)

            const data = await ChatService.list()

            const list =
                data?.chats ??
                data?.data ??
                (Array.isArray(data) ? data : [])

            setChats(list)
        } catch (err) {
            console.error('[AsideChat] erro ao listar:', err)
        } finally {
            if (!silent) setLoading(false)
        }
    }, [])

    useEffect(() => {
        let mounted = true

        const init = async () => {
            try {
                setLoading(true)

                const data = await ChatService.list()

                if (!mounted) return

                const list =
                    data?.chats ??
                    data?.data ??
                    (Array.isArray(data) ? data : [])

                setChats(list)
            } catch (err) {
                console.error('[AsideChat] erro ao listar:', err)
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        init()

        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        const handler = () => reloadChats(true)

        window.addEventListener('chat:created', handler)
        return () => window.removeEventListener('chat:created', handler)
    }, [reloadChats])

    const handleNewChat = () => {
        navigate('/new')
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

            if (id === activeIdFromRoute) {
                navigate('/new', { replace: true })
            }
        } catch (err) {
            console.error('[AsideChat] erro ao deletar:', err)
        } finally {
            setDeletingChatId(null)
        }
    }

    const startEditing = (chat) => {
        setEditingChatId(chat.id)
        setEditingValue(chat.title ?? '')
        setDeletingChatId(null)
    }

    const cancelEditing = () => {
        setEditingChatId(null)
        setEditingValue('')
    }

    const confirmEditing = async (id) => {
        const newTitle = editingValue.trim()

        cancelEditing()

        if (!newTitle) return

        try {
            await ChatService.updateTitle(id, newTitle)

            setChats(prev =>
                prev.map(chat =>
                    chat.id === id ? { ...chat, title: newTitle } : chat
                )
            )
        } catch (err) {
            console.error('[AsideChat] erro ao renomear:', err)
        }
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false)
            }
        }

        if (isProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isProfileOpen])

    return (
        <aside className={`aside-main ${!isOpen && 'collapsed'}`} ref={asideRef}>
            <header className="aside-header">
                <Link to='/new'>
                    <img src={logo} alt="logo ASTRA" draggable={false} />
                </Link>
                <button onClick={handleToggleAside}><Sidebar size={16} /></button>
            </header>
            <section className='aside-content'>
                <div className='aside-first-btn'>
                    <button className='aside-btn' onClick={() => { handleNewChat(), closeAsideOnMobile() }}><Edit className='icon' size={19} /><p>Novo bate-papo</p><span>Shift + a</span></button>
                    <button className='aside-btn' onClick={() => { navigate('/search'), closeAsideOnMobile() }} ><Search className='icon' size={19} /><p>Procurar</p><span>Ctrl + p</span></button>
                </div>

                <div className={`aside-content-scrool ${isScrolled ? 'aside-content-scrolled' : ''}`}>
                    <button className='aside-btn' onClick={() => { navigate('/library'), closeAsideOnMobile() }} ><Folder className='icon' size={19} /><p>Arquivos</p></button>
                    <button className='aside-btn bloq'><Code className='icon' size={19} /><p>Código</p><h3>Indisponível</h3></button>

                    <h2>Recentes</h2>
                    <section className='aside-grid-chats' ref={scrollRef}>

                        {loading && <div className="chat-aside-loading"><div className='loader' /></div>}

                        {!loading && chats.length === 0 && (<p className="chat-nochats"><Frown size={17} /> Nenhum chat ainda!</p>)}

                        {chats.map(chat => {
                            const isActive = chat.id === activeIdFromRoute
                            const isEditing = chat.id === editingChatId
                            const isDeleting = chat.id === deletingChatId

                            return (
                                <Link
                                    key={chat.id}
                                    to={`/chat/${chat.id}`}
                                    className={`aside-card-chat ${isActive ? 'active' : ''}`}
                                    onClick={(e) => {
                                        if (isEditing || isDeleting) e.preventDefault()
                                    }}
                                >
                                    {isEditing ? (
                                        <input autoFocus maxLength={23} value={editingValue} onChange={(e) => setEditingValue(e.target.value)} onBlur={() => confirmEditing(chat.id)} onKeyDown={(e) => {
                                            if (e.key === 'Enter') confirmEditing(chat.id)
                                            if (e.key === 'Escape') cancelEditing()
                                        }} />
                                    ) : (
                                        <h1>{chat.title || 'Novo Chat'}</h1>
                                    )}
                                    <div onClick={(e) => e.preventDefault()}>
                                        {isEditing ? (
                                            <>
                                                <button onClick={cancelEditing}><X size={14} /></button>
                                                <button onClick={() => confirmEditing(chat.id)}><Check size={14} /></button>
                                            </>
                                        ) : isDeleting ? (
                                            <>
                                                <button onClick={cancelDeleting}><X size={14} /></button>
                                                <button onClick={() => confirmDelete(chat.id)}><Check size={14} /></button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => startDeleting(chat.id)}><Trash2 size={14} /></button>
                                                <button onClick={() => startEditing(chat)}><Edit size={14} /></button>
                                            </>
                                        )}
                                    </div>
                                </Link>
                            )
                        })}
                    </section>
                </div>
            </section>

            <div ref={profileRef}>
                <footer className={`aside-profile ${isProfileOpen && 'aside-profile-open'}`} onClick={() => setIsProfileOpen(prev => !prev)} >
                    <div className='aside-img-profile'>
                        <img src={user?.profile?.photo || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} />
                    </div>
                    <section className='aside-profile-content'>
                        <div>
                            <h1>{getFirstName()} {getLastName()}</h1>
                            <p>{user?.plan}</p>
                        </div>
                        <section className='aside-btn-profile'>
                            <ChevronUpDown size={14} />
                        </section>
                    </section>
                </footer>
                <ModalProfile open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            </div>
        </aside>
    )
}

export default Aside