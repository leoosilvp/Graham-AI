import '../../css/plans.css'

const Plans = () => {
    return (
        <section className='docs-content'>

            <section className='plans-feed'>

                <div className="ctn-plans">
                    <article className='plan'>
                        <h1>BASIC</h1>
                        <h3>Crie com tecnologia de ponta. Custo zero, impacto máximo.</h3>
                        <section className='price'>
                            <h1><span>Grátis</span> /mês</h1>
                            <h2>Sem suporte para processamento de imagens.</h2>
                        </section>
                        <h3>À vista <span>R$ 0,00</span></h3>
                        <button onClick={() => window.location.href = '/chat'}>Acessar</button>
                        <h2>Acesse o plano BASIC e obtenha:</h2>
                        <div className='ul'>
                            <li><i className='fa-solid fa-check'></i> Chat inteligente e fluido.</li>
                            <li><i className='fa-solid fa-check'></i> 50 conversas por dia.</li>
                            <li><i className='fa-solid fa-check'></i> Compreensão contextual aprimorada.</li>
                            <li><i className='fa-solid fa-check'></i> Upload de arquivos (beta).</li>
                            <li><i className='fa-solid fa-check'></i> Interface rápida e imersiva.</li>
                        </div>
                    </article>

                    <article className='plan'>
                        <h1>PRO</h1>
                        <h3>O futuro não espera. Experimente o Graham AI em sua potência máxima.</h3>
                        <section className='price'>
                            <h1><span>R$75</span>/mês</h1>
                            <h2>Custos extras podem ser aplicados em uso massivo.</h2>
                        </section>
                        <h3>À vista <span>R$ 900,00</span></h3>
                        <button className='active'>Desbloquear</button>
                        <h2>Todos os benefícios do BASIC e ainda mais vantagens exclusivas:</h2>
                        <div className='ul'>
                            <li><i className='fa-solid fa-check'></i> Respostas ultra-rápidas e precisas.</li>
                            <li><i className='fa-solid fa-check'></i> Conversas ilimitadas.</li>
                            <li><i className='fa-solid fa-check'></i> Acesso prioritário a novos modelos.</li>
                            <li><i className='fa-solid fa-check'></i> Geração avançada de texto e imagem.</li>
                            <li><i className='fa-solid fa-check'></i> Contexto expandido para projetos longos.</li>
                            <li><i className='fa-solid fa-check'></i> Personalização completa de estilo e tom.</li>
                            <li><i className='fa-solid fa-check'></i> Suporte exclusivo e feedback prioritário.</li>
                        </div>
                    </article>
                </div>

                <section className='sec-payment-methods'>
                    <div className="pay-met">
                        <i className='fa-solid fa-credit-card'></i>
                        <i className='fa-brands fa-paypal'></i>
                        <i className='fa-brands fa-pix'></i>
                        <i className='fas fa-coins'></i>
                    </div>
                    <h2>Pague com cartão de crédito em até 12x, PayPal ou Pix</h2>
                    <h3>Garantimos cancelamento gratuito em até 7 dias</h3>
                </section>
            </section>

        </section>
    )
}

export default Plans
