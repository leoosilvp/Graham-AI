import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ChangeIcon from './hooks/ChangeIcon'
import './css/style.css'
import Settings from './routes/Settings'
import Home from './routes/Home'

import General from './components/ui/General'
import ChangeTitle from './hooks/ChangeTitle'
import Notifications from './components/ui/Notifications'
import Customization from './components/ui/Customization'
import TermsPrivacy from './components/ui/TermsPrivacy'
import Security from './components/ui/Security'
import Support from './components/ui/Support'
import Account from './components/ui/Account'
import Login from './routes/Login'
import Docs from './routes/Docs'
import Introduction from './components/ui/Introduction'
import Features from './components/ui/Features'
import Api from './components/ui/Api'
import GrahamApi from './components/ui/GrahamApi'
import References from './components/ui/References'
import ApiKey from './components/ui/ApiKey'
import SettingsApi from './components/ui/SettingsApi'
import Status from './routes/Status'
import Plans from './components/ui/Plans'

function App() {

  ChangeIcon();

  return (
    <BrowserRouter>
      <ChangeTitle />
      <Routes>
        <Route path="/status" element={<Status />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to='/chat' />} />
        <Route path="/chat" element={<Home />}>
          <Route path="settings" element={<Settings />}>
            <Route index element={<Navigate to='general' />} />
            <Route path="general" element={<General />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="customization" element={<Customization />} />
            <Route path="terms and privacy" element={<TermsPrivacy />} />
            <Route path="security" element={<Security />} />
            <Route path="support" element={<Support />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
        <Route path="/docs" element={<Docs />}>
          <Route index element={<Navigate to='introduction/welcome' />} />
          <Route path='introduction/welcome' element={<Introduction />} />
          <Route path='features' element={<Features />}>
            
          </Route>
          <Route path='plans' element={<Plans />} />
          <Route path='api' element={<Api />}>
            <Route index element={<Navigate to='Graham-api' />}/>
            <Route path='Graham-api' element={<GrahamApi />}/>
            <Route path='references' element={<References />}/>
            <Route path='api-key' element={<ApiKey />}/>
            <Route path='settings' element={<SettingsApi />}/>
          </Route>
          <Route path='enterprise' element={<Features />}>
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App