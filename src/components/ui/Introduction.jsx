import { NavLink } from "react-router-dom"

const Introduction = () => {
    return (
        <section className='docs-content'>
            <div className='docs-aside-left'>
                <nav>
                    <ul>
                        <li><NavLink className='active' to='welcome'>Bem-Vindo/a</NavLink></li>
                    </ul>
                </nav>
            </div>

            <section className='docs-feed'>
                <h1>oi</h1>
            </section>

            <div className='docs-aside-right'>
                <h1>aki</h1>
            </div>
        </section>
    )
}

export default Introduction
