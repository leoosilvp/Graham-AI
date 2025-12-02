import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ChangeIcon from './hooks/ChangeIcon'
import './css/style.css'
import Settings from './components/Settings'
import Home from './routes/Home'
import Appearance from './components/ui/Appearance'

function App() {

  ChangeIcon();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />

        <Route path="/chat" element={<Home />}>
          <Route path="settings" element={<Settings />}>
            <Route path="appearance" element={<Appearance />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App