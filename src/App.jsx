import { MathJaxContext } from "better-react-mathjax";
import Aside from './components/Aside'
import Chat from './components/Chat'
import Footer from './components/Footer'
import Header from './components/Header'
import ChangeIcon from './hooks/ChangeIcon'
import './css/style.css'
import Login from './components/Login'

function App() {
  ChangeIcon();

  const mathJaxConfig = {
    tex: {
      inlineMath: [["$", "$"], ["\\(", "\\)"]],
      displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    },
  };

  return (
    <MathJaxContext config={mathJaxConfig}>
      <Login />
      <Header />
      <div className="content">
        <Aside />
        <Chat />
      </div>
      <Footer />
    </MathJaxContext>
  )
}

export default App
