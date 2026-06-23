import '../css/upgrade.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/svg/logo.svg'
import logoPleromaGraham from '../assets/svg/logo-pleroma-graham.svg'
import { Check, ChevronRight } from '@geist-ui/icons'

const Upgrade = () => {

    const navigate = useNavigate()

    return (
        <main className="upgrade-main">
            <header className='upgrade-header'>
                <Link to='/new'>
                    <img src={logo} />
                </Link>
                <Link to='/new'>Experimentar o Graham</Link>
            </header>
            <section className='upgrade-presentation'>
                <h1>Planos Individuais</h1>
                <img src={logoPleromaGraham} />
            </section>
            <section className='upgrade-grid'>
                <article className='upgrade-card'>
                    <section className='upgrade-card-content-top'>
                        <img draggable={false} src="   https://cdn-icons-png.flaticon.com/512/11618/11618857.png " />
                        <h2>Basic</h2>
                        <p>Conheça o Graham</p>
                        <div>
                            <h1>0 R$</h1>
                        </div>
                        <button onClick={() => navigate('/new')}>Use o Graham gratuitamente</button>
                    </section>
                    <hr />
                    <section className='upgrade-card-content-bottom'>
                        <div><Check size={18} />Acesso limitado ao Graham 1.8</div>
                        <div><Check size={18} />Investigação aprofundada limitada</div>
                        <div><Check size={18} />Memória e contexto limitados</div>
                        <div><Check size={18} />Busca na Web integrada</div>
                        <div><Check size={18} />Upload limitado de arquivos</div>
                    </section>
                </article>

                <article className='upgrade-card'>
                    <section className='upgrade-card-content-top'>
                        <img draggable={false} src="https://cdn-icons-png.flaticon.com/512/15663/15663807.png" />
                        <h2>Pro</h2>
                        <p>Conheça o Graham</p>
                        <div>
                            <h1>80 R$</h1>
                            <p>BRL / mês<br />cobrado anualmente</p>
                        </div>
                        <button>Obter Pro<ChevronRight size={20} /></button>
                    </section>
                    <hr />
                    <section className='upgrade-card-content-bottom'>
                        <h2>Tudo do Basic e:</h2>
                        <div><Check size={18} />Mais acesso ao Graham 1.8</div>
                        <div><Check size={18} />Limites de uso maiores</div>
                        <div><Check size={18} />Histórico completo de conversas</div>
                        <div><Check size={18} />Memória personalizada entre sessões</div>
                        <div><Check size={18} />Contexto estendido</div>
                        <div><Check size={18} />Prioridade durante horários de pico</div>
                    </section>
                </article>

                <article className='upgrade-card'>
                    <section className='upgrade-card-content-top'>
                        <img draggable={false} src="https://cdn-icons-png.flaticon.com/512/17653/17653338.png" />
                        <h2>Expert</h2>
                        <p>Conheça o Graham</p>
                        <div>
                            <h1>520 R$</h1>
                            <p>BRL / mês<br />cobrado anualmente</p>
                        </div>
                        <button>Obter Expert<ChevronRight size={20} /></button>
                    </section>
                    <hr />
                    <section className='upgrade-card-content-bottom'>
                        <h2>Tudo do Pro e:</h2>
                        <div><Check size={18} />Até 25x mais uso que o Pro*</div>
                        <div><Check size={18} />Raciocínio avançado com Graham 1.8 Pro</div>
                        <div><Check size={18} />Ferramentas exclusivas</div>
                        <div><Check size={18} />Processamento prioritário máximo</div>
                        <div><Check size={18} />Acesso antecipado a novos recursos</div>
                    </section>
                </article>
            </section>
            <footer className='upgrade-footer'>
                <p><span>Limites de uso se aplicam.</span> Preços e planos estão sujeitos a alterações a critério da Pleroma.</p>
            </footer>
        </main>
    )
}

export default Upgrade
