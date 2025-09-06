import Aside from './components/Aside'
import Chat from './components/Chat'
import Footer from './components/Footer'
import Header from './components/Header'
import ChangeIcon from './hooks/ChangeIcon'
import './css/style.css'

function App() {

  ChangeIcon();

  return (
    <>
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
