import '../css/upgrade.css'
import { Link } from 'react-router-dom'
import logo from '../assets/svg/logo.svg'
import logoPleromaGraham from '../assets/svg/logo-pleroma-graham.svg'

const Upgrade = () => {
    return (
        <main className="upgrade-main">
            <header className='upgrade-header'>
                <Link to='/new'>
                    <img src={logo} alt="" />
                </Link>
                <Link to='/new'>Experimentar o Graham</Link>
            </header>
            <section className='upgrade-presentation'>
                <h1>Planos Individuais</h1>
                <img src={logoPleromaGraham} />
            </section>
        </main>
    )
}

export default Upgrade
