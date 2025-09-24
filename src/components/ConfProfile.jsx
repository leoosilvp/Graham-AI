import '../css/conf-profile.css'

function ConfProfile() {
    
    const handleLogout = () => {
        localStorage.removeItem("grahamUser");
        window.location.reload();
        setUser({
            avatar: "https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3407.jpg",
            name: "User",
            login: ""
        });
    };

  return (
    <section className='ctn-conf-profile'>
        <article className='conf-profile'>
            <button onClick={handleLogout}><i className='fa-regular fa-trash-can'></i>Quit</button>
            <button><i className='fa-regular fa-life-ring'></i>Settings</button>
        </article>
    </section>
  )
}

export default ConfProfile;
