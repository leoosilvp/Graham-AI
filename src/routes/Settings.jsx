import { Outlet } from 'react-router-dom'
import '../css/settings.css'
import SettingsAside from '../components/ui/SettingsAside'
import SettingsHeader from '../components/ui/SettingsHeader'

const Settings = () => {

  return (
    <main className='ctn-settings'>
      <article className='settings'>
        <SettingsHeader />
        <div className='ctn-content-settings'>
          <section>
            <SettingsAside />
          </section>
          <section className='content-settings'>
            <Outlet />
          </section>
        </div>
      </article>
    </main>
  )
}

export default Settings
