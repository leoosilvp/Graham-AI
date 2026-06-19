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
                short: 'Code review crítico',
                full: 'Olá Graham, atue como um revisor de código sênior e cético. Antes de qualquer sugestão, me pergunte a linguagem, o objetivo do código e o contexto em que ele roda em produção. Depois, aponte primeiro os riscos reais — bugs, edge cases, segurança e performance — e só então sugira melhorias de estilo. Para cada ponto, explique o porquê, não só o quê.',
            },
            {
                short: 'Prototipar uma feature do zero',
                full: 'Olá Graham, quero construir uma feature do zero com você. Me pergunte o framework, o problema que ela resolve, quem são os usuários, quais props ou estados ela precisa gerenciar e se já existe algum padrão de arquitetura no projeto que devo seguir. Proponha uma estrutura antes de escrever qualquer linha de código.',
            },
            {
                short: 'Depurar com método',
                full: 'Olá Graham, me ajude a depurar um erro de forma sistemática. Me pergunte a mensagem exata, a stack trace, o que o código deveria fazer, o que já tentei e em que ponto ele realmente falha. Gere hipóteses ordenadas por probabilidade antes de propor qualquer correção — quero entender a causa raiz, não só o patch.',
            },
            {
                short: 'Decidir a arquitetura certa',
                full: 'Olá Graham, quero pensar a arquitetura de um projeto com você antes de escrever código. Me pergunte o tipo de aplicação, a escala esperada, o time disponível e o que mais importa agora — velocidade de entrega, simplicidade de manutenção ou escalabilidade futura. Apresente 2-3 abordagens reais com os trade-offs de cada uma, não uma resposta única.',
            },
        ],
    },
    {
        id: 'study',
        label: 'Estudar',
        icon: Coffee,
        prompts: [
            {
                short: 'Aprender um conceito difícil',
                full: 'Olá Graham, quero entender um conceito a fundo, não de forma superficial. Me pergunte qual é o tema, o que eu já sei sobre ele e onde estou travando. Comece pela intuição antes da formalização, use analogias quando ajudar, e termine me testando com uma pergunta para ver se eu realmente entendi.',
            },
            {
                short: 'Quiz para testar meu nível',
                full: 'Olá Graham, me aplique um quiz de verdade — sem me dar respostas fáceis. Me pergunte o assunto, meu nível atual e o formato que prefiro. Aumente a dificuldade conforme eu acertar, e quando eu errar, não corrija na hora: me dê uma dica primeiro.',
            },
            {
                short: 'Plano de estudos sob pressão',
                full: 'Olá Graham, monte comigo um plano de estudos realista. Me pergunte o que quero aprender, meu nível atual, quanto tempo tenho por dia e qual é o prazo final. Distribua o conteúdo por prioridade — o que é essencial primeiro — e me avise se o prazo que eu dei é, na prática, inviável.',
            },
            {
                short: 'Simular entrevista técnica de verdade',
                full: 'Olá Graham, simule uma entrevista técnica comigo como se fosse real — sem suavizar. Me pergunte a vaga, a stack e se quero focar em algoritmos, system design ou comportamental. Durante a entrevista, me interrompa se eu enrolar, peça para eu pensar em voz alta, e no final me dê um feedback honesto como se fosse o entrevistador.',
            },
        ],
    },
    {
        id: 'write',
        label: 'Escrever',
        icon: Edit3,
        prompts: [
            {
                short: 'Escrever do zero, sem clichê',
                full: 'Olá Graham, quero escrever um texto que não pareça genérico. Me pergunte o formato, para quem é, o objetivo e o tom. Antes de escrever o texto final, me proponha 2-3 ângulos diferentes para a abertura — quero escolher o melhor, não receber só uma opção.',
            },
            {
                short: 'Revisão que vai além da gramática',
                full: 'Olá Graham, revise um texto meu olhando além da gramática. Me pergunte o que devo priorizar — clareza, ritmo, argumento ou impacto — e o público-alvo. Quando eu colar o texto, aponte onde o argumento fica fraco ou repetitivo antes de qualquer correção de estilo.',
            },
            {
                short: 'Escrever o e-mail difícil que estou evitando',
                full: 'Olá Graham, me ajude a escrever um e-mail que estou evitando mandar. Me pergunte para quem é, a situação, o que precisa ser dito e o que eu tenho medo de que aconteça. Me mostre duas versões — uma mais direta e uma mais diplomática — para eu decidir o tom certo.',
            },
            {
                short: 'Documentação que alguém vai realmente ler',
                full: 'Olá Graham, me ajude a criar documentação técnica que as pessoas vão realmente usar. Me pergunte o que precisa ser documentado, quem vai ler — dev, usuário final ou produto — e o nível de detalhe esperado. Estruture pensando em quem só vai escanear o texto procurando uma resposta rápida.',
            },
        ],
    },
    {
        id: 'charts',
        label: 'Gráficos',
        icon: PieChart,
        prompts: [
            {
                short: 'Construir o gráfico certo, com código',
                full: 'Olá Graham, me ajude a construir um gráfico. Me pergunte qual biblioteca estou usando, como os dados estão estruturados e o que quero comunicar. Antes de escrever o código, me diga se o tipo de gráfico que eu tinha em mente é mesmo o melhor para esse dado — e por quê.',
            },
            {
                short: 'Montar um dashboard que conta uma história',
                full: 'Olá Graham, me ajude a montar um dashboard. Me pergunte quais métricas precisam aparecer, para qual público é e qual tecnologia estou usando. Sugira uma hierarquia visual — o que deve chamar atenção primeiro — em vez de listar todos os gráficos no mesmo nível de importância.',
            },
            {
                short: 'Dados brutos em insight visual',
                full: 'Olá Graham, tenho dados brutos e quero transformá-los em uma visualização que realmente comunique algo. Me pergunte como os dados estão estruturados, o que eu quero destacar e onde essa visualização vai ser usada. Antes de qualquer gráfico, me diga qual é a única coisa que ela precisa deixar óbvia.',
            },
            {
                short: 'Qual gráfico usar (e por quê)',
                full: 'Olá Graham, não sei qual tipo de gráfico usar para os meus dados. Me pergunte o que exatamente eu quero comunicar — comparação, distribuição, tendência ou relação. Apresente as 2-3 opções mais adequadas, explique o motivo de cada uma e diga qual erro mais comum as pessoas cometem nesse tipo de escolha.',
            },
        ],
    },
    {
        id: 'math',
        label: 'Cálculos',
        icon: Function,
        prompts: [
            {
                short: 'Resolver com raciocínio explícito',
                full: 'Olá Graham, me ajude a resolver um problema passo a passo. Me pergunte o enunciado e se eu quero só a resposta, a resolução completa ou uma explicação detalhada de cada etapa do raciocínio. Se eu errar uma suposição no meio do caminho, me avise antes de continuar — não carregue o erro até o final.',
            },
            {
                short: 'Entender de verdade, não só memorizar',
                full: 'Olá Graham, quero entender um conceito matemático de verdade, não só memorizar a fórmula. Me pergunte o tema, minha familiaridade com ele e se prefiro uma abordagem formal, visual ou aplicada. Me mostre um caso em que a intuição comum sobre esse conceito falha.',
            },
            {
                short: 'Auditar minha resolução',
                full: 'Olá Graham, quero que você audite a minha resolução de um exercício, não apenas confirme se está certa. Me pergunte o enunciado e como eu cheguei na resposta. Revise cada etapa do meu raciocínio, aponte onde a lógica é frágil mesmo que o resultado final esteja certo, e explique o porquê.',
            },
            {
                short: 'Complexidade real do meu algoritmo',
                full: 'Olá Graham, analise a complexidade de um algoritmo meu. Me pergunte se prefiro colar o código ou descrever o algoritmo, e se quero focar em tempo, espaço ou ambos. Além do Big O, me diga em que situações reais essa complexidade teórica pode não refletir a performance prática.',
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