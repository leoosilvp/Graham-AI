import { NavLink } from "react-router-dom"

const Features = () => {
    return (
        <section className='docs-content'>
            <div className='docs-aside-left'>
                <nav>
                    <ul>
                        <li><NavLink to='welcome'>Bem-Vind@</NavLink></li>
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

export default Features
