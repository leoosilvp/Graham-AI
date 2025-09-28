import Aside from './components/Aside'
import Chat from './components/Chat'
import Footer from './components/Footer'
import Header from './components/Header'
import ChangeIcon from './hooks/ChangeIcon'
import './css/style.css'
import Login from './components/Login'

// importa o provider do MathJax
import { MathJaxContext } from "better-react-mathjax";

function App() {
  ChangeIcon();

  // configuração dos delimitadores LaTeX
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
