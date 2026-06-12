import { useEffect, useState } from 'react'

let authCache = null

const CACHE_TIME = 2 * 60 * 1000 // 2 min

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const now = Date.now()

      if (
        authCache &&
        now - authCache.timestamp < CACHE_TIME
      ) {
        setIsAuthenticated(authCache.isAuthenticated)
        setLoading(false)
        return
      }

      try {
        const res = await fetch(
          'https://api-graham-ai.vercel.app/api/auth/me',
          { credentials: 'include' }
        )

        authCache = {
          isAuthenticated: res.ok,
          timestamp: now
        }

        setIsAuthenticated(res.ok)
      } catch {
        authCache = {
          isAuthenticated: false,
          timestamp: now
        }

        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { loading, isAuthenticated }
}