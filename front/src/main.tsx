import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/sass/index.sass'
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
