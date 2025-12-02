import { Link } from "react-router-dom"

const HeaderSettings = () => {
  return (
    <section className="header-settings">
        <h1>Settings</h1>
        <Link to="/chat">Fechar <i className="fa-solid fa-xmark"></i></Link>
    </section>
  )
}

export default HeaderSettings
