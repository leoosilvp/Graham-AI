import '../css/status.css'
import icon from '../assets/img/icon-light.svg'
import { NavLink } from 'react-router-dom'

const Status = () => {
  return (
    <main className='status-page'>
        <header className='status-page-header'>
            <img src={icon} alt="Graham AI icon" />
            <NavLink to='/docs'>Ir para Docs</NavLink>
        </header>
    </main>
  ) 
}

export default Status
