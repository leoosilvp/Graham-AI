const Customization = () => {
  return (
    <section className="settings-area-content">
      <section className="settings-area-header">
        <h1>Personalização</h1>
      </section>

      <section className="ctn-settings-change">
        <div className="settings-change">
          <h2>Estilo e Tom</h2>
          <button>Padrão <i className="fa-solid fa-chevron-down"></i></button>
        </div>
        <p>Estabeleça o estilo e tom que o Graham AI usa ao responder. Isto não afeta as capacidades do Graham AI.</p>
      </section>

      <section className="ctn-settings-input">
        <div className="settings-input">
          <h2>Instruções personalizadas</h2>
          <input type="text" placeholder="Preferencias adicionais de comportamento, estilo e tom" />
        </div>
      </section>

      <h1 className="settings-new-area">Sobre você</h1>

      <hr className="settings-divisor-area"/>

      <section className="ctn-settings-input">
        <div className="settings-input">
          <h2>Nome/Apelido</h2>
          <input type="text" placeholder="Como o Graham deve se dirigir a você?" />
        </div>
      </section>

      <section className="ctn-settings-input">
        <div className="settings-input">
          <h2>Profissão</h2>
          <input type="text" placeholder="ex: Copywriter freelancer" />
        </div>
      </section>

      <section className="ctn-settings-input">
        <div className="settings-input">
          <h2>Sobre</h2>
          <input type="text" placeholder="Interesses, valores ou preferências a levar em conta" />
        </div>
      </section>

      <h1 className="settings-new-area">Memória</h1>

      <hr />

      <section className="ctn-settings-switch">
        <section className="settings-switch">
          <h2>Fazer referência a memórias guardadas</h2>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider" />
          </label>
        </section>
        <p>Permite que o Graham AI guarde e use memórias ao responder.</p>
      </section>

    </section>
  )
}

export default Customization
