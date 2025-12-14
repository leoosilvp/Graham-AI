import '../css/status.css'
import icon from '../assets/img/icon-light.svg'
import { NavLink } from 'react-router-dom'

const Status = () => {
    return (
        <main className='status-page'>
            <header className='status-page-header'>
                <img src={icon} alt="Graham AI icon" />
                <NavLink to='/docs'>Ir para Docs</NavLink>
            </header>

            <article className='status-all-applications'>
                <i className='fa-solid fa-check'></i>
                <h1>Sistema funcionando normalmente.</h1>
            </article>

            <section className='commits-dates'>
                <article className='commits-day'>
                    <h1>Dezembro 14, 2025</h1>
                    <hr />
                    <section className='latest-commits'>
                        <article className='commit'>
                            <section>
                                <p>Feat: criando pagina de status</p>
                                <h2>Dezembro 14, 22:34 UTC</h2>
                            </section>
                            <i className='fa-solid fa-check'></i>
                        </article>

                        <article className='commit'>
                            <section>
                                <p>Feat: cragina de status</p>
                                <h2>Dezembro 14, 22:30 UTC</h2>
                            </section>
                            <i className='fa-solid fa-check'></i>
                        </article>
                    </section>
                </article>

                <article className='commits-day'>
                    <h1>Dezembro 13, 2025</h1>
                    <hr />
                    <section className='latest-commits'>
                        <article className='commit'>
                            <section>
                                <p>Feat: criando patus</p>
                                <h2>Dezembro 13, 12:44 UTC</h2>
                            </section>
                            <i className='fa-solid fa-xmark' style={{color: 'red'}}></i>
                        </article>

                        <article className='commit'>
                            <section>
                                <p>Feat: cragina de sta</p>
                                <h2>Dezembro 13, 20:01 UTC</h2>
                            </section>
                            <i className='fa-solid fa-check'></i>
                        </article>
                    </section>
                </article>
            </section>
        </main>
    )
}

export default Status
