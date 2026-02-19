import '../css/login.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, Mail, User } from '@geist-ui/icons'
import { useUser } from '../hooks/useUser.js'
import logo from '../assets/img/logo.svg'
import icon from '../assets/img/icon-light.svg'

const Login = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { user, refreshUser } = useUser()

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [mode, setMode] = useState("login")
    const [showPass, setShowPass] = useState(false)

    const params = new URLSearchParams(window.location.search)
    const view = params.get("view")

    useEffect(() => {
        if (view === "register") {
            setMode("register")
        }
    }, [view])

    useEffect(() => {
        if (user) {
            navigate('/chat')
        }
    }, [user, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (loading) return

        setError(null)
        setLoading(true)

        try {
            const endpoint =
                mode === 'login'
                    ? 'https://api-graham-ai.vercel.app/api/auth/login'
                    : 'https://api-graham-ai.vercel.app/api/auth/register'

            const payload =
                mode === 'login'
                    ? {
                        username: form.username,
                        password: form.password
                    }
                    : {
                        username: form.username,
                        email: form.email,
                        password: form.password
                    }

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong')
            }

            if (mode === 'register') {
                setMode('login')
                setForm({ username: '', email: '', password: '' })
                return
            }


            await refreshUser()
            navigate('/chat')

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
                <h1>Log in or register</h1>
                <h2>Start creating with Graham AI.</h2>

                {mode === "login" ?
                    <form className='login-mode' onSubmit={handleSubmit}>
                        <div className='login-input'>
                            <User size={18} />
                            <input
                                name="username"
                                type="text"
                                placeholder='Username'
                                value={form.username}
                                onChange={handleChange}
                                maxLength={17}
                                required
                            />
                        </div>

                        <div className='login-input'>
                            <Eye
                                cursor="pointer"
                                size={18}
                                onClick={() => setShowPass(prev => !prev)}
                            />
                            <input
                                name="password"
                                type={showPass ? 'text' : 'password'}
                                placeholder='Password'
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </form>
                    :
                    <form className='login-mode' onSubmit={handleSubmit}>
                        <div className='login-input'>
                            <User size={18} />
                            <input
                                name="username"
                                type="text"
                                placeholder='Username'
                                value={form.username}
                                onChange={handleChange}
                                maxLength={17}
                                required
                            />
                        </div>

                        <div className='login-input'>
                            <Mail size={18} />
                            <input
                                name="email"
                                type="email"
                                placeholder='E-mail'
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='login-input'>
                            <Eye
                                cursor="pointer"
                                size={18}
                                onClick={() => setShowPass(prev => !prev)}
                            />
                            <input
                                name="password"
                                type={showPass ? 'text' : 'password'}
                                placeholder='Password'
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </form>
                }

                <div className='line-login-page'>
                    <hr /> or <hr />
                </div>

                {mode === 'login' ?
                    <Link onClick={() => setMode('register')} className='login-register-btn'>
                        Don't have an account yet? <span>Register</span>
                    </Link>
                    :
                    <Link onClick={() => setMode('login')} className='login-register-btn'>
                        Do you already have an account? <span>Login</span>
                    </Link>
                }

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className='active'
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Continuar'}
                </button>

                {error && (
                    <p style={{
                        color: '#d63c3c',
                        marginTop: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '200',
                        textAlign: 'center'
                    }}>
                        {error}
                    </p>
                )}
            </section>

            <section className='login-page-footer'>
                <p>
                    By continuing, you agree to our <a href="">Terms of Services</a>
                    and our <a href="">Privacy Policy</a>.
                </p>
            </section>
        </main>
    )
}

export default Login
