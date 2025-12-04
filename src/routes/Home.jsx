import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Aside from '../components/Aside'
import Footer from '../components/Footer'
import Chat from '../components/Chat'
import useAuthRedirect from "../hooks/useAuthRedirect";

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
        </div>
    )
}

export default Home
