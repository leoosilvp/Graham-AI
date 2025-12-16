import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Aside from '../components/Aside'
import Footer from '../components/Footer'
import useAuthRedirect from "../hooks/useAuthRedirect";
import Upd from '../components/Upd'

const Home = () => {

    useAuthRedirect();

    return (
        <main>
            <Header />
            <div className="content">
                <Aside />
                <Outlet />
            </div>
            <Footer />
            <Upd />
        </main>
    )
}

export default Home
