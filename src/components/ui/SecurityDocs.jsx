const Security = () => {
    return (
        <article>
            <h1>Segurança e Privacidade</h1>
            <p>
                A <span>Segurança e Privacidade</span> são a base da confiança que o Graham AI estabelece com seus usuários. Adotamos uma postura de <span>Governança de Dados Proativa</span>, implementando as melhores práticas de segurança de nível empresarial para proteger suas informações e interações.
            </p>
            <h3>Criptografia e Proteção de Dados em Camadas</h3>
            <div>
                O Graham AI emprega um modelo de segurança "Zero Trust" com proteção em todas as fases do ciclo de vida dos dados:
                <ul>
                    <li><span>Criptografia em Trânsito (TLS 1.3):</span> Todas as comunicações são protegidas por protocolos de criptografia de ponta a ponta, garantindo que a transmissão de dados entre o usuário e os servidores seja impenetrável.</li>
                    <li><span>Criptografia em Repouso (AES-256):</span> Os dados armazenados, incluindo o histórico de conversas e a Memória de Longo Prazo, são criptografados usando o padrão AES-256, o que impede o acesso não autorizado mesmo em caso de violação física.</li>
                    <li><span>Anonimização e Pseudonimização:</span> Técnicas avançadas são aplicadas para processar dados sensíveis, removendo ou substituindo identificadores pessoais, aumentando a camada de privacidade.</li>
                </ul>
            </div>

            <div className="line-icon">
                <hr />
                <i className='fa-solid fa-lock icon'></i>
                <hr />
            </div>

            <h3>Política de Uso de Dados: "Seus Dados, Seu Controle"</h3>
            <div>
                Nossa política é transparente e centrada no usuário:
                <ol>
                    <li><span>Confidencialidade Absoluta:</span> Suas conversas e dados de entrada <span>não são utilizados</span> para treinar ou aprimorar os modelos de IA subjacentes. O Graham AI respeita a confidencialidade das suas informações proprietárias.</li>
                    <li><span>Conformidade Regulatória Global:</span> O Graham AI está em total conformidade com as principais regulamentações de proteção de dados, incluindo a <span>LGPD (Lei Geral de Proteção de Dados)</span> e o <span>GDPR (General Data Protection Regulation)</span>, garantindo o direito de acesso, retificação e exclusão de dados.</li>
                    <li><span>Controle de Acesso e Autenticação:</span> Utilizamos mecanismos robustos de autenticação (OAuth 2.0) e autorização para garantir que apenas o usuário autenticado tenha acesso ao seu histórico e configurações.</li>
                </ol>
            </div>
            <h3>Auditorias e Resiliência</h3>
            <p>
                A plataforma é submetida a <span>auditorias de segurança</span> regulares e utiliza práticas de desenvolvimento seguro (DevSecOps) para garantir a integridade e a resiliência do serviço contra ameaças cibernéticas.
            </p>
        </article>
    )
}

export default Security
