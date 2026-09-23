import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { DemoModalProvider } from './context/DemoModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <DemoModalProvider>
          <App />
        </DemoModalProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
