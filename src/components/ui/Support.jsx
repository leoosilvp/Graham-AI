const Support = () => {
    return (
        <section className="settings-area-content">
            <section className="settings-area-header">
                <h1><i className="fa-regular fa-life-ring"/> Suporte</h1>
            </section>

            <section className="support">
                <h1>Se precisar de ajuda com o Graham AI, você está no lugar certo. Aqui reunimos as orientações básicas para resolver os principais problemas e facilitar sua experiência na plataforma.</h1>
                
                <hr />

                <h2>Perguntas frequentes</h2>

                <h3>Alterar imagem de perfil</h3>
                <p>Acesse Configurações e em Conta faça o upload de uma nova imagem. O arquivo deve estar nos formatos PNG, JPG ou JPEG, ter no máximo 20 MB e, preferencialmente, 500×500 pixels.</p>
                
                <h3>Ajustar preferências do Graham AI</h3>
                <p>Na seção Personalização, você pode definir estilo, tom e instruções que o Graham AI deve seguir ao responder.</p>
                
                <h3>Memória</h3>
                <p>Você pode ativar ou desativar o recurso de memórias a qualquer momento em Configurações e Personalização.</p>
                
                <h2>Problemas comuns</h2>
                
                <h3>Erro ao enviar imagem</h3>
                <p>Certifique-se de que o arquivo está dentro das regras:</p>
                <ul>
                    <li>Máx. 20 MB</li>
                    <li>PNG, JPG ou JPEG</li>
                    <li>Tamanho ideal 500×500 pixels</li>
                </ul>

                <h2>Contato</h2>
                <p>Se ainda precisar de ajuda, entre em contato com nossa equipe:</p>
                <a href="mailto:support@grahamai.com">support@grahamai.com</a>
            </section>

        </section>
    )
}

export default Support
