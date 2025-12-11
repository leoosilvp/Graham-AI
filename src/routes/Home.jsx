import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Aside from '../components/Aside'
import Footer from '../components/Footer'
import Chat from '../components/Chat'
import useAuthRedirect from "../hooks/useAuthRedirect";
import Upd from '../components/Upd'

const Home = () => {

    useAuthRedirect();

    return (
        <div>
            <Header />
            <div className="content">
                <Aside />
                <Chat />
            </div>
            <Outlet />
            <Footer />
            <Upd />
        </div>
    )
}

export default Home
