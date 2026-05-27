import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, Sun, Moon, CheckCircle } from 'lucide-react'
import Cursor from '@/components/ui/Cursor'
import { SERVICES, LOGO_URL, SITE_NAME } from '@/lib/constants'
import { usePageTransition } from '@/hooks/usePageTransition'
import { useTheme } from '@/contexts/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGE =
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778933752/Programmer_Cat1_tee8ls.jpg'

const PROCESS = [
  {
    num: '01',
    phase: 'Discovery',
    desc: 'We align on goals, audience, scope and success metrics. A clear brief beats assumptions every time.',
    items: ['Kickoff call', 'Scope definition', 'Research & audit', 'Timeline + budget'],
  },
  {
    num: '02',
    phase: 'Design',
    desc: 'From wireframes to high-fidelity mockups. Iterative reviews ensure the vision stays sharp.',
    items: ['Wireframing', 'UI Design', 'Prototype', 'Design review'],
  },
  {
    num: '03',
    phase: 'Development',
    desc: 'Clean, maintainable code built on modern stacks. Every component reviewed and tested.',
    items: ['Component build', 'API integration', 'Responsive QA', 'Performance opt.'],
  },
  {
    num: '04',
    phase: 'Deployment',
    desc: 'Smooth handoff, live launch, and post-launch monitoring to make sure everything holds.',
    items: ['Staging deploy', 'UAT testing', 'Production launch', 'Analytics setup'],
  },
  {
    num: '05',
    phase: 'Support',
    desc: "Ongoing maintenance, feature additions, and priority fixes — so you're never left stranded.",
    items: ['Bug fixes', 'Feature updates', 'Performance monitoring', 'Monthly retainer'],
  },
]

export default function ServicesPage() {
  const { overlayRef, go } = usePageTransition()
  const { isDark, toggle } = useTheme()

  const bg          = isDark ? '#080808' : '#f5f0e8'
  const textPrimary = isDark ? '#f5f0e8' : '#1a1208'
  const textMuted   = isDark ? 'rgba(245,240,232,0.45)' : 'rgba(26,18,8,0.48)'
  const textFaint   = isDark ? 'rgba(245,240,232,0.2)'  : 'rgba(26,18,8,0.22)'
  const cardBg      = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(26,18,8,0.04)'
  const cardBdr     = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(26,18,8,0.1)'
  const navBg       = isDark ? 'rgba(8,8,8,0.88)'       : 'rgba(240,236,227,0.9)'
  const navBdr      = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(26,18,8,0.08)'

  useEffect(() => {
    gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.4 })

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-page-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.svc-grid', start: 'top 78%' },
        }
      )
      gsap.fromTo(
        '.process-row',
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.process-section', start: 'top 78%' },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Cursor />
      <div ref={overlayRef} className="page-overlay" />

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
            SERVICES
          </span>
        </div>
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label="Toggle theme"
          style={{ color: textPrimary }}
        >
          {isDark ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
        </button>
      </nav>

      <main
        style={{
          background: bg,
          color: textPrimary,
          paddingTop: 56,
          minHeight: '100vh',
          transition: 'background 0.45s ease, color 0.45s ease',
        }}
      >
        {/* ── Hero ── */}
        <section
          style={{
            position: 'relative',
            padding: 'clamp(6rem,12vw,12rem) clamp(1.25rem,2.5vw,2.5rem) clamp(4rem,6vw,7rem)',
            borderBottom: `1px solid ${cardBdr}`,
            overflow: 'hidden',
            isolation: 'isolate',
          }}
        >
          {/* Hero Background Image */}
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: 0,
            }}
          />

          {/* Overlay for legibility */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isDark
                ? 'linear-gradient(135deg, rgba(8,8,8,0.78) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.72) 100%)'
                : 'linear-gradient(135deg, rgba(240,236,227,0.82) 0%, rgba(240,236,227,0.4) 50%, rgba(240,236,227,0.78) 100%)',
              zIndex: 1,
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '.18em',
                color: textFaint,
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              {SITE_NAME} — What I Offer
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem,10vw,9rem)',
                letterSpacing: '-.01em',
                lineHeight: 0.88,
                color: textPrimary,
                maxWidth: 900,
                marginBottom: '2rem',
              }}
            >
              SERVICES
            </h1>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: textMuted,
                maxWidth: 540,
              }}
            >
              End-to-end digital product development — from concept and design through to a polished, deployed experience. Available for project-based work and ongoing retainers.
            </p>

            <div
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <a
                href="mailto:ahamiojejeremy@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 28px',
                  background: 'var(--volt)',
                  color: '#080808',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '.06em',
                  borderRadius: 100,
                  textDecoration: 'none',
                }}
              >
                Start a Project <ArrowRight size={14} strokeWidth={2} />
              </a>

              <button
                onClick={() => go('/')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: 'transparent',
                  border: `1px solid ${cardBdr}`,
                  color: textMuted,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '.06em',
                  borderRadius: 100,
                  cursor: 'pointer',
                }}
              >
                See My Work
              </button>
            </div>
          </div>
        </section>

        {/* ── Services grid ── */}
        <section style={{ padding: 'clamp(4rem,6vw,7rem) clamp(1.25rem,2.5vw,2.5rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem,4vw,3rem)',
              letterSpacing: '.04em',
              color: textPrimary,
              marginBottom: '3rem',
            }}
          >
            What's Included
          </h2>
          <div
            className="svc-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
              gap: 20,
            }}
          >
            {SERVICES.map(svc => (
              <div
                key={svc.num}
                className="svc-page-card"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBdr}`,
                  borderRadius: 14,
                  padding: '28px 26px',
                  transition: 'border-color .25s, transform .25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--volt)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = cardBdr
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '.14em',
                    color: textFaint,
                    marginBottom: 14,
                  }}
                >
                  {svc.num}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.9rem',
                    letterSpacing: '.04em',
                    color: textPrimary,
                    marginBottom: 10,
                  }}
                >
                  {svc.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: textMuted, marginBottom: 18 }}>
                  {svc.desc}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {svc.items.map(item => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '.06em',
                        color: textMuted,
                      }}
                    >
                      <CheckCircle
                        size={12}
                        strokeWidth={1.5}
                        color="var(--volt)"
                        style={{ flexShrink: 0 }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Process / Workflow ── */}
        <section
          className="process-section"
          style={{
            padding: 'clamp(4rem,6vw,7rem) clamp(1.25rem,2.5vw,2.5rem)',
            borderTop: `1px solid ${cardBdr}`,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem,4vw,3rem)',
              letterSpacing: '.04em',
              color: textPrimary,
              marginBottom: '3.5rem',
            }}
          >
            How It Works
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PROCESS.map(step => (
              <div
                key={step.num}
                className="process-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr 1fr',
                  gap: '2rem',
                  padding: '2rem 0',
                  borderBottom: `1px solid ${cardBdr}`,
                  alignItems: 'start',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.2rem',
                    color: textFaint,
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      letterSpacing: '.04em',
                      color: textPrimary,
                      marginBottom: 8,
                    }}
                  >
                    {step.phase}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.72, color: textMuted }}>{step.desc}</p>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {step.items.map(item => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '.06em',
                        color: textMuted,
                      }}
                    >
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: 'var(--volt)',
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            padding: 'clamp(4rem,8vw,9rem) clamp(1.25rem,2.5vw,2.5rem)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '.2em',
              color: textFaint,
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            Ready to start?
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem,5vw,4rem)',
              color: textPrimary,
              marginBottom: '2.5rem',
              lineHeight: 1.2,
            }}
          >
            Let's build something<br />that matters.
          </h2>
          <a
            href="mailto:ahamiojejeremy@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 40px',
              background: 'var(--volt)',
              color: '#080808',
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '.08em',
              borderRadius: 100,
              textDecoration: 'none',
              transition: 'transform .22s, box-shadow .22s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 0 40px var(--volt-glow)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Get In Touch <ArrowRight size={16} strokeWidth={2} />
          </a>
        </section>
      </main>

      <style>{`
        @media (max-width: 640px) {
          .process-row { grid-template-columns: 40px 1fr !important; }
          .process-row > ul { display: none; }
        }
      `}</style>
    </>
  )
}
