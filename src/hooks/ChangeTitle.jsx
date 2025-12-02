import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ChangeTitle = () => {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname

    if (path === '/') {
      document.title = 'GrahamAi'
      return
    }

    if (path === '/login') {
      document.title = 'GrahamAi ▪️ login'
      return
    }

    if (path.startsWith('/settings')) {
      document.title = 'GrahamAi ▪️ settings'
      return
    }

    document.title = 'GrahamAi'
  }, [location.pathname])

  return null
}

export default ChangeTitle
