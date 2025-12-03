import '../css/login.css'
import logo from '../assets/img/logo.svg'
import icon from '../assets/img/icon-light.svg'

const Login = () => {
    return (
        <section className="login-page">
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
                    <hr />
                    ou
                    <hr />
                </div>
                <input type="email" placeholder='Digite seu e-mail' />
                <button className='active'>Continuar</button>
            </section>
            <section className='login-page-footer'>
                <p>Ao continuar, você concorda com nossos <a href="">Termos de Serviço</a> e nossa <a href="">Política de Privacidade</a>.</p>
            </section>
        </section>
    )
}

export default Login
