const API_BASE = 'https://api.graham.vu/api/chat/chat'

function buildHeaders(isJSON = true) {
  return isJSON
    ? { 'Content-Type': 'application/json' }
    : undefined
}


const _cache = {
  list: new Map(),
  get: new Map(),
}

const TTL = 1000 * 60 // 1 minuto

function isFresh(entry) {
  return entry && (Date.now() - entry.timestamp < TTL)
}

function setCache(map, key, data) {
  map.set(key, {
    data,
    timestamp: Date.now()
  })
}

function getCache(map, key) {
  const entry = map.get(key)
  if (isFresh(entry)) return entry.data
  return null
}

function invalidateList() {
  _cache.list.clear()
}

function invalidateChat(id) {
  _cache.get.delete(id)
}


export async function sendMessageStream({
  message,
  chatId,
  history = [],
  files = [],
  signal,
  onEvent,
}) {
  const hasFiles = files.length > 0

  let response

  if (hasFiles) {
    const formData = new FormData()
    formData.append('message', message)
    formData.append('chat_id', chatId)
    formData.append('history', JSON.stringify(history))

    files.forEach(f => formData.append('files', f))

    response = await fetch(`${API_BASE}?action=send`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      signal,
    })
  } else {
    response = await fetch(`${API_BASE}?action=send`, {
      method: 'POST',
      headers: buildHeaders(),
      credentials: 'include',
      signal,
      body: JSON.stringify({
        message,
        chat_id: chatId,
        history,
      }),
    })
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const chatIdFromHeader = response.headers.get('X-Chat-ID')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    const lines = buffer.split('\n')
    buffer = lines.pop()

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue

      const payload = line.slice(6).trim()

      if (payload === '[DONE]') {
        invalidateList()
        if (chatIdFromHeader) invalidateChat(chatIdFromHeader)

        onEvent({ type: 'done', chatId: chatIdFromHeader })
        return
      }

      try {
        const json = JSON.parse(payload)
        const token = json.choices?.[0]?.delta?.content

        if (token) {
          onEvent({ type: 'token', token })
        }
      } catch {
        // ignore
      }
    }
  }
}


export const ChatService = {
  async list(page = 1, pageSize = 20) {
    const key = `${page}-${pageSize}`

    const cached = getCache(_cache.list, key)
    if (cached) return cached

    const res = await fetch(`${API_BASE}?action=list&page=${page}&page_size=${pageSize}`, {
      credentials: 'include',
    })

    if (!res.ok) throw new Error('Erro ao listar chats')

    const data = await res.json()

    setCache(_cache.list, key, data)

    return data
  },

  async get(id) {
    const cached = getCache(_cache.get, id)
    if (cached) return cached

    const res = await fetch(`${API_BASE}?action=get&id=${id}`, {
      credentials: 'include',
    })

    if (!res.ok) throw new Error('Erro ao buscar chat')

    const data = await res.json()

    setCache(_cache.get, id, data)

    return data
  },

  async updateTitle(id, title) {
    const res = await fetch(`${API_BASE}?action=title`, {
      method: 'PATCH',
      headers: buildHeaders(),
      credentials: 'include',
      body: JSON.stringify({ id, title }),
    })

    if (!res.ok) throw new Error('Erro ao atualizar título')

    const data = await res.json()

    invalidateList()
    invalidateChat(id)

    return data
  },

  async delete(id) {
    const res = await fetch(`${API_BASE}?action=delete&id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!res.ok) throw new Error('Erro ao deletar chat')

    const data = await res.json()

    invalidateList()
    invalidateChat(id)

    return data
  },
}