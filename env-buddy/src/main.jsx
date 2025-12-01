  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import { BrowserRouter } from 'react-router-dom'
  import { ColorModeProvider } from './theme.jsx'
  import './index.css'
  import App from './App'

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ColorModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ColorModeProvider>
    </StrictMode>,
  )


