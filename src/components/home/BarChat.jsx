import { useRef, useEffect, useState, useCallback } from 'react'
import { Send, Square, Plus, X } from '@geist-ui/icons'
import ModalUpload from './ModalUpload'

const MAX_FILES = 5

const BarChat = ({
  onSend,
  onStop,
  isLoading,
  active
}) => {

  const textareaRef = useRef(null)

  const [value, setValue] = useState('')
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const el = textareaRef.current

    if (!el) return

    el.style.height = '0px'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [value])

  useEffect(() => {
    if (!isLoading) {
      textareaRef.current?.focus()
    }
  }, [isLoading])

  const handleModalFiles = useCallback((pickedFiles) => {
    setFileError('')

    setFiles(prev => {
      const merged = [...prev, ...pickedFiles]

      if (merged.length > MAX_FILES) {
        setFileError(`Máximo de ${MAX_FILES} arquivos por mensagem.`)
        return prev
      }

      return merged
    })
  }, [])

  const handleScreenshot = useCallback((file) => {
    handleModalFiles([file])
  }, [handleModalFiles])

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setFileError('')
  }

  const handleSend = () => {
    const message = value.trim()

    if (!message || isLoading) return

    onSend?.({ message, files })

    setValue('')
    setFiles([])
    setFileError('')
    setModalOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const canSend = value.trim().length > 0 && !isLoading

  return (
    <main className={`bar-chat-main ${active ? 'active' : ''}`}>
      <ModalUpload
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onFilesSelected={handleModalFiles}
        onScreenshotCaptured={handleScreenshot}
      />

      {files.length > 0 && (
        <div className="bar-chat-chips">
          {files.map((file, index) => (
            <span key={`${file.name}-${index}`} className="bar-chat-chip">
              <span className="bar-chat-chip-name">{file.name}</span>

              <button
                className="bar-chat-chip-remove"
                aria-label={`Remover ${file.name}`}
                onClick={() => removeFile(index)}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {fileError && (
        <p className="bar-chat-error">{fileError}</p>
      )}

      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        disabled={isLoading}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
        className={`bar-chat-textarea ${active ? 'active' : ''}`}
        placeholder={isLoading ? 'Pensando...' : active ? 'Escreva uma mensagem...' : 'Como posso ajudar você hoje?'}
      />

      <section className="bar-chat-btns">
        <button
          className="bar-chat-icon-btn"
          aria-label="Anexar arquivo"
          disabled={isLoading || files.length >= MAX_FILES}
          onClick={() => setModalOpen(prev => !prev)}
        >
          <Plus size={19} />
        </button>

        <div className="bar-chat-right">
          <p className="bar-chat-model">Graham 1.8</p>

          {isLoading ? (
            <button
              className="bar-chat-stop-btn"
              aria-label="Parar geração"
              onClick={onStop}
            >
              <Square size={18} />
            </button>
          ) : (
            <button
              className="bar-chat-send-btn"
              aria-label="Enviar mensagem"
              disabled={!canSend}
              onClick={handleSend}
            >
              <Send size={18} />
            </button>
          )}
        </div>
      </section>

      {active && (
        <p className="bar-chat-alert">O Graham é uma IA e pode cometer erros. Considere verificar informações importantes.</p>
      )}
    </main>
  )
}

export default BarChat