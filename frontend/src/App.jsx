import Aside from './components/Aside'
import Chat from './components/Chat'
import Footer from './components/Footer'
import Header from './components/Header'
import './css/style.css'

function App() {

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
