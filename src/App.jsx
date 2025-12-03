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

function App() {
  
  ChangeIcon();

  return (
    <BrowserRouter>
      <ChangeTitle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="settings" element={<Settings />}>
            <Route path="general" element={<General />}/>
            <Route path="notifications" element={<Notifications />}/>
            <Route path="customization" element={<Customization />}/>
            <Route path="terms and privacy" element={<TermsPrivacy />}/>
            <Route path="security" element={<Security />}/>
            <Route path="support" element={<Support />}/>
            <Route path="account" element={<Account />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App