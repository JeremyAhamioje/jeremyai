import { useEffect } from 'react'
import { ArrowLeft, Github } from 'lucide-react'
import gsap from 'gsap'
import Cursor from '@/components/ui/Cursor'
import { usePageTransition } from '@/hooks/usePageTransition'
import { useTheme } from '@/contexts/ThemeContext'
import { LOGO_URL, SITE_NAME } from '@/lib/constants'

const WHATSAPP_QR =
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1779884677/WhatsApp_Image_2026-05-27_at_13.23.23_pcmuvz.jpg'

export default function Connect() {
  const { overlayRef, go } = usePageTransition()
  const { isDark } = useTheme()

  const textPrimary = isDark ? '#f5f0e8' : '#1a1208'
  const textMuted   = isDark ? 'rgba(245,240,232,0.55)' : 'rgba(26,18,8,0.55)'
  const textFaint   = isDark ? 'rgba(245,240,232,0.28)' : 'rgba(26,18,8,0.35)'
  const navBg       = isDark ? 'rgba(8,8,8,0.88)'       : 'rgba(240,236,227,0.92)'
  const navBdr      = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(26,18,8,0.08)'
  const pageBg      = isDark ? '#080808' : '#f0ece3'
  const borderMid   = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(26,18,8,0.12)'

  useEffect(() => {
    gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.45 })
    gsap.fromTo(
      '.connect-reveal',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.25 }
    )
  }, [])

  return (
    <>
      <Cursor />
      <div ref={overlayRef} className="page-overlay" />

      {/* Navbar */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(1.25rem,2rem,2rem)',
          zIndex: 1000,
          background: navBg,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${navBdr}`,
        }}
      >
        <button
          onClick={() => go('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none',
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em',
            color: textMuted, cursor: 'pointer', transition: 'color .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--volt)')}
          onMouseLeave={e => (e.currentTarget.style.color = textMuted)}
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={LOGO_URL} alt={SITE_NAME}
            style={{ width: 22, height: 22, objectFit: 'contain', borderRadius: '50%' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: textFaint }}>
            CONNECT
          </span>
        </div>

        <div style={{ width: 60 }} />
      </nav>

      {/* Main content */}
      <main
        style={{
          minHeight: '100vh', background: pageBg,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,4vw,4rem)',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <p
          className="connect-reveal"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '.2em', color: 'var(--volt)',
            textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0,
          }}
        >
          Reach Out
        </p>

        {/* Heading */}
        <h1
          className="connect-reveal"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem,10vw,7rem)',
            lineHeight: 0.92, color: textPrimary,
            marginBottom: '2.5rem', opacity: 0,
          }}
        >
          LET'S<br />CONNECT
        </h1>

        {/* Divider */}
        <div
          className="connect-reveal"
          style={{
            width: 1, height: 60,
            background: 'linear-gradient(to bottom, var(--volt), transparent)',
            margin: '0 auto 2.5rem', opacity: 0,
          }}
        />

        {/* WhatsApp QR */}
        <div
          className="connect-reveal"
          style={{ marginBottom: '2rem', opacity: 0 }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em',
            color: textFaint, textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            Scan to chat on WhatsApp
          </p>
          <div style={{
            display: 'inline-block',
            padding: 16,
            background: '#fff',
            borderRadius: 12,
          }}>
            <img
              src={WHATSAPP_QR}
              alt="WhatsApp QR Code"
              style={{ width: 180, height: 180, display: 'block', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* GitHub button */}
        <a
          className="connect-reveal"
          href="https://github.com/JeremyAhamioje"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '12px 28px',
            border: `1px solid ${borderMid}`,
            borderRadius: 100,
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.08em',
            color: textMuted, textDecoration: 'none',
            transition: 'border-color .2s, color .2s',
            marginTop: '0.5rem', opacity: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--volt)'
            e.currentTarget.style.color = textPrimary
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = borderMid
            e.currentTarget.style.color = textMuted
          }}
        >
          <Github size={14} strokeWidth={1.5} />
          JeremyAhamioje
        </a>
      </main>

      <style>{`
        @keyframes connect-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
      `}</style>
    </>
  )
}
