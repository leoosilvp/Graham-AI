import '../css/login.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import { login, register } from '../services/auth'
import logo from '../assets/svg/logo.svg'
import icon from '../assets/svg/icon-light.svg'
import { Lock, Mail, Unlock, User } from '@geist-ui/icons'
import imgLoading from '../assets/img/loading.gif'

const Login = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const view = searchParams.get('view')
    const isRegister = view === 'register'

    const { user } = useUser()

    const [showPassword, setShowPassword] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (user) navigate('/new', { replace: true })
    }, [user, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setLoading(true)

        try {
            if (isRegister) {
                await register(form.name, form.email, form.password)
                window.location.href = '/new'
                navigator.vibrate?.(25)
                return
            }

            await login(form.email, form.password)
            window.location.href = '/new'
        } catch (err) {
            navigator.vibrate?.([120, 60, 120])
            setError(err.message)
            clearTimeout(window.__errorTimer)
            window.__errorTimer = setTimeout(() => {
                setError('')
            }, 4000)
        } finally {
            setLoading(false)
            localStorage.setItem('aside_open', 'true')
        }
    }

    return (
        <main className='login-main'>
            <header className='login-header'>
                <img src={logo} alt="Graham" draggable={false} />
            </header>

            <section className='login-wrapper'>
                <img src={icon} alt="Graham Icon" draggable={false} />
                <h1>{isRegister ? 'Crie sua conta' : 'Faça login na sua conta'}</h1>
                <h2>{isRegister ? 'Comece a criar com a Graham.' : 'Continue criando com o Graham.'}</h2>


                <form name='form-login' onSubmit={handleSubmit} noValidate>

                    <Link to='https://api.graham.vu/api/auth/google' className='login-google'><img src="https://static.vecteezy.com/system/resources/thumbnails/022/484/503/small_2x/google-lens-icon-logo-symbol-free-png.png" />{isRegister ? 'Registrar com Google' : 'Entrar com Google'}<span /></Link>

                    <div className='login-divider'><hr />ou<hr /></div>

                    {isRegister && (
                        <article className='login-input'>
                            <User size={16} />

                            <input
                                type="text"
                                name="name"
                                placeholder='nome'
                                value={form.name}
                                onChange={handleChange}
                                autoComplete='name'
                                required
                                disabled={loading}
                            />
                        </article>
                    )}

                    <article className='login-input'>
                        <Mail size={16} />

                        <input
                            type="email"
                            name="email"
                            placeholder='e-mail'
                            value={form.email}
                            onChange={handleChange}
                            autoComplete='email'
                            required
                            disabled={loading}
                        />
                    </article>

                    <article className='login-input'>
                        <button
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                            {showPassword ? <Unlock size={16} /> : <Lock size={16} />}
                        </button>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder='senha'
                            value={form.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </article>

                    {error && <p className='login-error'>{error}</p>}

                    <button type='submit' className={`btn-confirm ${loading && 'btn-confirm-loading'}`} disabled={loading}>
                        {loading ? <img src={imgLoading} /> : isRegister ? 'Criar conta' : 'Continuar'}
                    </button>
                </form>

                <p className='login-register'>
                    {isRegister ? (
                        <>Já possui uma conta? <Link to='?view=login'>Entrar</Link></>
                    ) : (
                        <>Não tem uma conta ainda? <Link to='?view=register'>Registrar</Link></>
                    )}
                </p>
            </section>

            <footer className='login-footer'>
                <Link to='/terms'>Termos de Serviço</Link>
                <Link to='/privacy'>Política de Privacidade</Link>
                &copy; 2026 Pleroma
            </footer>
        </main>
    )
}

export default Login