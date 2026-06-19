import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronRight, Code, Coffee, Edit3, Function, PieChart, X } from '@geist-ui/icons'

const MAX_PREVIEW_CHARS = 143

const truncate = (text) =>
    text.length > MAX_PREVIEW_CHARS ? text.slice(0, MAX_PREVIEW_CHARS).trimEnd() + '...' : text

const TOOLS = [
    {
        id: 'code',
        label: 'Código',
        icon: Code,
        prompts: [
            {
                short: 'Revisar meu código',
                full: 'Olá Graham, você poderia revisar meu código? Antes de começar, me pergunte a linguagem, o que ele deve fazer e o que especificamente não está funcionando ou poderia ser melhorado.',
            },
            {
                short: 'Criar um componente do zero',
                full: 'Olá Graham, você poderia me ajudar a criar um componente? Me pergunte qual é o framework, o que esse componente precisa fazer, quais props deve aceitar e se há algum padrão visual ou de arquitetura para seguir.',
            },
            {
                short: 'Depurar um erro',
                full: 'Olá Graham, você poderia me ajudar a depurar um erro? Me pergunte qual é a mensagem exata, em qual linguagem ou framework estou trabalhando, o que o código deveria fazer e o que já tentei até agora.',
            },
            {
                short: 'Planejar a arquitetura de um projeto',
                full: 'Olá Graham, você poderia me ajudar a planejar a arquitetura de um projeto? Me pergunte o tipo de aplicação, as tecnologias que cogito usar, o escopo esperado e quais são as principais preocupações — escalabilidade, simplicidade ou tempo de entrega.',
            },
        ],
    },
    {
        id: 'study',
        label: 'Estudar',
        icon: Coffee,
        prompts: [
            {
                short: 'Me explique um conceito',
                full: 'Olá Graham, você poderia me explicar um conceito a fundo? Me pergunte qual é o tema, o que já sei sobre ele e se prefiro uma abordagem conceitual, com analogias ou com exemplos práticos de código.',
            },
            {
                short: 'Me aplique um quiz',
                full: 'Olá Graham, você poderia me aplicar um quiz? Me pergunte sobre qual assunto, qual é o meu nível atual e se prefiro perguntas abertas, múltipla escolha ou situações práticas.',
            },
            {
                short: 'Monte um plano de estudos',
                full: 'Olá Graham, você poderia montar um plano de estudos para mim? Me pergunte o que quero aprender, meu nível atual, quanto tempo tenho disponível por dia e qual é o meu prazo ou objetivo final.',
            },
            {
                short: 'Simule uma entrevista técnica',
                full: 'Olá Graham, você poderia simular uma entrevista técnica comigo? Me pergunte para qual tipo de vaga estou me candidatando, qual linguagem ou stack prefiro e se quero focar em algoritmos, system design ou perguntas conceituais.',
            },
        ],
    },
    {
        id: 'write',
        label: 'Escrever',
        icon: Edit3,
        prompts: [
            {
                short: 'Escrever do zero',
                full: 'Olá Graham, você poderia me ajudar a escrever um texto? Me pergunte qual é o formato — artigo, e-mail, relatório, post —, para quem é, qual o objetivo e o tom desejado. Depois me ajude a estruturar e escrever.',
            },
            {
                short: 'Revisar e melhorar meu texto',
                full: 'Olá Graham, você poderia revisar e melhorar um texto meu? Me pergunte em quais aspectos devo focar — clareza, coesão, gramática, tom ou impacto — e depois te colo o texto para trabalharmos juntos.',
            },
            {
                short: 'Escrever um e-mail difícil',
                full: 'Olá Graham, você poderia me ajudar a escrever um e-mail difícil? Me pergunte para quem é, qual é a situação, o que precisa ser comunicado e qual tom usar. Quero encontrar as palavras certas.',
            },
            {
                short: 'Criar documentação técnica',
                full: 'Olá Graham, você poderia me ajudar a criar uma documentação técnica? Me pergunte o que precisa ser documentado, quem vai ler — desenvolvedor, usuário final, time de produto — e qual o nível de detalhe esperado.',
            },
        ],
    },
    {
        id: 'charts',
        label: 'Gráficos',
        icon: PieChart,
        prompts: [
            {
                short: 'Criar um gráfico com código',
                full: 'Olá Graham, você poderia me ajudar a criar um gráfico? Me pergunte qual biblioteca estou usando, que tipo de dado quero visualizar, qual tipo de gráfico prefiro e se tenho alguma referência de design para seguir.',
            },
            {
                short: 'Montar um dashboard',
                full: 'Olá Graham, você poderia me ajudar a montar um dashboard? Me pergunte quais métricas precisam aparecer, para qual público é, qual tecnologia estou usando e se tenho alguma referência visual.',
            },
            {
                short: 'Transformar dados em visualização',
                full: 'Olá Graham, você poderia me ajudar a transformar dados em uma visualização clara? Me pergunte como os dados estão estruturados, o que quero destacar ou comunicar e para qual plataforma é a visualização.',
            },
            {
                short: 'Escolher o tipo certo de gráfico',
                full: 'Olá Graham, você poderia me ajudar a escolher o tipo certo de gráfico? Não sei qual usar para os meus dados. Me pergunte o que quero comunicar e me explique as opções — barras, linhas, pizza, dispersão, heatmap — com os motivos de cada escolha.',
            },
        ],
    },
    {
        id: 'math',
        label: 'Cálculos',
        icon: Function,
        prompts: [
            {
                short: 'Resolver um problema passo a passo',
                full: 'Olá Graham, você poderia me ajudar a resolver um problema passo a passo? Me pergunte qual é o enunciado e se prefiro apenas a resposta, a resolução completa ou uma explicação detalhada de cada etapa do raciocínio.',
            },
            {
                short: 'Entender um conceito matemático',
                full: 'Olá Graham, você poderia me explicar um conceito matemático? Me pergunte qual é o tema, qual é o meu nível de familiaridade com ele e se prefiro uma abordagem formal, visual ou com aplicações práticas.',
            },
            {
                short: 'Verificar minha resolução',
                full: 'Olá Graham, você poderia verificar a minha resolução de um exercício? Me pergunte qual é o enunciado e como cheguei na resposta — quero que revise cada etapa, aponte o que está certo ou errado e explique o motivo.',
            },
            {
                short: 'Analisar complexidade de algoritmo',
                full: 'Olá Graham, você poderia analisar a complexidade de um algoritmo meu? Me pergunte se prefiro passar o código ou descrever o algoritmo, e se quero focar em tempo, espaço ou nos dois — com explicação do raciocínio por trás.',
            },
        ],
    },
]

const ToolBar = ({ onPreview, onSend }) => {
    const [activeTool, setActiveTool] = useState(null)
    const modalRef = useRef(null)

    const openTool = (toolId) => {
        setActiveTool(toolId === activeTool ? null : toolId)
    }

    const closeModal = useCallback(() => {
        setActiveTool(null)
        onPreview?.('')
    }, [onPreview])

    useEffect(() => {
        if (!activeTool) return

        const handleOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal()
            }
        }

        document.addEventListener('mousedown', handleOutside)
        return () => document.removeEventListener('mousedown', handleOutside)
    }, [activeTool, closeModal])

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') closeModal()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [closeModal])

    const currentTool = TOOLS.find((t) => t.id === activeTool)

    return (
        <main className="tool-bar-main" ref={modalRef}>
            <div className="tool-bar-buttons">
                {TOOLS.map((tool) => {
                    const Icon = tool.icon
                    const isActive = activeTool === tool.id
                    return (
                        <button
                            key={tool.id}
                            className={`tool-bar-btn ${isActive ? 'active' : ''}`}
                            onClick={() => openTool(tool.id)}
                            aria-pressed={isActive}
                        >
                            <Icon color={isActive ? 'var(--foreground)' : 'var(--gray-color-3)'} size={17} />
                            {tool.label}
                        </button>
                    )
                })}
            </div>

            {activeTool && currentTool && (
                <section className="tool-bar-prompt" role="dialog" aria-label={`Sugestões de ${currentTool.label}`}>
                    <header>
                        <div className="tool-bar-prompt-title">
                            {(() => {
                                const Icon = currentTool.icon
                                return <Icon size={15} />
                            })()}
                            {currentTool.label}
                        </div>
                        <button
                            className="tool-bar-prompt-close"
                            onClick={closeModal}
                            aria-label="Fechar"
                        >
                            <X size={18} />
                        </button>
                    </header>

                    <section>
                        {currentTool.prompts.map((prompt, i) => (
                            <button
                                key={i}
                                className={`tool-bar-prompt-item ${i === currentTool.prompts.length - 1 ? 'last' : ''}`}
                                onMouseEnter={() => onPreview?.(truncate(prompt.full))}
                                onMouseLeave={() => onPreview?.('')}
                                onClick={() => {
                                    onPreview?.('')
                                    closeModal()
                                    onSend?.({ message: prompt.full, files: [] })
                                }}
                            >
                                {prompt.short}
                                <ChevronRight className='icon' color='#5d5d5d' size={18} />
                            </button>
                        ))}
                    </section>
                </section>
            )}
        </main>
    )
}

export default ToolBar