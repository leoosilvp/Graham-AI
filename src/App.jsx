import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ConsoleBanner } from "./hooks/ConsoleBanner"
import ChangeIcon from './hooks/ChangeIcon'
import Login from "./routes/Login"
import Home from "./routes/Home"
import ProtectedRoute from "./routes/ProtectedRoute"
import New from "./components/home/New"
import Chat from "./components/home/Chat"
import Search from "./routes/Search"
import Error from "./routes/Error"
import ChangeTitle from "./hooks/ChangeTitle"
import Library from "./routes/Library"
import Settings from "./routes/Settings"
import General from "./components/settings/General"
import Account from "./components/settings/Account"
import Privacy from "./components/settings/Privacy"

const App = () => {

  ConsoleBanner()
  ChangeIcon();

  return (
    <BrowserRouter>
      <ChangeTitle />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/home" element={<Navigate to='/' />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} >
            <Route index element={<Navigate to='new' />} />
            <Route path="new" element={<New />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="search" element={<Search />} />
            <Route path="library" element={<Library />} />
            <Route path="settings" element={<Settings />} >
              <Route index element={<Navigate to='general' />} />
              <Route path="general" element={<General />} />
              <Route path="account" element={<Account />} />
              <Route path="privacy" element={<Privacy />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
