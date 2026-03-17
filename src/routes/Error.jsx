import { Link } from 'react-router-dom'
import img from '../assets/img/error.svg'
import logo from '../assets/img/logo.svg'
import '../css/error.css'

const Error = () => {
  return (
    <main className="error-page">
      <header>
        <a href="/">
          <img src={logo} alt="logo-snakr" />
        </a>

        <Link to='/docs'><i className='fa-solid fa-book-open'></i></Link>
      </header>

      <section className='error-page-content'>
        <h1>Oops!...</h1>
        <img src={img} />
        <h1>Page not found</h1>
        <p>You weren't supposed to be here — it happens.<br />If you need help, contact us.</p>
      </section>

      <section className='error-page-btns'>
        <Link to='/'>Home</Link>
        <Link to='/docs'>Contact us</Link>
      </section>
    </main>
  )
}

export default Error
