<div align="center">

<a href='https://graham-ai-kappa.vercel.app/'><img src="./src/assets/img/logo.svg" width="400px"></a>
</div>

access: [graham.ai](https://graham-ai-kappa.vercel.app/)

<br>

# 📑 About

GrahamAI é uma plataforma de conversação baseada em Inteligência Artificial, com foco especial em matemática de grande porte. O nome “Graham” remete à ideia de erudição matemática e especialização — uma IA que vai além do básico, habilitada para cálculos complexos, análises numéricas, resolução de problemas acadêmicos e aplicações técnicas.

A interface permite que usuários interajam com a IA via chat, guardando histórico de conversas, permitindo que ela interprete Markdown (para fórmulas, explicações formatadas), e apresente respostas com clareza. O projeto está hospedado em Vercel e tem como base um backend que se conecta a um motor de IA (via OpenRouter ou serviço equivalente) para gerar respostas.

<br>

# 📈 Purpose & Vision

- **Propósito Final:**  
  Enquanto muitos chatbots IA são generalistas, o GrahamAI busca especialização: tornar-se um motor de IA focado em **matemática avançada**, com capacidades para lidar com cálculo simbólico, álgebra, análise numérica, estatística, equações diferenciais, geometria, etc.

- **Visão de Longo Prazo:**  
  - Ser uma referência acadêmica e profissional para estudantes, pesquisadores e engenheiros que necessitam de ajuda matemática robusta.  
  - Suportar upload de expressões matemáticas em LaTeX ou similar, leitura de gráficos/imagens, passo a passo de demonstrações.  
  - Potencialmente integrar bibliotecas específicas de computação simbólica (Sympy, Mathematica, etc.) ou motores matemáticos dedicados.  
  - Tornar-se uma API especializada para uso em plataformas educacionais ou de engenharia que necessitem de um “assistente matemático”.

<br>

# ⚒️ Technical Architecture

| Camada | Tecnologia / Ferramenta |
|---|---|
| Frontend | React, React Hooks, ReactMarkdown, CSS customizado |
| Backend | Endpoint API (via Next.js ou similar), comunicação com OpenRouter ou serviço de IA |
| Hospedagem | Vercel |
| Armazenamento de estado/histórico | LocalStorage para chats salvos, identificadores de chat, usuário |
| Chave de API & Configurações | Variáveis de ambiente (`OPENROUTER_API_KEY`) |

<br>

# 📋 Future Roadmap

- ✅ Finalizar motor de IA básico para respostas gerais  
- ✅ Adicionar placeholder de “pensando…”  
- ⏳ Implementar streaming de respostas (para visibilidade em tempo real enquanto a IA responde)  
- 🔍 Integrar suporte a LaTeX / MathJax para equações matemáticas bem formatadas  
- ⚙️ Adicionar capacidades de cálculo simbólico / bibliotecas de matemática avançada (Sympy, etc.)  
- 📊 Suportar gráficos, plotagens, interpretação visual de funções  
- 🛡️ Segurança: limites de uso, sanitização de entrada, controle de custos da IA  
- 📱 Melhorias na interface: tema claro/escuro, responsividade, acessibilidade

<br>

# 🧑‍💻 Contribution

Interessado em contribuir? Aqui estão algumas orientações:

- Abra uma *issue* descrevendo o que deseja fazer (bug, melhoria, nova capacidade matemática).  
- Faça um *fork* do repositório, crie uma branch específica.  
- Mantenha o estilo do código consistente.  
- Inclua testes ou exemplos se for funcionalidade que possa ser testada.  
- Faça *pull request* com descrição clara das mudanças.

<br>

# 📜 License

Este projeto está licenciado sob a **Apache License 2.0**.

### Por que escolhemos a Apache 2.0?
A **Apache License 2.0** é uma das licenças mais usadas em projetos de grande porte, especialmente no setor de Inteligência Artificial e infraestrutura (ex: **TensorFlow**, **Kubernetes**, **Airflow**). Ela garante um equilíbrio entre **liberdade de uso** e **proteção legal**.

### O que isso significa na prática?
- ✅ **Uso livre**: qualquer pessoa ou empresa pode usar, modificar e distribuir o Graham, tanto em projetos pessoais quanto comerciais.  
- ✅ **Transparência**: modificações no código podem ser redistribuídas, desde que mantenham a mesma licença e indiquem alterações.  
- ✅ **Proteção de patentes**: se alguém contribuir com código que seja coberto por patentes, ele concede automaticamente permissão de uso dessas patentes dentro do projeto.  
- ✅ **Confiabilidade empresarial**: empresas podem adotar o Graham sem receio de restrições excessivas (diferente de licenças mais rígidas como a GPL).  

<br>

A Apache 2.0 assegura que o **Graham** permaneça um projeto **aberto, acessível e seguro para todos**, incentivando tanto a comunidade acadêmica quanto o setor empresarial a colaborar, melhorar e expandir suas capacidades.

Para mais detalhes, leia o arquivo completo de licença: [LICENSE](./LICENSE).

<br>

# 👥 Credits & Contributors

O desenvolvimento do **Graham** é fruto do trabalho colaborativo de pessoas dedicadas que acreditam no potencial de uma IA especializada em matemática.

[Leonardo Silva](https://www.linkedin.com/in/leeosilvp/) — Fundador do projeto e **Desenvolvedor Principal (Lead Developer)** responsável pela arquitetura, implementação da IA e visão estratégica do Graham.

### 👨‍💻 Contribuidores
- No momento, não há contribuidores externos. Contribua e faça parte deste projeto!

> Quer fazer parte? Veja como contribuir em nossa seção de **Contribuição**.

<div align="center">

```🚧⚠️ projeto em desenvolvimento.🚧```
</div>
