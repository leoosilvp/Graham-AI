const Account = () => {
    return (
        <section className="settings-area-content">
            <section className="settings-area-header">
                <h1><i className="fa-regular fa-circle-user"/> Conta</h1>
            </section>

            <section className="ctn-settings-change-img">
                <div className="settings-change-img">
                    <img src="https://avatars.githubusercontent.com/u/182553526?v=4" alt="img-profile" />
                </div>
                <div>
                    <button>Trocar Imagem</button>
                    <p>Envie uma nova imagem para atualizar seu perfil no Graham AI. Para garantir qualidade e alinhamento visual, recomendamos utilizar um arquivo quadrado de 500×500 pixels. Apenas imagens nos formatos PNG, JPG ou JPEG são aceitas, com tamanho máximo permitido de 20 MB. Certifique-se de que a imagem esteja nítida, atual e adequada antes de prosseguir com o envio.</p>
                </div>
            </section>

            <hr />

            <section className="ctn-settings-input">
                <div className="settings-input">
                    <h2>Primeiro nome</h2>
                    <input type="text" placeholder="Seu nome" value={''} />
                </div>
            </section>

            <hr className="settings-divisor-area" />

            <section className="ctn-settings-input">
                <div className="settings-input">
                    <h2>Sobrenome</h2>
                    <input type="text" placeholder="Seu sobrenome" value={''} />
                </div>
            </section>

            <h1 className="settings-new-area" style={{color:'#d63c3c'}}>AREA PERIGOSA!</h1>
            <hr style={{border:'1px solid #d63c3c'}}/>

            <section className="ctn-settings-button">
                <div className="settings-button">
                    <h2>Excluir conta</h2>
                    <button className="active">Excluir</button>
                </div>
            </section>

            <hr style={{border:'1px solid #d63c3c'}}/>
            <h1 className="settings-new-area">Atualizar Plano</h1>
            <hr />

            <section className="ctn-settings-button">
                <div className="settings-button">
                    <h2>Obter o Graham PRO</h2>
                    <button>Atualizar</button>
                </div>
            </section>

        </section>
    )
}

export default Account
