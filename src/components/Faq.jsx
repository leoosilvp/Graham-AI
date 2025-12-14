import { useState } from 'react'
import '../css/faq.css'

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleToggle = (index) => {
    setActiveIndex(prev =>
      prev === index ? null : index
    )
  }

  return (
    <section className='ctn-faq'>
      <h1>Perguntas frequentes</h1>

      <article className={`faq-item ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleToggle(0)}>
        <section className="faq-question">
          <h3>Graham é grátis?</h3>
          <span className="faq-toggle">+</span>
        </section>
        <section className="faq-answer">
          <p>Sim. Existe um plano gratuito com acesso às principais funcionalidades.</p>
        </section>
      </article>

      <article className={`faq-item ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleToggle(1)}>
        <section className="faq-question">
          <h3>O Graham salva minhas conversas?</h3>
          <span className="faq-toggle">+</span>
        </section>
        <section className="faq-answer">
          <p>Sim, quando a memória está ativada, o histórico é armazenado para contexto.</p>
        </section>
      </article>

      <article className={`faq-item ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleToggle(2)}>
        <section className="faq-question">
          <h3>Quantas mensagens o Graham lembra?</h3>
          <span className="faq-toggle">+</span>
        </section>
        <section className="faq-answer">
          <p>Por padrão, até as últimas 10 conversas.</p>
        </section>
      </article>

      <article className={`faq-item ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleToggle(3)}>
        <section className="faq-question">
          <h3>Qual a diferença entre BASIC e PRO?</h3>
          <span className="faq-toggle">+</span>
        </section>
        <section className="faq-answer">
          <p>O plano PRO oferece mais limites, memória avançada e recursos extras.</p>
        </section>
      </article>

      <article className={`faq-item ${activeIndex === 4 ? 'active' : ''}`} onClick={() => handleToggle(4)}>
        <section className="faq-question">
          <h3>Meus dados são privados?</h3>
          <span className="faq-toggle">+</span>
        </section>
        <section className="faq-answer">
          <p>Sim. As conversas são protegidas e acessíveis apenas pelo usuário.</p>
        </section>
      </article>

    </section>
  )
}

export default Faq
