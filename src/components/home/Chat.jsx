import { useEffect, useRef, useCallback, useState, useMemo, memo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import { useChat } from '../../hooks/useChat'
import BarChat from './BarChat'
import { ChatService } from '../../services/chatService'
import { AlertTriangle, Copy, Check } from '@geist-ui/icons'

function normaliseMarkdown(raw) {
    if (!raw) return ''

    return String(raw)
        .replace(/\r\n/g, '\n')
        .replace(/\u00A0/g, ' ')
        .trimEnd()
}

const CodeBlock = memo(({ className, children }) => {
    const [copied, setCopied] = useState(false)
    const language = (className?.replace('language-', '') || 'plaintext').toLowerCase()
    const codeString = String(children).replace(/\n$/, '')

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(codeString)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch { /* noop */ }
    }, [codeString])

    return (
        <div className="code-block">
            <div className="code-block__header">
                <span className="code-block__lang">{language}</span>
                <button type="button" className="code-block__copy" onClick={handleCopy} aria-label="Copiar código">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copiado' : 'Copiar'}
                </button>
            </div>
            <pre className={className}>
                <code className={className}>{children}</code>
            </pre>
        </div>
    )
})
CodeBlock.displayName = 'CodeBlock'

const markdownComponents = {
    code({ className, children, ...props }) {
        const match =
            /language-(\w+)/.exec(className || '')

        if (!match) {
            return (
                <code
                    className="inline-code"
                    {...props}
                >
                    {children}
                </code>
            )
        }
        return (
            <CodeBlock className={className}>
                {children}
            </CodeBlock>
        )
    },
    a({ href, children, ...props }) {
        return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    },
    table({ children, ...props }) {
        return (
            <div className="md-table-wrapper">
                <table {...props}>{children}</table>
            </div>
        )
    },
    img({ src, alt }) {
        return (
            <img
                src={src}
                alt={alt || ''}
                loading="lazy"
                decoding="async"
            />
        )
    },
    hr() {
        return <hr />
    },

    strong({ children }) {
        return <strong>{children}</strong>
    },

    em({ children }) {
        return <em>{children}</em>
    },

    blockquote({ children }) {
        return <blockquote>{children}</blockquote>
    },
}

const MarkdownContent = memo(
    ({ content }) => (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[
                rehypeKatex,
                [rehypeHighlight, { detect: true }]
            ]}
            components={markdownComponents}
        >
            {normaliseMarkdown(content)}
        </ReactMarkdown>
    ),
    (prev, next) => prev.content === next.content
)
MarkdownContent.displayName = 'MarkdownContent'

const ThinkingIndicator = () => (
    <div className="chat-ai chat-ai--thinking" aria-live="polite">
        <div className="thinking-dots">
            <span /><span /><span />
        </div>
    </div>
)

const MessageUser = memo(({ content }) => (
    <div className="chat-user">
        <p className="chat-bubble chat-bubble--user">{content}</p>
    </div>
))
MessageUser.displayName = 'MessageUser'

const MessageAssistant = memo(({ content, isStreaming }) => (
    <div className="chat-ai">
        <div className={`chat-bubble chat-bubble--ai${isStreaming ? ' chat-bubble--streaming' : ''}`}>
            <div className="markdown-content">
                <MarkdownContent content={content} />
            </div>
            {isStreaming && <span className="stream-cursor" aria-hidden="true" />}
        </div>
    </div>
))
MessageAssistant.displayName = 'MessageAssistant'

const Chat = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { messages, isLoading, error, sendMessage, stop, reset, loadChat, isActiveChat } = useChat()
    const [chatTitle, setChatTitle] = useState('')
    const bottomRef = useRef(null)
    const fetchAbortRef = useRef(null)
    const loadedIdRef = useRef(null)
    const lastWordCountRef = useRef(0)
    const lastVibrationRef = useRef(0)
    const previousAssistantContentRef = useRef('')

    const displayTitle = useMemo(() => {
        if (chatTitle) return chatTitle
        if (isActiveChat(id) && messages[0]?.role === 'user') {
            return messages[0].content.slice(0, 40)
        }
        return 'Novo Chat'
    }, [chatTitle, id, messages, isActiveChat])

    useEffect(() => {
        if (!id || loadedIdRef.current === id) return
        loadedIdRef.current = id

        if (isActiveChat(id)) return

        fetchAbortRef.current?.abort()
        const controller = new AbortController()
        fetchAbortRef.current = controller
        reset()

        const load = async () => {
            try {
                const data = await ChatService.get(id)
                if (controller.signal.aborted) return
                setChatTitle(data?.title || data?.chat?.[0]?.title || 'Novo Chat')
                if (data?.chat?.length) loadChat(data.chat, id)
            } catch {
                if (!controller.signal.aborted) navigate('/new', { replace: true })
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
        const timeout = setTimeout(() => el.scrollIntoView({ behavior: 'instant', block: 'end' }), 50)
        return () => clearTimeout(timeout)
    }, [isLoading])

    useEffect(() => {
        if (!id) return
        document.title = displayTitle ? `${displayTitle} - Graham` : 'Graham'
    }, [displayTitle, id])

    useEffect(() => {
        if (!isLoading) {
            lastWordCountRef.current = 0
            previousAssistantContentRef.current = ''
        }
    }, [isLoading])

    const isStreaming = isLoading && messages.at(-1)?.role === 'assistant'
    const isPending = isLoading && messages.at(-1)?.role === 'user'
    const handleSend = useCallback((payload) => {
        navigator.vibrate?.(15)

        lastWordCountRef.current = 0
        previousAssistantContentRef.current = ''

        sendMessage(payload)
    }, [sendMessage])
    const handleStop = useCallback(() => stop(), [stop])

    useEffect(() => {
        if (!isStreaming) {
            lastWordCountRef.current = 0
            previousAssistantContentRef.current = ''
            return
        }

        const content = messages.at(-1)?.content || ''

        if (content === previousAssistantContentRef.current) return

        previousAssistantContentRef.current = content

        const wordCount = content
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .length

        if (wordCount > lastWordCountRef.current) {
            const now = Date.now()

            if (now - lastVibrationRef.current > 50) {
                navigator.vibrate?.(2)
                lastVibrationRef.current = now
            }

            lastWordCountRef.current = wordCount
        }
    }, [messages, isStreaming])

    return (
        <main className="chat-main">
            <section className="chat-content" role="log" aria-live="polite" aria-label="Conversa">
                {messages.map((msg, i) => {
                    const isLast = i === messages.length - 1
                    if (msg.role === 'user') return <MessageUser key={i} content={msg.content} />
                    if (msg.role === 'assistant') return <MessageAssistant key={i} content={msg.content} isStreaming={isLast && isStreaming} />
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