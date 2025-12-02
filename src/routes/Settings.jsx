import { Outlet } from 'react-router-dom'
import '../css/settings.css'
import AsideSettings from '../components/ui/AsideSettings'
import HeaderSettings from '../components/ui/HeaderSettings'

const Settings = () => {
  return (
    <section className='ctn-settings'>
      <article className='settings'>
        <HeaderSettings />
        <div className='ctn-content-settings'>
          <section>
            <AsideSettings />
          </section>
          <section className='content-settings'>
            <Outlet />
          </section>
        </div>
      </article>
    </section>
  )
}

export default Settings
