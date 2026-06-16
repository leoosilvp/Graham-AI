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

    else if (path === '/search') {
      document.title = `Search - Graham`
      return
    }

    else if (path === '/library') {
      document.title = `Library - Graham`
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