const Performance = () => {
    return (
        <article>
            <h1>Performance e Escala</h1>
            <p>
                A <span>Performance e Escala</span> são características intrínsecas à arquitetura do Graham AI, projetada para atender desde o usuário individual até grandes corporações com demandas massivas. Nossa infraestrutura é construída sobre tecnologias de ponta, garantindo <span>baixa latência</span> e <span>alta disponibilidade</span> em todas as interações.
            </p>
            <h3>Escalabilidade Horizontal Ilimitada</h3>
            <p>
                Graham AI utiliza um modelo de <span>escalabilidade horizontal</span>, o que significa que a capacidade de processamento pode ser expandida dinamicamente para lidar com picos de demanda sem comprometer a velocidade ou a qualidade das respostas. Isso assegura que, independentemente do volume de requisições, a experiência do usuário permaneça consistentemente rápida e confiável.
            </p>
            <h3>Otimização de Processamento</h3>
            <p>
                Implementamos técnicas avançadas de <span>otimização de processamento</span> e cache inteligente para minimizar o tempo de resposta. Isso é crucial para tarefas que exigem cálculos complexos ou geração de conteúdo extenso, onde a eficiência do tempo de processamento se traduz diretamente em produtividade para o usuário.
            </p>
            <div>
                <h3>Métricas de Confiabilidade:</h3>
                <div className="docs-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Métrica</th>
                                <th>Padrão Graham</th>
                                <th>Benefício para o Usuário</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Latência Média</td>
                                <td>&lt; 500ms</td>
                                <td>Interações em tempo real, sem atrasos perceptíveis.</td>
                            </tr>
                            <tr>
                                <td>Disponibilidade (Uptime)</td>
                                <td>99.99%</td>
                                <td>Acesso garantido e ininterrupto ao assistente.</td>
                            </tr>
                            <tr>
                                <td>Capacidade de Processamento</td>
                                <td>Milhões de tokens/segundo</td>
                                <td>Suporte a grandes volumes de dados e usuários simultâneos.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </article>
    )
}

export default Performance
