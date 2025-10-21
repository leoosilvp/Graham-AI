<div align="center">

<a href='https://graham-ai-kappa.vercel.app/'><img src="./src/assets/img/logo.svg" width="400px"></a>
</div>

access: [graham.ai](https://graham-ai-kappa.vercel.app/)


# 📑 About

GrahamAI é uma plataforma de conversação baseada em Inteligência Artificial, com foco especial em matemática de grande porte. O nome “Graham” remete à ideia de erudição matemática e especialização — uma IA que vai além do básico, habilitada para cálculos complexos, análises numéricas, resolução de problemas acadêmicos e aplicações técnicas.

A interface permite que usuários interajam com a IA via chat, guardando histórico de conversas, permitindo que ela interprete Markdown (para fórmulas, explicações formatadas), e apresente respostas com clareza.


# 📈 Purpose & Vision

- **Propósito Final:**  
  Enquanto muitos chatbots IA são generalistas, o GrahamAI busca especialização: tornar-se um motor de IA focado em **matemática avançada**, com capacidades para lidar com cálculo simbólico, álgebra, análise numérica, estatística, equações diferenciais, geometria, etc.

- **Visão de Longo Prazo:**  
  - Ser uma referência acadêmica e profissional para estudantes, pesquisadores e engenheiros que necessitam de ajuda matemática robusta.  
  - Suportar upload de expressões matemáticas em LaTeX ou similar, leitura de gráficos/imagens, passo a passo de demonstrações.  
  - Potencialmente integrar bibliotecas específicas de computação simbólica (Sympy, Mathematica, etc.) ou motores matemáticos dedicados.  
  - Tornar-se uma API especializada para uso em plataformas educacionais ou de engenharia que necessitem de um “assistente matemático”.


# ⚒️ Technical Architecture

| Camada | Tecnologia / Ferramenta |
|---|---|
| Frontend | React, React Hooks, ReactMarkdown, CSS customizado |
| Backend | Endpoint API (via Next.js ou similar), comunicação com OpenRouter ou serviço de IA |
| Hospedagem | Vercel |
| Armazenamento de estado/histórico | LocalStorage para chats salvos, identificadores de chat, usuário |


# 📋 Future Roadmap

- ✅ Finalizar motor de IA básico para respostas gerais  
- ✅ Adicionar placeholder de “pensando…”  
- ⏳ Implementar streaming de respostas (para visibilidade em tempo real enquanto a IA responde)  
- 🔍 Integrar suporte a LaTeX / MathJax para equações matemáticas bem formatadas  
- ⚙️ Adicionar capacidades de cálculo simbólico / bibliotecas de matemática avançada (Sympy, etc.)  
- 📊 Suportar gráficos, plotagens, interpretação visual de funções  
- 🛡️ Segurança: limites de uso, sanitização de entrada, controle de custos da IA  
- 📱 Melhorias na interface: tema claro/escuro, responsividade, acessibilidade


# 📜 License

Este projeto, **GrahamAI**, é um software proprietário e todos os direitos são reservados a Leonardo Silva.

### O que isso significa na prática?

- **Uso Restrito**: O uso, modificação, distribuição, engenharia reversa ou qualquer outra forma de exploração do GrahamAI é estritamente proibida sem a permissão prévia e por escrito de Leonardo Silva.

Para mais detalhes, leia o arquivo completo de licença: [LICENSE](./LICENSE).


# 👥 Credits & Contributors

O desenvolvimento do **Graham** é fruto do trabalho colaborativo de pessoas dedicadas que acreditam no potencial de uma IA especializada em matemática.

[Leonardo Silva](https://www.linkedin.com/in/leeosilvp/) — Fundador do projeto e **Desenvolvedor Principal (Lead Developer)** responsável pela arquitetura, implementação da IA e visão estratégica do Graham.
