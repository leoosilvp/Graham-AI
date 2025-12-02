import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ChangeTitle = () => {
  const location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case '/':
      case '/chat':
        document.title = 'GrahamAi ▪️ chat'
        break
      case '/chat/settings':
        document.title = 'GrahamAi ▪️ settings'
        break
      case '/login':
        document.title = 'GrahamAi ▪️ login'
        break
      default:
        document.title = 'GrahamAi'
    }
  }, [location.pathname])

  return null
}

export default ChangeTitle