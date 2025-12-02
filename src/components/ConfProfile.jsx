import '../css/conf-profile.css';

function ConfProfile() {

  const handleLogout = () => {
    localStorage.removeItem("grahamUser");
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
          onClick={handleLogout}
        >
          <i className='fa-regular fa-trash-can'></i> Log-out
        </button>
      </article>
    </section>
  );
}

export default ConfProfile;
