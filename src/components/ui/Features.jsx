import { NavLink } from "react-router-dom"
import Faq from "../Faq"

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
                <Faq />
            </div>
        </section>
    )
}

export default Features
