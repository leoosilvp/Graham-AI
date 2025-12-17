import { Link } from 'react-router-dom'
import '../css/notification.css'

const Notification = () => {
  return (
    <main className='ctn-notification-page'>
      <Link to='/chat' className='close-notification-btn' title='Fechar'><i className='fa-solid fa-xmark' /></Link>

      <section className='notification-page'>
        <section className='notification-header'>
          <h1>Notificações</h1>

        </section>
      </section>

    </main>
  )
}

export default Notification
