import { useState } from 'react';
import '../css/conf-profile.css';
import ConfirmDelete from './ConfirmDelete';

function ConfProfile() {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setOpenLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleNavigate = (url) => {
    window.location.href = url;
  };

  return (
    <section className='ctn-conf-profile'>
      <article className='conf-profile'>
        <button
          className='active'
          onClick={() => handleNavigate('https://graham-ai-page.vercel.app/#plans')}
        >
          <i className='fa-regular fa-chess-queen'></i> Atualizar
        </button>

        <hr />

        <button
          onClick={() => handleNavigate('/settings/general')}
        >
          <i className='fa-regular fa-life-ring'></i> Configurações
        </button>

        <button
          onClick={handleLogoutClick}
        >
          <i className='fa-regular fa-trash-can'></i> Log-out
        </button>
      </article>
      
      {openLogoutModal && (
        <ConfirmDelete
          cActive="active"
          h1="Log-out"
          h2="Isto irá apagar todas as suas conversas e preferências"
          h3="Esta ação não tem volta! Você concorda em apagar TODOS os conteúdos guardados durante esta sessão?"
          button1="Cancelar"
          onClick1={handleCancelLogout}
          button2="Sair"
          onClick2={handleConfirmLogout}
        />
      )}
    </section>
  );
}

export default ConfProfile;
