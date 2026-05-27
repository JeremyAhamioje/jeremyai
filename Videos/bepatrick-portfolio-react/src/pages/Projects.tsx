import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, Sun, Moon } from 'lucide-react'
import Cursor      from '@/components/ui/Cursor'
import StoryPanel  from '@/components/sections/StoryPanel'
import { ALL_PROJECTS, LOGO_URL, SITE_NAME } from '@/lib/constants'
import { usePageTransition } from '@/hooks/usePageTransition'
import { useTheme } from '@/contexts/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGE =
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778932428/download_17_q9yz8t.jpg'

export default function ProjectsPage() {
  const { overlayRef, go } = usePageTransition()
  const { isDark, toggle } = useTheme()
  const progressRef = useRef<HTMLDivElement>(null)
  const heroRef     = useRef<HTMLElement>(null)
  const heroBgRef   = useRef<HTMLDivElement>(null)

  /* Progress bar */
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (progressRef.current) progressRef.current.style.width = (pct * 100) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Hero parallax + entrance — single context for clean cleanup */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const ctx = gsap.context(() => {
      if (heroBgRef.current) {
        gsap.fromTo(
          heroBgRef.current,
          { y: '0%' },
          {
            y: '-12%',
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        )
      }

      gsap.fromTo(
        '.hero-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      )
    }, hero)

    return () => ctx.revert()
  }, [])

  /* Body fade-in (separate small effect; no ScrollTriggers to clean) */
  useEffect(() => {
    gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.45 })
  }, [])

  const textPrimary = isDark ? '#f5f0e8' : '#1a1208'
  const textMuted   = isDark ? 'rgba(245,240,232,0.55)' : 'rgba(26,18,8,0.55)'
  const textFaint   = isDark ? 'rgba(245,240,232,0.28)' : 'rgba(26,18,8,0.35)'
  const navBg       = isDark ? 'rgba(8,8,8,0.88)'       : 'rgba(240,236,227,0.92)'
  const navBdr      = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(26,18,8,0.08)'

  return (
    <>
      <Cursor />
      <div ref={overlayRef} className="page-overlay" />

      {/* Progress bar */}
      <div
        ref={progressRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          height: 2,
          background: 'var(--volt)',
          zIndex: 9999,
          width: '0%',
          transition: 'width .1s',
        }}
      />

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
          onClick={() => go('/')}
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
            ALL PROJECTS
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '.1em',
              color: textFaint,
            }}
          >
            {ALL_PROJECTS.length.toString().padStart(2, '0')} works
          </span>
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme" style={{ color: textPrimary }}>
            {isDark ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* ── Hero panel ── */}
      <section
        ref={heroRef}
        className="story-panel"
        style={{ height: '100vh', justifyContent: 'center' }}
      >
        <div
          ref={heroBgRef}
          className="panel-bg"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
          }}
        />
        <div className="panel-overlay" />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            padding: '0 clamp(1.25rem,2rem,2rem)',
          }}
        >
          <p
            className="hero-reveal"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '.2em',
              color: textFaint,
              textTransform: 'uppercase',
              opacity: 0,
            }}
          >
            {SITE_NAME} — selected works
          </p>
          <h1
            className="hero-reveal"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem,13vw,11rem)',
              lineHeight: 0.9,
              textAlign: 'center',
              color: textPrimary,
              opacity: 0,
            }}
          >
            ALL<br />PROJECTS
          </h1>
          <p
            className="hero-reveal"
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: textMuted,
              maxWidth: 460,
              textAlign: 'center',
              opacity: 0,
            }}
          >
            A collection of work at the intersection of design, code, and culture. Scroll to explore each one.
          </p>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            opacity: 0.45,
          }}
        >
          <div
            style={{
              width: 1,
              height: 56,
              background: `linear-gradient(to bottom,${textMuted},transparent)`,
              animation: 'scpulse 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '.2em',
              color: textFaint,
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ── Project panels ── */}
      {ALL_PROJECTS.map(panel => (
        <StoryPanel key={panel.num} panel={panel} />
      ))}

      {/* ── Closing CTA ── */}
      <section
        className="story-panel cta-slide"
        style={{ minHeight: '75vh', justifyContent: 'center', alignItems: 'center' }}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 22,
            textAlign: 'center',
            padding: '0 clamp(1.25rem,2rem,2rem)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '.2em',
              color: 'var(--cta-muted)',
              textTransform: 'uppercase',
            }}
          >
            End of Works
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem,5vw,3.8rem)',
              color: 'var(--cta-text)',
              opacity: 0.7,
            }}
          >
            Let's build something together.
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--cta-muted)',
              maxWidth: 400,
            }}
          >
            Have a project in mind? Available and ready to bring your vision to life.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: 8,
            }}
          >
            <a
              href="/#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 36px',
                background: 'var(--volt)',
                color: '#080808',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '.08em',
                borderRadius: 100,
                textDecoration: 'none',
                transition: 'transform .22s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Get In Touch <ArrowRight size={14} strokeWidth={2} />
            </a>
            <button
              onClick={() => go('/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 30px',
                border: '1px solid var(--cta-btn-bdr)',
                color: 'var(--cta-btn-text)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '.08em',
                borderRadius: 100,
                background: 'var(--cta-btn-bg)',
                cursor: 'pointer',
                transition: 'all .22s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--cta-text)'
                e.currentTarget.style.color = 'var(--cta-text)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--cta-btn-bdr)'
                e.currentTarget.style.color = 'var(--cta-btn-text)'
              }}
            >
              <ArrowLeft size={13} strokeWidth={1.5} /> Back Home
            </button>
          </div>
        </div>
      </section>

      {/*
        Keyframes only. The dangerous global selector
        `.story-panel > div:last-child { … }` has been removed.
        Mobile responsive rules for the panel content now live in index.css
        scoped to the `.panel-content-inner` class on the StoryPanel grid.
      */}
      <style>{`
        @keyframes scpulse { 0%,100%{opacity:1} 50%{opacity:.18} }
      `}</style>
    </>
  )
}
