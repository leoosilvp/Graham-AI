import qrCode from '../../assets/img/qr-code-mobile.png'

const ModalDownloadMobile = ({ open, onClose }) => {

    if (!open) return

    return (
        <main onClick={() => onClose?.()} className="modal-download-mobile-main">
            <article className="modal-download-mobile">
                <header className="modal-download-mobile-header">
                    <h1>Obtenha o Graham no celular</h1>
                    <p>O seu agente de IA está pronto para ajudar, a qualquer momento e em qualquer lugar.</p>
                </header>
                <img draggable={false} src={qrCode} />
                <button onClick={() => onClose?.()}>Concluído</button>
            </article>
        </main>
    )
}

export default ModalDownloadMobile
