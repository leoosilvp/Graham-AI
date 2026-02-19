import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.svg'
import icon from '../assets/img/icon-light.svg'
import { Eye, Mail, User } from '@geist-ui/icons'
import '../css/login.css'

const Login = () => {

    const error = null

    const [mode, setMode] = useState("login")
    const [showPass, setShowPass] = useState(false)


    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");

    useEffect(() => {
        if (view === "register") {
            setMode(view === "register" ? "register" : "login");
        }
    }, [view]);


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
                    <section className='login-mode'>
                        <div className='login-input'>
                            <User size={18} />
                            <input type="text" placeholder='Username' />
                        </div>
                        <div className='login-input'>
                            <Eye cursor={"pointer"} size={18} onClick={() => setShowPass(prev => !prev)} />
                            <input type={showPass ? 'text' : 'password'} placeholder='Password' />
                        </div>
                    </section>

                    :

                    <section className='login-mode' >
                        <div className='login-input'>
                            <User size={18} />
                            <input type="text" placeholder='Username' />
                        </div>
                        <div className='login-input'>
                            <Mail size={18} />
                            <input type="email" placeholder='E-mail' />
                        </div>
                        <div className='login-input'>
                            <Eye cursor={"pointer"} size={18} onClick={() => setShowPass(prev => !prev)} />
                            <input type={showPass ? 'text' : 'password'} placeholder='Password' />
                        </div>
                    </section>
                }

                <div className='line-login-page'>
                    <hr /> or <hr />
                </div>

                {mode === 'login' ?
                    <Link onClick={() => setMode('register')} className='login-register-btn'>Don't have an account yet? <span>Register</span></Link>
                    :
                    <Link onClick={() => setMode('login')} className='login-register-btn'>Do you already have an account? <span>Login</span></Link>
                }

                <button className='active'>
                    Continuar
                </button>

                {error && (
                    <p style={{ color: '#d63c3c', marginTop: '370px', position: 'absolute', fontSize: '0.85rem', fontWeight: '200', }}>{error}</p>
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
