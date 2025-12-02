import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ChangeIcon from './hooks/ChangeIcon'
import './css/style.css'
import Settings from './routes/Settings'
import Home from './routes/Home'
import Appearance from './components/ui/Appearance'
import General from './components/ui/General'
import ChangeTitle from './hooks/ChangeTitle'
import Notifications from './components/ui/Notifications'

function App() {
  
  ChangeIcon();

  return (
    <BrowserRouter>
      <ChangeTitle />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="settings" element={<Settings />}>
            <Route path="general" element={<General />}/>
            <Route path="notifications" element={<Notifications />}/>
            <Route path="customization" element={<Appearance />}/>
            <Route path="accessibility" element={<Appearance />}/>
            <Route path="terms and privacy" element={<Appearance />}/>
            <Route path="security" element={<Appearance />}/>
            <Route path="support" element={<Appearance />}/>
            <Route path="account" element={<Appearance />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App