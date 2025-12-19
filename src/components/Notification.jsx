import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../css/notification.css';
import useNotification from '../hooks/useNotification';
import icon from "../assets/img/icon-light.svg";

const Notification = () => {
  const { notifications, loading, error } = useNotification();
  const [filter, setFilter] = useState('Todas');

  if (loading) {
    return <main className="notification-loading"><img src={icon} /></main>;
  }

  if (error) {
    return <main className="notification-error">Erro ao buscar notificações!</main>;
  }

  const filteredNotifications = notifications.filter(item => {
    if (filter === 'Todas') return true;
    return item.type === filter;
  });

  return (
    <main className='ctn-notification-page'>
      <Link to='/chat' className='close-notification-btn' title='Fechar'>
        <i className='fa-solid fa-xmark' />
      </Link>

      <section className='notification-page'>
        <section className='notification-header'>
          <h1>Notificações</h1>
        </section>

        <section className='notification-type-change'>
          <button className={filter === 'Todas' ? 'active' : ''} onClick={() => setFilter('Todas')}>
            Todas
          </button>

          <button className={filter === 'Notificação' ? 'active' : ''} onClick={() => setFilter('Notificação')}>
            Notificação
          </button>

          <button className={filter === 'Mensagem' ? 'active' : ''} onClick={() => setFilter('Mensagem')}>
            Mensagem
          </button>
        </section>

        <section className='notification-feed'>
          {filteredNotifications.map(item => (
            <article className='ctn-notification' key={item.id}>
              <section className='notification-date'>
                <h1>{item.type}</h1>
                <h2>{item.data}</h2>
              </section>

              <section className='notification'>
                {item.videoUrl && <video src={item.videoUrl} controls />}

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
