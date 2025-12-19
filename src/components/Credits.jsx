import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../css/credits.css'

const Credits = ({ opened }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (opened) {
            setOpen(true)
        }
    }, [opened])

    return (
        <section className="credits-section" onMouseLeave={() => {
            if (!opened) {
                setOpen(false)
            }
        }}
        >
            <article className={`credits-btn ${opened ? 'opened' : ''}`} onMouseEnter={() => setOpen(true)}>
                <i className="fa-regular fa-copyright" />
                500
            </article>

            <section className={`credits-ctn ${open ? 'open' : 'close'} ${opened ? 'opened' : ''}`} onMouseEnter={() => setOpen(true)}>
                <article className={`credits ${open ? 'open' : 'close'} ${opened ? 'opened' : ''}`} onMouseEnter={() => setOpen(true)}>
                    <section className='credits-header'>
                        <h1>BASIC</h1>
                        <Link>Atualizar</Link>
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
                                <span>500</span>
                            </h1>
                            <h2>Atualizar para © 500 às 00:00 todos os dias</h2>
                        </div>

                        <Link to='/chat/settings' className={`${opened ? 'opened' : ''}`}>
                            Ver consumo <i className='fa-solid fa-chevron-right' />
                        </Link>
                    </section>
                </article>
            </section>
        </section>
    )
}

export default Credits
