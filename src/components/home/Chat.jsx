import { useEffect, useRef, useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useChat } from '../../hooks/useChat'
import BarChat from './BarChat'
import { ChatService } from '../../services/chatService'
import { AlertTriangle } from '@geist-ui/icons'


const ThinkingIndicator = () => (
    <div className="chat-ai chat-ai--thinking" aria-live="polite">
        <div className="thinking-dots">
            <span /><span /><span />
        </div>
    </div>
)

const MessageUser = ({ content }) => (
    <div className="chat-user">
        <p className="chat-bubble chat-bubble--user">{content}</p>
    </div>
)

const MessageAssistant = ({ content, isStreaming }) => (
    <div className="chat-ai">
        <div className={`chat-bubble chat-bubble--ai${isStreaming ? ' chat-bubble--streaming' : ''}`}>
            {content}
            {isStreaming && <span className="stream-cursor" aria-hidden="true" />}
        </div>
    </div>
)

const Chat = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { messages, isLoading, error, sendMessage, stop, reset, loadChat } = useChat()

    const [chatTitle, setChatTitle] = useState('')

    const bottomRef = useRef(null)
    const fetchAbortRef = useRef(null)
    const loadedIdRef = useRef(null)

    useEffect(() => {
        if (!id || loadedIdRef.current === id) return
        loadedIdRef.current = id

        fetchAbortRef.current?.abort()
        const controller = new AbortController()
        fetchAbortRef.current = controller

        reset()

        const load = async () => {
            try {
                const data = await ChatService.get(id)

                if (controller.signal.aborted) return

                setChatTitle(data?.title || data?.chat?.[0]?.title || 'Novo Chat')

                if (data?.chat?.length) {
                    loadChat(data.chat, id)
                }
            } catch {
                if (!controller.signal.aborted) {
                    navigate('/new', { replace: true })
                }
            }
        }

        load()

        return () => {
            controller.abort()
            loadedIdRef.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (isLoading) return

        const el = bottomRef.current
        if (!el) return

        const timeout = setTimeout(() => {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }, 50)

        return () => clearTimeout(timeout)
    }, [isLoading])

    const isStreaming = isLoading && messages.at(-1)?.role === 'assistant'
    const isPending = isLoading && messages.at(-1)?.role === 'user'

    const handleSend = useCallback((payload) => sendMessage(payload), [sendMessage])
    const handleStop = useCallback(() => stop(), [stop])

    useEffect(() => {
        if (!id) return

        document.title = chatTitle
            ? `${chatTitle} - Astra`
            : 'Astra'
    }, [chatTitle, id])

    return (
        <main className="chat-main">
            <section
                className="chat-content"
                role="log"
                aria-live="polite"
                aria-label="Conversa"
            >
                {messages.map((msg, i) => {
                    const isLast = i === messages.length - 1

                    if (msg.role === 'user') {
                        return <MessageUser key={i} content={msg.content} />
                    }
                    if (msg.role === 'assistant') {
                        return (
                            <MessageAssistant
                                key={i}
                                content={msg.content}
                                isStreaming={isLast && isStreaming}
                            />
                        )
                    }
                    return null
                })}

                {isPending && <ThinkingIndicator />}

                {error && (
                    <div className="chat-error" role="alert">
                        <p><AlertTriangle size={15} /> {error}</p>
                    </div>
                )}

                <div ref={bottomRef} aria-hidden="true" style={{ height: 1 }} />
            </section>

            <section className="chat-input">
                <BarChat onSend={handleSend} onStop={handleStop} isLoading={isLoading} active />
            </section>
        </main>
    )
}

export default Chat