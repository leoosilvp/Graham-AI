import { useState, useRef, useCallback } from 'react'
import { sendMessageStream } from '../services/chatService'

let chatCache = null

const CACHE_TIME = 2 * 60 * 1000 // 2 min

function getCache() {
  if (!chatCache) return null

  if (Date.now() - chatCache.timestamp > CACHE_TIME) {
    chatCache = null
    return null
  }

  return chatCache
}

export function useChat() {
  const [messages, setMessages] = useState(() => getCache()?.messages || [])
  const [chatId, setChatId] = useState(() => getCache()?.chatId || null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const abortRef = useRef(null)
  const messagesRef = useRef(getCache()?.messages || [])
  const chatIdRef = useRef(getCache()?.chatId || null)

  const updateCache = useCallback((messages, chatId) => {
    chatCache = {
      messages,
      chatId,
      timestamp: Date.now(),
    }
  }, [])

  const _setMessages = useCallback((updater) => {
    setMessages(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater

      messagesRef.current = next
      updateCache(next, chatIdRef.current)

      return next
    })
  }, [updateCache])

  const _setChatId = useCallback((id) => {
    chatIdRef.current = id
    setChatId(id)

    updateCache(messagesRef.current, id)
  }, [updateCache])

  const sendMessage = useCallback(async ({ message, files = [] }) => {
    if (!message.trim()) return

    setIsLoading(true)
    setError(null)

    const controller = new AbortController()
    abortRef.current = controller

    const historySnapshot = messagesRef.current

    _setMessages(prev => [
      ...prev,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])

    let assistantText = ''

    try {
      await sendMessageStream({
        message,
        chatId: chatIdRef.current,
        history: historySnapshot,
        files,
        signal: controller.signal,

        onEvent: (event) => {
          if (event.type === 'token') {
            assistantText += event.token

            _setMessages(prev => {
              const updated = [...prev]

              updated[updated.length - 1] = {
                role: 'assistant',
                content: assistantText,
              }

              return updated
            })
          }

          if (event.type === 'done' && event.chatId) {
            _setChatId(event.chatId)

            window.dispatchEvent(
              new CustomEvent('chat:created', {
                detail: event.chatId,
              })
            )
          }
        },
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message ?? 'Erro ao enviar mensagem.')

        _setMessages(prev => {
          const updated = [...prev]

          if (
            updated.at(-1)?.role === 'assistant' &&
            updated.at(-1)?.content === ''
          ) {
            updated.pop()
          }

          return updated
        })
      }
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }, [_setMessages, _setChatId])

  const stop = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setIsLoading(false)
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null

    chatCache = null

    messagesRef.current = []
    chatIdRef.current = null

    setMessages([])
    setChatId(null)
    setError(null)
    setIsLoading(false)
  }, [])

  const loadChat = useCallback((history, id) => {
    messagesRef.current = history
    chatIdRef.current = id

    setMessages(history)
    setChatId(id)
    setError(null)

    updateCache(history, id)
  }, [updateCache])

  return {
    messages,
    chatId,
    isLoading,
    error,
    sendMessage,
    stop,
    reset,
    loadChat,
  }
}