import { NavLink, Outlet } from "react-router-dom"

const Api = () => {
  return (
    <section className='docs-content'>
            <div className='docs-aside-left'>
                <nav>
                    <ul>
                        <li><NavLink to='welcome'>Graham API</NavLink></li>
                        <li><NavLink to='welcome'>Referências</NavLink></li>
                        <li><NavLink to='welcome'>API Key</NavLink></li>
                        <li><NavLink to='welcome'>Settings API</NavLink></li>
                    </ul>
                </nav>
            </div>

            <section className='docs-feed'>
                <Outlet />
            </section>

            <div className='docs-aside-right'>
                <h1>Ads</h1>
            </div>
        </section>
  )
}

export default Api
