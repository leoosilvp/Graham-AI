import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ChangeTitle = () => {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname

    if (path === '/') {
      document.title = 'Graham AI'
      return
    }

    if (path === '/login') {
      document.title = 'Graham AI - login'
      return
    }

    if (path.startsWith('/settings')) {
      document.title = 'Graham AI - settings'
      return
    }

    document.title = 'Graham AI'
  }, [location.pathname])

  return null
}

export default ChangeTitle
