import { useEffect, useState } from 'react'
import '../css/upd.css'

const Upd = () => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        const first = localStorage.getItem("firstLogin")

        if (!first) {
            localStorage.setItem("firstLogin", "true")
            setShow(true)
        } else {
            if (first === "true") setShow(true)
        }
    }, [])

    const handleClose = () => {
        localStorage.setItem("firstLogin", false)
        setShow(false)
        window.location.reload()
    }

    const redirectUpd = () => {
        localStorage.setItem("firstLogin", false)
        setShow(false)
        window.open('https://graham-ai-page.vercel.app/', '_blank')
    }

    if (!show) return null

    return (
        <section className="ctn-upd">
            <article className="upd">
                <div className="upd-content">
                    <video src='https://anonymousai-hub.github.io/DB/video/upd.mp4' controls />
                    <section className='text-upd'>
                        <h1>Apresentando o Graham 1.3</h1>
                        <p>mais rápido, mais fluido e capaz de manter contexto real das conversas. Agora interpreta documentos e imagens com profundidade, extrai insights úteis e aprende continuamente com cada interação. Uma atualização de paradigma para criar experiências mais inteligentes, personalizadas e humanas.</p>
                        <div className="date-upd">
                            <h2>Atualização</h2>
                            <h3>10 Novembro 2025 </h3>
                        </div>
                    </section>
                </div>
                <div className="upd-btns">
                    <button onClick={handleClose}>Fechar</button>
                    <button onClick={redirectUpd}>Saber mais</button>
                </div>
            </article>
        </section>
    )
}

export default Upd
