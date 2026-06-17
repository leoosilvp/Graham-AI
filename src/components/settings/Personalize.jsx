
const Personalize = () => {
    return (
        <main className="settings-general-main">
            <h1>Personalização</h1>

            <section>
                <div>
                    <h2>Estilo e tom</h2>
                    <p>Estabeleça o estilo e tom que o Graham usa ao responder.</p>
                </div>
                <select>
                    <option value="Honest">Sincero</option>
                    <option value="Professional">Profissional</option>
                    <option value="Friendly">Amigável</option>
                    <option value="Cynical">Cínico</option>
                    <option value="Default">Padrão</option>
                </select>
            </section>

            <hr />

            <section>
                <div>
                    <h2>Caracteriíticas</h2>
                    <p>Escolha personalizações adicionais além do seu estilo e tom.</p>
                </div>
            </section>

            <section className="margin-top">
                <h2>Relacionamento</h2>
                <select value={'Balanced'}>
                    <option value="Friend">Amigo</option>
                    <option value="colleague">Colega</option>
                    <option value="Balanced">Equilibrado</option>
                    <option value="Enemy">Inimigo</option>
                </select>
            </section>

            <section className="margin-top-2">
                <h2>Disruptivo</h2>
                <select value={'Balanced'}>
                    <option value="more">Mais</option>
                    <option value="Balanced">Equilibrado</option>
                    <option value="less">Menos</option>
                </select>
            </section>

            <hr />

            <h1>Memória</h1>

            <section>
                <div>
                    <h2>Fazer referência ao histórico de chat</h2>
                    <p>Permitir que o Graham faça referência a conversas recentes ao responder.</p>
                </div>
                <label className='switch-container disabled'>
                    <input type="checkbox" className="switch-input" />
                    <span className="switch-slider"> <span className="switch-thumb" /></span>
                </label>
            </section>

            <hr />

            <h1>Avançado</h1>

            <section>
                <div>
                    <h2>Navegar na web</h2>
                    <p>Permita que o Graham procure automaticamente na web para obter respostas.</p>
                </div>
                <label className='switch-container disabled'>
                    <input type="checkbox" className="switch-input" />
                    <span className="switch-slider"> <span className="switch-thumb" /></span>
                </label>
            </section>
        </main>
    )
}

export default Personalize
