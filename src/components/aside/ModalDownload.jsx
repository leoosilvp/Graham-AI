import { Monitor, Smartphone } from '@geist-ui/icons'
import { useEffect, useRef } from 'react'
import img from '../../assets/img/imgApp.png'

const ModalDownload = ({ open, onClose, onOpenMobile }) => {
    const deferredPrompt = useRef(null)

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault()
            deferredPrompt.current = e
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, [])

    const installPWA = async () => {
        if (!deferredPrompt.current) {
            console.warn('PWA installation is not available.')
            return
        }

        deferredPrompt.current.prompt()

        const { outcome } = await deferredPrompt.current.userChoice

        if (outcome === 'accepted') {
            console.log('PWA installed.')
        } else {
            console.log('PWA installation dismissed.')
        }

        deferredPrompt.current = null
    }

    if (!open) return null

    return (
        <article className="modal-download">
            <div>
                <img src={img} alt="Graham App" />
            </div>

            <section className="modal-download-content">
                <h1>Usando Graham em qualquer lugar</h1>
                <p>Também pode descarregar e usar o Graham no telemóvel e no desktop para uma experiência diferente.</p>
                <div>
                    <button onClick={() => { onClose?.(), onOpenMobile?.() }}>
                        <Smartphone size={16} />
                        Aplicação Móvel
                    </button>
                    <button className="active" onClick={async () => { await installPWA(), onClose?.() }}>
                        <Monitor size={16} />
                        Aplicação para Desktop
                    </button>
                </div>
            </section>
        </article>
    )
}

export default ModalDownload