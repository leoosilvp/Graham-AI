import '../css/library.css'
import { Link } from 'react-router-dom'
import { ArrowDown, Search } from "@geist-ui/icons"

const Library = () => {
    return (
        <main className="library-main">
            <header className="library-header">
                <h1>Biblioteca</h1>
                <div>
                    <article className="library-search">
                        <Search size={16} />
                        <input type="text" placeholder="Pesquisar na biblioteca" />
                    </article>
                </div>
            </header>

            <section className="library-filter">
                <div>
                    <Link className='active'>Todos</Link>
                    <Link>Imagens</Link>
                    <Link>Ficheiros</Link>
                </div>
            </section>

            <section className='library-grid'>
                <header>
                    <div className='library-grid-col-name'>
                        <h1>Nome</h1>
                    </div>
                    <h1>Modificação <ArrowDown size={15} /></h1>
                    <h1>Tamanho</h1>
                </header>
                <section className='library-grid-cards'>
                    <article className='library-card'>
                        <section className='library-card-left'>
                            <div className='library-card-img'>
                                <img src="https://manuais.ifsp.edu.br/uploads/images/gallery/2022-07/image-1657389184596.png" />
                            </div>
                            <p>image-1657389184596.png</p>
                        </section>

                        <section className='library-card-center'>
                            <p>5/06</p>
                        </section>

                        <section className='library-card-right'>
                            <p>162 KB</p>
                        </section>
                    </article>
                </section>
            </section>
        </main>
    )
}

export default Library
