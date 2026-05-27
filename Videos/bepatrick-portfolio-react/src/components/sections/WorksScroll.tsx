import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { HOME_PROJECTS } from '@/lib/constants'
import { useTheme } from '@/contexts/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

/**
 * Home horizontal-scroll works section.
 *
 * Renamed from `Projects.tsx` to avoid colliding with `pages/Projects.tsx`.
 * GSAP cleanup uses only `gsap.context().revert()` — no manual trigger
 * tracking, no `ScrollTrigger.getAll().kill()`.
 *
 * Videos use `preload="none"` and are gated behind IntersectionObserver
 * so out-of-view clips don't pin the GPU decoder (the cause of Chrome's
 * STATUS_STACK_BUFFER_OVERRUN crashes on Windows during dev).
 */
export default function WorksScroll({ onViewAll }: { onViewAll: () => void }) {
  const outerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    let ctx: gsap.Context | null = null

    if (window.innerWidth <= 640) return

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: outer,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.fromTo(
          '.proj-sec-label',
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: { trigger: outer, start: 'top 88%' },
          }
        )
      }, outer)
    })

    return () => {
      cancelAnimationFrame(raf)
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={outerRef}
      id="works"
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
      className="proj-outer"
    >
      <div
        className="proj-sec-label"
        style={{
          position: 'absolute', top: 28, left: '2.5rem', zIndex: 10,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em',
          color: 'var(--slide-label)', textTransform: 'uppercase', opacity: 0,
        }}
      >
        03 — Selected Works
      </div>

      <div
        ref={trackRef}
        className="proj-track"
        style={{ display: 'flex', height: '100%', width: 'max-content', willChange: 'transform' }}
      >
        {HOME_PROJECTS.map((proj, i) => (
          <ProjectSlide key={proj.num} proj={proj} index={i} />
        ))}
        <GradientTransitionSlide />
        <BlackCtaSlide onViewAll={onViewAll} total={HOME_PROJECTS.length} />
      </div>
    </section>
  )
}

/* ── Individual project slide ── */
function ProjectSlide({ proj, index }: { proj: typeof HOME_PROJECTS[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Lazy-play: only decode/play when the video is on-screen.
  // Reduces GPU memory pressure during the horizontal-scroll pin.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.25 }
    )

    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className="proj-slide"
      style={{
        width: '100vw', height: '100vh', flexShrink: 0,
        display: 'grid', gridTemplateColumns: '1fr 1.35fr',
      }}
    >
      <div
        className="proj-left-col"
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 3rem 5rem 4rem' }}
      >
        <div
          className="proj-ghost-num"
          style={{
            position: 'absolute', top: '50%', left: '2.5rem',
            transform: 'translateY(-60%)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(7rem,18vw,14rem)',
            color: 'var(--slide-ghost)',
            lineHeight: 1, letterSpacing: '-0.02em',
            userSelect: 'none', pointerEvents: 'none',
          }}
        >
          {proj.num}
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1rem' }}>
            {proj.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em',
                padding: '4px 12px', border: '1px solid var(--slide-border)',
                borderRadius: 100, color: 'var(--slide-muted)', background: 'var(--slide-tag-bg)',
              }}>
                {t}
              </span>
            ))}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem,5.5vw,5rem)',
            lineHeight: 0.92, letterSpacing: '-0.01em',
            color: 'var(--slide-text)', marginBottom: '1.2rem',
          }}>
            {proj.title}
          </h2>

          <p style={{
            fontSize: 14, lineHeight: 1.72,
            color: 'var(--slide-muted)', maxWidth: 340, marginBottom: '1.8rem',
          }}>
            {proj.desc}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: 'var(--slide-muted)' }}>
              {proj.year}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--slide-muted)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: 'var(--slide-muted)' }}>
              {proj.role}
            </span>
            <a href={proj.href} style={{
              marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em',
              color: 'var(--slide-text)', textDecoration: 'none',
              borderBottom: '1px solid var(--slide-border)', paddingBottom: 2, transition: 'gap 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
              onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
            >
              Open <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      <div
        className="proj-right-col"
        style={{
          position: 'relative', overflow: 'hidden',
          margin: '3rem 3rem 3rem 0', borderRadius: 12,
          background: 'var(--slide-ghost)',
        }}
      >
        {proj.video ? (
          <video
            ref={videoRef}
            src={proj.video}
            muted
            loop
            playsInline
            preload="none"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <img
            src={proj.image}
            alt={proj.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        )}

        <div style={{
          position: 'absolute', bottom: 16, left: 16,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em',
          color: 'rgba(255,255,255,0.65)',
          background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 20,
        }}>
          {(index + 1).toString().padStart(2, '0')} / {HOME_PROJECTS.length.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}

/* ── Gradient transition slide ── */
function GradientTransitionSlide() {
  const { isDark } = useTheme()
  return (
    <div
      className="gradient-slide"
      style={{ width: '100vw', height: '100vh', flexShrink: 0, position: 'relative' }}
    >
      {isDark ? <div className="gradient-glow-dark" /> : <div className="gradient-glow-light" />}
    </div>
  )
}

/* ── CTA slide ── */
function BlackCtaSlide({ onViewAll, total }: { onViewAll: () => void; total: number }) {
  return (
    <div className="cta-slide">
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '35%', height: '60%',
        background: 'radial-gradient(ellipse at 10% 30%, var(--cta-glow) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800, width: '100%' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.2em',
          color: 'var(--cta-muted)', textTransform: 'uppercase', marginBottom: '2rem',
        }}>
          {total.toString().padStart(2, '0')} works total
        </p>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 'clamp(1.6rem,3.5vw,2.8rem)',
          color: 'var(--cta-text)', lineHeight: 1.35, marginBottom: '3.5rem',
        }}>
          There's more where that came from.
        </h2>

        <div style={{ width: '100%', height: 1, background: 'var(--cta-border)', marginBottom: '3rem' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={onViewAll}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '16px 40px', background: 'var(--volt)', color: '#080808',
              border: 'none', borderRadius: 100,
              fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, letterSpacing: '.08em',
              cursor: 'pointer', transition: 'transform 0.22s, box-shadow 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.boxShadow = '0 0 40px var(--volt-glow)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            View All Projects <ArrowUpRight size={16} strokeWidth={2} />
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 28px',
              background: 'var(--cta-btn-bg)', color: 'var(--cta-btn-text)',
              border: '1px solid var(--cta-btn-bdr)', borderRadius: 100,
              fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '.08em',
              cursor: 'pointer', transition: 'all 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.color = 'var(--cta-text)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--cta-btn-bg)'; e.currentTarget.style.color = 'var(--cta-btn-text)' }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} /> Back to top
          </button>
        </div>
      </div>
    </div>
  )
}