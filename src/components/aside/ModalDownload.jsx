import { Monitor, Smartphone } from '@geist-ui/icons'
import img from '../../assets/img/imgApp.png'

const ModalDownload = ({ open }) => {

    if (!open) return

    return (
        <article className="modal-download">
            <div>
                <img src={img} />
            </div>
            <section className='modal-download-content'>
                <h1>Usando Graham em qualquer lugar</h1>
                <p>Também pode descarregar e usar o Graham no telemóvel e no desktop para uma experiência diferente.</p>
                <div>
                    <button><Smartphone size={16} />Aplicação Móvel</button>
                    <button className='active'><Monitor size={16} />Aplicação para Desktop</button>
                </div>
            </section>
        </article>
    )
}

export default ModalDownload
