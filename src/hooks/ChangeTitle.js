import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ChangeTitle = () => {

  const location = useLocation()

  useEffect(() => {

    const path = location.pathname

    if (path === '/new') {
      document.title = `New chat - Graham`
      return
    }

    else if (path === '/recents') {
      document.title = `Recents - Graham`
      return
    }

    else if (path === '/settings') {
      document.title = `Settings - Graham`
      return
    }

  }, [location.pathname])

  return null
}

export default ChangeTitle