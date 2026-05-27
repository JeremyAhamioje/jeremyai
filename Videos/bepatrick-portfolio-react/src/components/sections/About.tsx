import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ABOUT_CARDS, PROFILE_IMAGE_URL, ABOUT_DIGEST_IMAGES, SITE_NAME } from '@/lib/constants'
import { useTheme } from '@/contexts/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const DIGEST_ROWS: { label: string; cardKey: number; imgSlice: [number, number] }[] = [
  { label: 'Design',      cardKey: 0, imgSlice: [0, 4] },
  { label: 'Development', cardKey: 1, imgSlice: [4, 7] },
  { label: 'Others',      cardKey: 2, imgSlice: [7, 10] },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-left-col',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } }
      )
      gsap.fromTo('.digest-row',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.digest-table', start: 'top 78%' } }
      )
    }, sectionRef.current!)
    return () => ctx.revert()
  }, [])

  const bg   = isDark ? '#f0ece3' : '#080808'
  const ink  = isDark ? '#1a1208'          : '#f5f0e8'
  const muted = isDark ? 'rgba(26,18,8,0.55)' : 'rgba(245,240,232,0.45)'
  const faint = isDark ? 'rgba(26,18,8,0.28)'  : 'rgba(245,240,232,0.2)'
  const bdr  = isDark ? 'rgba(26,18,8,0.1)' : 'rgba(255,255,255,0.07)'
  const surf = isDark ? 'rgba(26,18,8,0.04)' : 'rgba(255,255,255,0.04)'

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
      style={{
        padding: 'clamp(4rem,8vw,8rem) clamp(1.25rem,2.5vw,2.5rem)',
        background: bg,
        transition: 'background 0.45s ease',
      }}
    >
      <div className="sec-label" style={{ color: muted, borderBottomColor: bdr }}>02 — Meet The Creator</div>

      {/* Outer grid */}
      <div
        className="about-outer-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(160px,240px) 1fr',
          gap: 'clamp(2rem,4vw,4rem)',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT: portrait ── */}
        <div className="about-left-col">
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,3rem)', lineHeight: 1, color: isDark ? 'rgba(26,18,8,0.12)' : 'rgba(245,240,232,0.15)', marginBottom: 8 }}>
            the
          </p>

          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={PROFILE_IMAGE_URL}
              alt={SITE_NAME}
              style={{ width: '100%', display: 'block', filter: 'contrast(1.05)', borderRadius: 4 }}
            />
            {/* Volt corner accent */}
            <div style={{ position: 'absolute', bottom: -14, right: -14, width: 54, height: 54, border: '1px solid var(--volt)', zIndex: -1 }} />
          </div>

          <div style={{ marginTop: 28 }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.8rem,4vw,3rem)', lineHeight: 1, color: ink }}>
              creator
            </p>
          </div>
        </div>

        {/* ── RIGHT: bio + digest table ── */}
        <div className="digest-table" style={{ paddingTop: 'clamp(0px,3.5vw,3.5rem)' }}>

          <p style={{ fontSize: 15, lineHeight: 1.78, color: muted, maxWidth: 560, marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: `1px solid ${bdr}` }}>
            {SITE_NAME} is a creative developer and designer obsessed with building digital experiences
            that don't just look good — they feel inevitable. Based in Lagos, operating globally.
          </p>

          {/* Digest rows */}
          {DIGEST_ROWS.map(({ label, cardKey, imgSlice }) => {
            const card = ABOUT_CARDS[cardKey]
            const imgs = ABOUT_DIGEST_IMAGES.slice(imgSlice[0], imgSlice[1])

            return (
              <div
                key={label}
                className="digest-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr auto',
                  gap: '1.5rem',
                  alignItems: 'start',
                  padding: '1.6rem 0',
                  borderBottom: `1px solid ${bdr}`,
                }}
              >
                {/* Label */}
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: ink, paddingTop: 2 }}>
                  {label}
                </div>

                {/* Tags as list */}
                <div>
                  {card.tags.map(tag => (
                    <p key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', color: muted, lineHeight: 2 }}>
                      {tag}
                    </p>
                  ))}
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', color: faint, lineHeight: 2, marginTop: 4, fontStyle: 'italic' }}>
                    {card.body.split('.')[0]}.
                  </p>
                </div>

                {/* Thumbnails */}
                <div className="digest-thumbs" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'nowrap' }}>
                  {imgs.map((src, i) => (
                    <div key={i} style={{ width: 100, height: 100, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: surf }}>
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.12)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', color: faint, marginTop: '1.5rem', textTransform: 'uppercase' }}>
            Lagos, Nigeria — Available Globally
          </p>
        </div>
      </div>
    </section>
  )
}
