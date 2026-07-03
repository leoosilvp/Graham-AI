import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'graham:user-cache'
const STORAGE_VERSION = 1
const STORAGE_MAX_AGE = 1000 * 60 * 60 * 24 * 7 // 7 dias
const CACHE_TTL = 1000 * 60 * 5 // 5 min

function toPreview(user) {
  if (!user) return null

  return {
    name: user.profile?.name ?? null,
    photo: user.profile?.photo ?? null,
    plan: user.plan ?? null,
  }
}

function isValidPreview(preview) {
  return (
    preview !== null &&
    typeof preview === 'object' &&
    'name' in preview &&
    'photo' in preview &&
    'plan' in preview
  )
}

function readPreview() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return null

    const parsed = JSON.parse(raw)

    if (parsed.v !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }

    if (Date.now() - parsed.savedAt > STORAGE_MAX_AGE) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }

    if (!isValidPreview(parsed.data)) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }

    return parsed.data
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

function writePreview(user) {
  try {
    const preview = toPreview(user)

    if (!preview) {
      localStorage.removeItem(STORAGE_KEY)
      return
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: STORAGE_VERSION, savedAt: Date.now(), data: preview })
    )
  } catch {
    // storage indisponível (modo privado, quota, etc...), segue só com cache em memória
  }
}

function fromPreview(preview) {
  if (!preview) return null

  return {
    id: null,
    email: null,
    profile: { name: preview.name, photo: preview.photo },
    plan: preview.plan,
    status: null,
    settings: null,
  }
}

let cachedUser = null
let lastFetch = 0
let pendingPromise = null

const listeners = new Set()
const previewListeners = new Set()

function notifyListeners(user) {
  listeners.forEach((listener) => listener(user))
}

function notifyPreviewListeners(preview) {
  previewListeners.forEach((listener) => listener(preview))
}

async function requestUser() {
  const response = await fetch(
    'https://api.graham.vu/api/auth/me',
    {
      method: 'GET',
      credentials: 'include',
    }
  )

  if (!response.ok) {
    if (response.status === 401) {
      return null
    }

    throw new Error(
      `Erro ao buscar usuário: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return {
    id: data.id,
    email: data.email,
    profile: data.profile,
    plan: data.plan,
    status: data.status,
    settings: data.settings,
  }
}

export function useUser() {
  const [user, setUserState] = useState(() => cachedUser ?? fromPreview(readPreview()))
  const [preview, setPreview] = useState(() => readPreview())
  const [loading, setLoading] = useState(() => !cachedUser && !readPreview())
  const [error, setError] = useState(null)

  useEffect(() => {
    const listener = (newUser) => {
      setUserState(newUser)
    }

    const previewListener = (newPreview) => {
      setPreview(newPreview)
    }

    listeners.add(listener)
    previewListeners.add(previewListener)

    return () => {
      listeners.delete(listener)
      previewListeners.delete(previewListener)
    }
  }, [])

  const setUser = useCallback((newUser) => {
    cachedUser = newUser
    lastFetch = Date.now()

    writePreview(newUser)
    notifyPreviewListeners(toPreview(newUser))
    notifyListeners(newUser)
  }, [])

  const fetchUser = useCallback(async () => {
    const now = Date.now()

    if (cachedUser && now - lastFetch < CACHE_TTL) {
      return cachedUser
    }

    if (pendingPromise) {
      return pendingPromise
    }

    pendingPromise = requestUser()
      .then((normalizedUser) => {
        cachedUser = normalizedUser
        lastFetch = Date.now()

        writePreview(normalizedUser)
        notifyPreviewListeners(toPreview(normalizedUser))
        notifyListeners(normalizedUser)

        return normalizedUser
      })
      .catch((err) => {
        cachedUser = null
        lastFetch = 0

        writePreview(null)
        notifyPreviewListeners(null)
        notifyListeners(null)

        throw err
      })
      .finally(() => {
        pendingPromise = null
      })

    return pendingPromise
  }, [])

  const refreshUser = useCallback(async () => {
    cachedUser = null
    lastFetch = 0

    return fetchUser()
  }, [fetchUser])

  const clearUserCache = useCallback(() => {
    cachedUser = null
    lastFetch = 0

    writePreview(null)
    notifyPreviewListeners(null)
    notifyListeners(null)
  }, [])

  useEffect(() => {
    let mounted = true

    async function loadUser() {
      try {
        if (!cachedUser && !readPreview()) {
          setLoading(true)
        }

        setError(null)

        const data = await fetchUser()

        if (!mounted) return

        setUserState(data)
      } catch (err) {
        if (!mounted) return

        setError(err.message)
        setUserState(null)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadUser()

    return () => {
      mounted = false
    }
  }, [fetchUser])

  return {
    user,
    preview,
    loading,
    error,
    setUser,
    refreshUser,
    clearUserCache,
  }
}