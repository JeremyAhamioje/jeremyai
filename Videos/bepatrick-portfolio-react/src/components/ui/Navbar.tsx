import { useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useNavbar } from '@/hooks/useNavbar'
import { useTheme } from '@/contexts/ThemeContext'
import { LOGO_URL, SITE_NAME, SITE_ROLE } from '@/lib/constants'

const NAV_LINKS = ['works', 'about', 'contact'] as const

export default function Navbar() {
  const hidden = useNavbar()
  const { isDark, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`navbar ${hidden ? 'navbar-hidden' : ''}`}>
        {/* Left: logo + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={LOGO_URL}
            alt={SITE_NAME}
            style={{ width: 128, height: 128, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }}
          />
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '.02em', color: 'var(--text)', display: 'block', lineHeight: 1.1 }}>
              {SITE_NAME}
            </span>
            <span className="hidden sm:block" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--text-muted)' }}>
              {SITE_ROLE}
            </span>
          </div>
        </div>

        {/* Right: desktop nav links + theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Desktop links — hidden on mobile via CSS */}
          <div className="navbar-links">
            {NAV_LINKS.map(s => (
              <a
                key={s}
                href={`#${s}`}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.06em', color: 'var(--nav-link)', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--volt)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--nav-link)')}
              >
                {s}
              </a>
            ))}
          </div>

          {/* Theme toggle — always visible */}
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark
              ? <Sun  size={15} strokeWidth={1.5} />
              : <Moon size={15} strokeWidth={1.5} />
            }
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="navbar-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none', border: 'none',
              color: 'var(--text)', cursor: 'pointer',
              padding: 4, lineHeight: 0,
            }}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="navbar-drawer"
        style={{
          position: 'fixed', top: 56, left: 0, right: 0,
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--nav-border)',
          zIndex: 999,
          display: 'flex', flexDirection: 'column',
          padding: open ? '1.5rem 1.25rem' : '0 1.25rem',
          maxHeight: open ? 300 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, padding 0.35s ease',
        }}
      >
        {NAV_LINKS.map(s => (
          <a
            key={s}
            href={`#${s}`}
            onClick={close}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '.1em',
              color: 'var(--nav-link)', textDecoration: 'none',
              padding: '0.85rem 0',
              borderBottom: '1px solid var(--nav-border)',
              transition: 'color .2s',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--volt)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--nav-link)')}
          >
            {s}
          </a>
        ))}
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 998,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}
    </>
  )
}
