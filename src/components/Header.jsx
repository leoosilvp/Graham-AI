import '../css/header.css'
import logo from '../assets/img/icon-light.svg'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
            <h1>Graham AI</h1>
            <img src={logo} alt="logo" />
            <Link to='/docs'><i className="fa-solid fa-book-open"></i></Link>
        </header>
    )
}

export default Header