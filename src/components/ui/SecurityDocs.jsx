const SecurityDocs = () => {
    return (
        <article>
            <h1>Segurança e Privacidade</h1>
            <p>
                A <span>Segurança e Privacidade</span> são pilares inegociáveis do Graham AI. Nossa infraestrutura e políticas são desenhadas para proteger os dados do usuário com o mais alto padrão de governança, garantindo que a sua interação com a IA seja sempre confidencial e segura.
            </p>
            <h3>Criptografia de Nível Empresarial</h3>
            <p>
                Implementamos um sistema de segurança em camadas:
                <ul>
                    <li><span>Criptografia em Trânsito (TLS 1.3):</span> Todas as comunicações entre o seu dispositivo e os servidores do Graham AI são protegidas por criptografia de ponta a ponta, impedindo a interceptação de dados.</li>
                    <li><span>Criptografia em Repouso (AES-256):</span> Os dados armazenados, incluindo o histórico de conversas (quando a memória está ativa), são criptografados usando o padrão AES-256, garantindo que o acesso não autorizado aos bancos de dados resulte em dados ilegíveis.</li>
                </ul>
            </p>
            <h3>Política de Uso de Dados e Conformidade</h3>
            <p>
                O Graham AI adota uma política de <span>"Seus Dados, Seu Controle"</span>.
                <ol>
                    <li><span>Não Utilização para Treinamento:</span> Suas conversas e dados de entrada <span>não são utilizados</span> para treinar ou aprimorar os modelos de IA subjacentes, garantindo a confidencialidade das suas informações proprietárias.</li>
                    <li><span>Conformidade Regulatória:</span> Estamos em total conformidade com as principais regulamentações globais de proteção de dados, incluindo a <span>LGPD (Lei Geral de Proteção de Dados)</span> e o <span>GDPR (General Data Protection Regulation)</span>, oferecendo aos usuários o direito de acesso, retificação e exclusão de seus dados.</li>
                    <li><span>Controle de Acesso:</span> O acesso ao seu histórico de conversas é estritamente limitado e protegido por mecanismos robustos de autenticação (OAuth 2.0) e autorização.</li>
                </ol>
            </p>
            <h3>Segurança da Plataforma</h3>
            <p>
                Nossa plataforma passa por auditorias de segurança regulares e utiliza práticas de desenvolvimento seguro (DevSecOps) para mitigar vulnerabilidades e garantir a integridade do serviço.
            </p>
        </article>
    )
}

export default SecurityDocs
