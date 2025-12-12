import { Link } from 'react-router-dom'
import '../css/docs.css'
import logo from '../assets/img/logo.svg'

const Docs = () => {
    return (
        <main className='docs-page'>
            <header>
                <section className="docs-header-content">
                    <img src={logo} alt='logo Graham AI' />


                    <section className="docs-search">
                        <div className="sec-left-search">
                            <i className='fa-solid fa-search'/>
                            <p>Search...</p>
                        </div>
                        <p>Ctrl + p</p>
                    </section>

                    <Link><i className='fa-regular fa-circle-user'></i></Link>
                </section>

                <nav>
                    <ul>
                        <li><Link className='active'>Introdução</Link></li>
                        <li><Link className=''>Aparência</Link></li>
                        <li><Link className=''>Planos e Preços</Link></li>
                        <li><Link className=''>APIs</Link></li>
                        <li><Link className=''>Para empresas</Link></li>
                    </ul>
                </nav>
            </header>
        </main>
    )
}

export default Docs
