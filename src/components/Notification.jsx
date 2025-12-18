import { Link } from 'react-router-dom'
import '../css/notification.css'
import video from '../assets/video/upd.mp4'
import foto from '../assets/img/GrahamAI.png'

const Notification = () => {
  return (
    <main className='ctn-notification-page'>
      <Link to='/chat' className='close-notification-btn' title='Fechar'><i className='fa-solid fa-xmark' /></Link>

      <section className='notification-page'>
        <section className='notification-header'>
          <h1>Notificações</h1>
        </section>

        <section className='notification-feed'>
          <article className='ctn-notification'>
            <section className='notification-date'>
              <h1>Atualização</h1>
              <h2>Nov 10, 2025</h2>
            </section>
            <section className='notification'>
              <video src={video} controls/>
              <section className='notification-content'>
                <h1>Apresentando o Graham 1.3</h1>
                <p>mais rápido, mais fluido e capaz de manter contexto real das conversas. Agora interpreta documentos e imagens com profundidade, extrai insights úteis e aprende continuamente com cada interação. Uma atualização de paradigma para criar experiências mais inteligentes, personalizadas e humanas.</p>
              </section>
            </section>
          </article>

          <article className='ctn-notification'>
            <section className='notification-date'>
              <h1>Mensagem</h1>
              <h2>Set 25, 2025</h2>
            </section>
            <section className='notification'>
              <section className='notification-content'>
                <h1>Você recebeu 500 créditos de boas vindas!</h1>
                <p>Aproveite seus créditos para explorar os recursos do Graham AI e começar a criar com inteligência e eficiência desde o primeiro acesso.</p>
              </section>
            </section>
          </article>

          <article className='ctn-notification'>
            <section className='notification-date'>
              <h1>Atualização</h1>
              <h2>Set 25, 2025</h2>
            </section>
            <section className='notification'>
              <img src={foto}/>
              <section className='notification-content'>
                <h1>Bem-Vindo Graham AI</h1>
                <p>Sua mais nova plataforma de IA projetada para oferecer respostas precisas, suporte inteligente e eficiência, transformando tecnologia avançada em soluções práticas e confiáveis.</p>
              </section>
            </section>
          </article>


        </section>
      </section>

    </main>
  )
}

export default Notification
