import { Outlet } from 'react-router-dom'
import Aside from '../components/Aside'
import '../css/home.css'

const Home = () => {

    return (
        <main className="home-main">
            <Aside />
            <section className='home-content'>
                <Outlet />
            </section>
        </main>
    )
}

export default Home
