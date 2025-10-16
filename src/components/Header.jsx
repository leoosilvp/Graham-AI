import '../css/header.css'
import logo from '../assets/img/icon-light.svg'

function Header() {
    return (
        <header>
            <h1>Graham AI</h1>
            <img src={logo} alt="logo" />
            <a href="https://graham-ai-page.vercel.app/"><i className="fa-solid fa-book-open"></i></a>
        </header>
    )
}

export default Header