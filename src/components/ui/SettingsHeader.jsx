import { Link } from "react-router-dom"

const SettingsHeader = () => {
  return (
    <section className="settings-header">
        <h1>Configurações</h1>
        <Link to="/">Fechar <i className="fa-solid fa-xmark"></i></Link>
    </section>
  )
}

export default SettingsHeader
