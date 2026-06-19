import { useCallback, useSyncExternalStore } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMessageStream } from '../services/chatService'

const store = {
  state: {
    messages: [],
    chatId: null,
    isLoading: false,
    error: null,
  },
  listeners: new Set(),
}

function setStore(partial) {
  store.state = {
    ...store.state,
    ...(typeof partial === 'function' ? partial(store.state) : partial),
  }
  store.listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  store.listeners.add(listener)
  return () => store.listeners.delete(listener)
}

function getSnapshot() {
  return store.state
}

let abortController = null

export function useChat() {
  const navigate = useNavigate()
  const { messages, chatId, isLoading, error } = useSyncExternalStore(subscribe, getSnapshot)

  const sendMessage = useCallback(async ({ message, files = [] }) => {
    if (!message.trim()) return

    setStore({ isLoading: true, error: null })

    const controller = new AbortController()
    abortController = controller

    const historySnapshot = store.state.messages
    const isNewChat = !store.state.chatId
    const tempId = isNewChat ? `temp-${crypto.randomUUID()}` : null

    setStore((s) => ({
      messages: [
        ...s.messages,
        { role: 'user', content: message },
        { role: 'assistant', content: '' },
      ],
    }))

    if (isNewChat) {
      setStore({ chatId: tempId })
      navigate(`/chat/${tempId}`, { replace: true })
    }

    let assistantText = ''

    try {
      await sendMessageStream({
        message,
        chatId: isNewChat ? null : store.state.chatId,
        history: historySnapshot,
        files,
        signal: controller.signal,

        onEvent: (event) => {
          if (event.type === 'token') {
            assistantText += event.token

            setStore((s) => {
              const updated = [...s.messages]
              updated[updated.length - 1] = { role: 'assistant', content: assistantText }
              return { messages: updated }
            })
          }

          if (event.type === 'done' && event.chatId) {
            const previousId = store.state.chatId
            setStore({ chatId: event.chatId })

            if (previousId !== event.chatId) {
              navigate(`/chat/${event.chatId}`, { replace: true })
            }

            window.dispatchEvent(new CustomEvent('chat:created', { detail: event.chatId }))
          }
        },
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        setStore((s) => {
          const updated = [...s.messages]
          if (updated.at(-1)?.role === 'assistant' && updated.at(-1)?.content === '') {
            updated.pop()
          }
          return { messages: updated, error: err.message ?? 'Erro ao enviar mensagem.' }
        })
      }
    } finally {
      setStore({ isLoading: false })
      abortController = null
    }
  }, [navigate])

  const stop = useCallback(() => {
    abortController?.abort()
    abortController = null
    setStore({ isLoading: false })
  }, [])

  const reset = useCallback(() => {
    abortController?.abort()
    abortController = null
    setStore({ messages: [], chatId: null, error: null, isLoading: false })
  }, [])

  const loadChat = useCallback((history, id) => {
    setStore({ messages: history, chatId: id, error: null })
  }, [])

  const isActiveChat = useCallback((id) => store.state.chatId === id, [])

  return { messages, chatId, isLoading, error, sendMessage, stop, reset, loadChat, isActiveChat }
}