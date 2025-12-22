import '../css/header.css';
import logo from '../assets/img/icon-light.svg';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const isNotification = location.pathname === '/notification';

    return (
        <header className={`${isNotification ? 'header-notification' : ''}`}>
            <h1>Graham AI</h1>
            <img onClick={() => window.location.href = '/chat'} src={logo} alt="logo" />
            <Link to='/docs/plans'>
                <i className="fa-solid fa-book-open"></i>
            </Link>
        </header>
    );
}

export default Header;
