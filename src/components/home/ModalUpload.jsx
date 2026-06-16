import { useEffect, useRef } from 'react'
import { Camera, Check, Folder, Globe, Paperclip } from '@geist-ui/icons'
import { useNavigate } from 'react-router-dom'

const ModalUpload = ({
    open,
    onClose,
    onFilesSelected,
    onScreenshotCaptured
}) => {

    const navigate = useNavigate()
    const modalRef = useRef(null)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (!open) return

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose?.()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open, onClose])

    const handlePickFiles = () => {
        fileInputRef.current?.click()
    }

    const handleFiles = (e) => {
        const files = Array.from(e.target.files || [])

        if (files.length) {
            onFilesSelected?.(files)
        }

        e.target.value = ''
        onClose?.()
    }

    const handleScreenshot = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: false
            })

            const track = stream.getVideoTracks()[0]
            const imageCapture = new ImageCapture(track)
            const bitmap = await imageCapture.grabFrame()

            const canvas = document.createElement('canvas')
            canvas.width = bitmap.width
            canvas.height = bitmap.height

            const ctx = canvas.getContext('2d')
            ctx.drawImage(bitmap, 0, 0)

            const blob = await new Promise(resolve =>
                canvas.toBlob(resolve, 'image/png')
            )

            const file = new File(
                [blob],
                `screenshot-${Date.now()}.png`,
                { type: 'image/png' }
            )

            onScreenshotCaptured?.(file)

            track.stop()
            onClose?.()
        } catch (err) {
            console.error(err)
        }
    }

    if (!open) return null

    return (
        <article ref={modalRef} className="modal-upload">
            <button onClick={handlePickFiles}><p><Paperclip size={16} />Adicionar arquivos ou fotos</p><span>Ctrl + Q</span></button>
            <button onClick={handleScreenshot}><p><Camera size={16} />Fazer captura de tela</p></button>
            <hr />
            <button onClick={() => {navigate('/library'), onClose?.() }}><p><Folder size={16} />Meus arquivos</p></button>
            <hr />
            <button onClick={() => {navigate('/settings'), onClose?.() }}><p><Globe size={16} />Buscar na web</p><span><Check size={16} color="#4987d9" /></span></button>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                accept="*"
                onChange={handleFiles}
            />
        </article>
    )
}

export default ModalUpload