import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Pages are prerendered at build time. Reuse that HTML when it matches this URL,
// otherwise (query strings, unknown paths in dev) render from scratch.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const canHydrate = container.hasChildNodes() && container.dataset.path === path && !window.location.search

if (canHydrate) {
  hydrateRoot(container, app)
} else {
  container.innerHTML = ''
  createRoot(container).render(app)
}
document.documentElement.classList.add('hydrated')
