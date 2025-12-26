import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import logo from '../assets/img/logo.svg'
import icon from '../assets/img/icon-light.svg'

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const stored = localStorage.getItem('grahamUser')
        if (stored) {
            navigate('/')
        }
    }, [navigate])

    const handleLogin = async () => {
        if (!username.trim()) return

        setLoading(true)
        setError('')

        try {
            const response = await fetch(
                `https://api.github.com/users/${username.trim()}`
            )
            if (!response.ok) throw new Error('Usuário não encontrado')

            const data = await response.json()

            const userData = {
                login: data.login,
                avatar: data.avatar_url,
                name: data.name || ''
            }

            localStorage.setItem('grahamUser', JSON.stringify(userData))

            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="login-page">
            <section className='login-page-header'>
                <img src={logo} alt="logo Graham AI" />
            </section>

            <section className='login-content'>
                <img src={icon} alt="icon Graham AI" />
                <h1>Entrar ou cadastrar-se</h1>
                <h2>Comece a criar com Graham AI</h2>

                <button><i className='fa-brands fa-google' /> Continue com Google</button>
                <button><i className='fa-brands fa-github' /> Continue com GitHub</button>
                <button><i className='fa-brands fa-apple' /> Continue com Apple</button>

                <div className='line-login-page'>
                    <hr /> ou <hr />
                </div>

                <input
                    type="text"
                    placeholder='Digite seu username do GitHub'
                    value={username}
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                                .toLowerCase()
                                .replace(/@/g, '')
                        )
                    }
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    disabled={loading}
                />

                <button className='active' onClick={handleLogin} disabled={loading}>
                    {loading ? 'Carregando...' : 'Continuar'}
                </button>

                {error && (
                    <p style={{ color: '#d63c3c', marginTop: '370px', position: 'absolute', fontSize:'0.85rem' , fontWeight: '200', }}>{error}</p>
                )}
            </section>

            <section className='login-page-footer'>
                <p>
                    Ao continuar, você concorda com nossos <a href="">Termos de Serviço</a> 
                    e nossa <a href="">Política de Privacidade</a>.
                </p>
            </section>
        </main>
    )
}

export default Login
