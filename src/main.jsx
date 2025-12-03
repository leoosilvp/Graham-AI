import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import { injectSpeedInsights } from "@vercel/speed-insights";
import App from './App.jsx'

// if (import.meta.env.PROD) {
//   injectSpeedInsights()
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
