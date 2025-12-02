import Login from '../components/Login'
import Header from '../components/Header'
import Aside from '../components/Aside'
import Footer from '../components/Footer'
import Chat from '../components/Chat'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <Login />
            <Header />
            <div className="content">
                <Aside />
                <Chat />
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default Home
