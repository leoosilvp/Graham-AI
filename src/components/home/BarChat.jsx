import { useRef, useEffect, useState } from 'react'
import { Send, Square, Plus, X } from '@geist-ui/icons'

const ALLOWED_EXTS = new Set([
  'txt', 'md', 'json', 'csv', 'tsv', 'yaml', 'yml', 'log', 'sql',
  'js', 'ts', 'jsx', 'tsx', 'mjs', 'cjs', 'py', 'rb', 'go', 'rs',
  'java', 'c', 'cpp', 'h', 'cs', 'php', 'swift', 'kt', 'sh', 'bash',
  'html', 'htm', 'css', 'scss', 'graphql', 'proto',
])

const MAX_FILES = 5

function getExt(name = '') {
  return name.split('.').pop().toLowerCase()
}

const BarChat = ({ onSend, onStop, isLoading, active }) => {
  const textareaRef = useRef(null)
  const fileInputRef = useRef(null)
  const [value, setValue] = useState('')
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0px'
    el.style.height = Math.min(el.scrollHeight, 200) + 'px'
  }, [value])

  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus()
  }, [isLoading])

  const handleSend = () => {
    const message = value.trim()
    if (!message || isLoading) return

    onSend?.({ message, files })

    setValue('')
    setFiles([])
    setFileError('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (e) => {
    const picked = Array.from(e.target.files ?? [])
    setFileError('')

    const invalid = picked.find(f => !ALLOWED_EXTS.has(getExt(f.name)))
    if (invalid) {
      setFileError(`"${invalid.name}" não é permitido. Apenas arquivos de texto e código.`)
      fileInputRef.current.value = ''
      return
    }

    setFiles(prev => {
      const merged = [...prev, ...picked]
      if (merged.length > MAX_FILES) {
        setFileError(`Máximo de ${MAX_FILES} arquivos por mensagem.`)
        return prev
      }
      return merged
    })

    fileInputRef.current.value = ''
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setFileError('')
  }

  const canSend = value.trim().length > 0 && !isLoading

  return (
    <main className={`bar-chat-main ${active ? 'active' : ''}`}>
      {files.length > 0 && (
        <div className="bar-chat-chips">
          {files.map((f, i) => (
            <span key={i} className="bar-chat-chip">
              <span className="bar-chat-chip-name">{f.name}</span>
              <button
                onClick={() => removeFile(i)}
                aria-label={`Remover ${f.name}`}
                className="bar-chat-chip-remove"
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
        className={`bar-chat-textarea ${active ? 'active' : ''}`}
        placeholder={isLoading ? "Pensando..." : "Como posso ajudar você hoje?"}
        rows={1}
        value={value}
        disabled={isLoading}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <section className="bar-chat-btns">
        <button
          className="bar-chat-icon-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading || files.length >= MAX_FILES}
          aria-label="Anexar arquivo"
        >
          <Plus size={19} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          accept={[...ALLOWED_EXTS].map(e => `.${e}`).join(',')}
          onChange={handleFileChange}
          aria-hidden="true"
        />

        <div className="bar-chat-right">
          <p className="bar-chat-model">ØSX Astra 1.3</p>

          {isLoading ? (
            <button
              className="bar-chat-stop-btn"
              onClick={onStop}
              aria-label="Parar geração"
            >
              <Square size={18} />
            </button>
          ) : (
            <button
              className="bar-chat-send-btn"
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Enviar mensagem"
            >
              <Send size={18} />
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

export default BarChat