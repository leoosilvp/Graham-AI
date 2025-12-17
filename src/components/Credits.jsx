import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../css/credits.css'

const Credits = () => {
    const [open, setOpen] = useState(false)

    return (
        <section
            className="credits-section"
            onMouseLeave={() => setOpen(false)}
        >
            <article
                className="credits-btn"
                onMouseEnter={() => setOpen(true)}
            >
                <i className="fa-regular fa-copyright" />
                000
            </article>
            <section className={`credits-ctn ${open ? 'open' : 'close'}`} onMouseEnter={() => setOpen(true)}>
                <article
                    className={`credits ${open ? 'open' : 'close'}`}
                    onMouseEnter={() => setOpen(true)}
                >
                    <section className='credits-header'>
                        <h1>BASIC</h1>
                        <Link to='/docs/plans'>Atualizar</Link>
                    </section>

                    <hr />

                    <section className='credits-content'>
                        <h1>
                            <span>
                                <i className='fa-regular fa-copyright' />
                                Creditos
                            </span>
                            <span>0</span>
                        </h1>

                        <div>
                            <h1>
                                <span>
                                    <i className='fa-regular fa-calendar' />
                                    Creditos diários
                                </span>
                                <span>000</span>
                            </h1>
                            <h2>Atualizar para © 300 às 00:00 todos os dias</h2>
                        </div>

                        <Link to='/chat/settings'>
                            Ver consumo <i className='fa-solid fa-chevron-right' />
                        </Link>
                    </section>
                </article>
            </section>
        </section>
    )
}

export default Credits
