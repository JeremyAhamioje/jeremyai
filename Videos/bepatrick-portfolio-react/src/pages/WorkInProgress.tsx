import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import gsap from 'gsap'
import Cursor from '@/components/ui/Cursor'
import { usePageTransition } from '@/hooks/usePageTransition'
import { useTheme } from '@/contexts/ThemeContext'
import { LOGO_URL, SITE_NAME } from '@/lib/constants'

export default function WorkInProgress() {
  const { overlayRef, go } = usePageTransition()
  const { isDark } = useTheme()

  const textPrimary = isDark ? '#f5f0e8' : '#1a1208'
  const textMuted   = isDark ? 'rgba(245,240,232,0.55)' : 'rgba(26,18,8,0.55)'
  const textFaint   = isDark ? 'rgba(245,240,232,0.28)' : 'rgba(26,18,8,0.35)'
  const navBg       = isDark ? 'rgba(8,8,8,0.88)'       : 'rgba(240,236,227,0.92)'
  const navBdr      = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(26,18,8,0.08)'
  const pageBg      = isDark ? '#080808' : '#f0ece3'

  useEffect(() => {
    gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.45 })
    gsap.fromTo(
      '.wip-reveal',
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
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.25rem,2rem,2rem)',
          zIndex: 1000,
          background: navBg,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${navBdr}`,
        }}
      >
        <button
          onClick={() => go('/projects')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '.1em',
            color: textMuted,
            cursor: 'pointer',
            transition: 'color .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--volt)')}
          onMouseLeave={e => (e.currentTarget.style.color = textMuted)}
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src={LOGO_URL}
            alt={SITE_NAME}
            style={{ width: 22, height: 22, objectFit: 'contain', borderRadius: '50%' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '.1em',
              color: textFaint,
            }}
          >
            CASE STUDY
          </span>
        </div>

        <div style={{ width: 60 }} />
      </nav>

      {/* Main content */}
      <main
        style={{
          minHeight: '100vh',
          background: pageBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,4vw,4rem)',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <p
          className="wip-reveal"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '.2em',
            color: 'var(--volt)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            opacity: 0,
          }}
        >
          14 — UI/UX Design / Figma
        </p>

        {/* Heading */}
        <h1
          className="wip-reveal"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem,12vw,9rem)',
            lineHeight: 0.92,
            color: textPrimary,
            marginBottom: '2.5rem',
            opacity: 0,
          }}
        >
          FOOD<br />DELIVERY<br />APP
        </h1>

        {/* Divider */}
        <div
          className="wip-reveal"
          style={{
            width: 1,
            height: 60,
            background: `linear-gradient(to bottom, var(--volt), transparent)`,
            margin: '0 auto 2.5rem',
            opacity: 0,
          }}
        />

        {/* Status badge */}
        <div
          className="wip-reveal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 24px',
            border: '1px solid var(--volt)',
            borderRadius: 100,
            marginBottom: '2rem',
            opacity: 0,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--volt)',
              animation: 'wip-blink 1.4s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '.14em',
              color: 'var(--volt)',
              textTransform: 'uppercase',
            }}
          >
            Work In Progress
          </span>
        </div>

        {/* Description */}
        <p
          className="wip-reveal"
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: textMuted,
            maxWidth: 480,
            opacity: 0,
          }}
        >
          Figma food delivery app concept showcasing UI/UX design — user flows,
          components and high-fidelity prototypes. Case study coming soon.
        </p>

        {/* Tags */}
        <div
          className="wip-reveal"
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '2rem',
            opacity: 0,
          }}
        >
          {['Figma', 'UI/UX', 'Prototyping'].map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '.1em',
                padding: '4px 12px',
                border: '1px solid var(--border-mid)',
                borderRadius: 100,
                color: textMuted,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes wip-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
      `}</style>
    </>
  )
}
