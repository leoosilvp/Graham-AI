import { Link } from 'react-router-dom';
import '../css/notification.css';
import useNotification from '../hooks/useNotification';
import icon from "../assets/img/icon-light.svg"

const Notification = () => {
  const { notifications, loading, error } = useNotification();

  if (loading) {
    return <main className="notification-loading"><img src={icon}/></main>;
  }

  if (error) {
    return <main className="notification-error">{error}</main>;
  }

  return (
    <main className='ctn-notification-page'>
      <Link
        to='/chat'
        className='close-notification-btn'
        title='Fechar'
        aria-label='Fechar notificações'
      >
        <i className='fa-solid fa-xmark' />
      </Link>

      <section className='notification-page'>
        <section className='notification-header'>
          <h1>Notificações</h1>
        </section>

        <section className='notification-feed'>
          {notifications.map(item => (
            <article className='ctn-notification' key={item.id}>
              <section className='notification-date'>
                <h1>{item.type}</h1>
                <h2>{item.date}</h2>
              </section>

              <section className='notification'>
                {item.videoUrl && (
                  <video src={item.videoUrl} controls />
                )}

                {item.imgUrl && (
                  <img src={item.imgUrl} alt={item.title} />
                )}

                <section className='notification-content'>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                </section>
              </section>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default Notification;
