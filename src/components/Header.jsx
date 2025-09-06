import '../css/header.css'
import logo from '../assets/img/icon-light.svg'

function Header(){
    return(
        <header>
            <h1>Anonymous AI</h1>
            <a href="#"><img src={logo} alt="logo" /></a>
            <button><i className="fa-regular fa-bell"></i></button>
        </header>
    )
}

export default Header