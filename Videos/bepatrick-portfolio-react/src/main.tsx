import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Home            from '@/pages/Home'
import Projects        from '@/pages/Projects'
import Services        from '@/pages/Services'
import WorkInProgress  from '@/pages/WorkInProgress'
import Connect         from '@/pages/Connect'

/**
 * StrictMode is intentionally NOT used here.
 * In dev it double-invokes every effect, which doubles GSAP instances
 * and breaks ScrollTrigger pinning. All effects in this codebase already
 * use gsap.context() for proper cleanup, so StrictMode adds no safety.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/wip"      element={<WorkInProgress />} />
        <Route path="/connect"  element={<Connect />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)
