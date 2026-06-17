import '../css/error.css'
import logo from '../assets/svg/icon-light.svg'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <main className='error-main'>
            <img src={logo} />
            <h1>Página não encontrada</h1>
            <p>Toda equação tem um destino, mas este não foi encontrado.</p>
            <Link to='/new'>Voltar para a página inicial</Link>
        </main> 
    )
}

export default Error
