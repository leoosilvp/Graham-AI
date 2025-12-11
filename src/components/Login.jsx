import { useState, useEffect } from 'react';
import '../css/login.css';
import logo from '../assets/img/icon-light.svg';

function Login() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('grahamUser');
    if (storedUser) setIsLogged(true);
  }, []);

  const handleLogin = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.github.com/users/${username.trim()}`);
      if (!response.ok) throw new Error('Usuário não encontrado');

      const data = await response.json();
      const userData = {
        name: data.name || '',
        login: data.login,
        avatar: data.avatar_url,
      };

      localStorage.setItem('firstLogin', true)
      localStorage.setItem('grahamUser', JSON.stringify(userData));
      setIsLogged(true);

      window.location.reload();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLogged) return null;

  return (
    <section className='ctn-login'>
      <article className='login'>
        <h1>
          <img src={logo} alt="Graham AI" />Graham AI <span>|</span> <i className='fa-brands fa-github'></i> GitHub
        </h1>
        <h2>Faça um login temporário no Graham usando seu nome de usuário do GitHub.</h2>
        <h3>Suas conversas serão salvas temporariamente enquanto você estiver logado. Elas não serão transferidas para outro dispositivo ou navegador.</h3>

        <section className='ctn-input-login'>
          <label htmlFor="input-login">Username:</label>
          <input
            id='input-login'
            type="text"
            placeholder='seu @usuario..'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            disabled={loading}
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>

          {error && <p style={{ color: 'red', position: 'absolute' }}>{error}</p>}

          <p>O Graham AI não possui afiliação ou vínculo oficial com o GitHub.</p>
        </section>
      </article>
    </section>
  );
}

export default Login;
