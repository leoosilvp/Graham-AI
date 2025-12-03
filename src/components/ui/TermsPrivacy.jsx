const TermsPrivacy = () => {
    return (
        <section className="settings-area-content">
            <section className="settings-area-header">
                <h1><i className="fa-regular fa-address-book" /> Termos e Privacidade</h1>
            </section>

            <section className="ctn-settings-link">
                <div className="settings-link">
                    <h2>Visualizar Termos e Privacidade</h2>
                    <a href="https://graham-ai-page.vercel.app/">Visualizar</a>
                </div>
            </section>

            <hr />

            <section className="ctn-settings-switch">
                <div className="settings-switch">
                    <h2>Termos e Privacidade</h2>
                    <label class="switch">
                        <input type="checkbox" checked/>
                        <span class="slider" />
                    </label>
                </div>
            </section>

        </section>
    )
}

export default TermsPrivacy
