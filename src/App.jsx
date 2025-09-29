import Aside from './components/Aside'
import Chat from './components/Chat'
import Footer from './components/Footer'
import Header from './components/Header'
import ChangeIcon from './hooks/ChangeIcon'
import './css/style.css'
import Login from './components/Login'

function App() {

  ChangeIcon();

  return (
    <>
      <Login />
      <Header />
      <div className="content">
        <Aside />
        <Chat />
      </div>
      <Footer />
    </>
  )
}

export default App