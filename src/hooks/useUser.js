import { useEffect, useState, useCallback } from 'react'

let cachedUser = null
let lastFetch = 0
let pendingPromise = null

const CACHE_TTL = 1000 * 60 * 5 // 5 min

const listeners = new Set()

function notifyListeners(user) {
  listeners.forEach((listener) => listener(user))
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
  const [user, setUserState] = useState(() => cachedUser)
  const [loading, setLoading] = useState(() => !cachedUser)
  const [error, setError] = useState(null)

  useEffect(() => {
    const listener = (newUser) => {
      setUserState(newUser)
    }

    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }, [])

  const setUser = useCallback((newUser) => {
    cachedUser = newUser
    lastFetch = Date.now()

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

        notifyListeners(normalizedUser)

        return normalizedUser
      })
      .catch((err) => {
        cachedUser = null
        lastFetch = 0

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

    notifyListeners(null)
  }, [])

  useEffect(() => {
    let mounted = true

    async function loadUser() {
      try {
        setLoading(true)
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
    loading,
    error,
    setUser,
    refreshUser,
    clearUserCache,
  }
}