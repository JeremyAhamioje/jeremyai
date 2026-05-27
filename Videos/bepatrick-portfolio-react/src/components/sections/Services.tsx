import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { useTheme } from '@/contexts/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

export default function Services({ onViewAll }: { onViewAll: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { isDark } = useTheme()

  const labelClass = isDark ? 'sec-label' : 'sec-label sec-label-dark'
  const cardBg     = isDark ? 'var(--surface)'       : 'rgba(26,18,8,0.04)'
  const cardBdr    = isDark ? 'var(--border)'        : 'rgba(26,18,8,0.1)'
  const cardBdrHov = 'var(--volt)'
  const numColor   = isDark ? 'var(--text-faint)'    : 'rgba(26,18,8,0.18)'
  const titleColor = isDark ? 'var(--text)'          : '#1a1208'
  const descColor  = isDark ? 'var(--text-muted)'    : 'rgba(26,18,8,0.52)'
  const tagBg      = isDark ? 'var(--surface)'       : 'rgba(26,18,8,0.06)'
  const tagBdr     = isDark ? 'var(--border-mid)'    : 'rgba(26,18,8,0.14)'
  const tagColor   = isDark ? 'var(--text-muted)'    : 'rgba(26,18,8,0.5)'
  const subColor   = isDark ? 'var(--text-faint)'    : 'rgba(26,18,8,0.28)'

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 72%' },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="tools-section"
      style={{ padding: 'clamp(4rem,8vw,8rem) clamp(1.25rem,2.5vw,2.5rem)' }}
    >
      <div className={labelClass}>04 — Services</div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '-.01em', lineHeight: 0.9, color: titleColor }}>
          What I Offer
        </h2>
        <button
          onClick={onViewAll}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', background: 'transparent', border: `1px solid ${cardBdr}`, borderRadius: 100, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.08em', color: descColor, cursor: 'pointer', transition: 'all .22s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--volt)'; e.currentTarget.style.color = titleColor }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = cardBdr; e.currentTarget.style.color = descColor }}
        >
          Full Services <ArrowUpRight size={13} strokeWidth={1.5} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
        {SERVICES.map(svc => (
          <div
            key={svc.num}
            className="service-card"
            style={{
              background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14,
              padding: '28px 26px', transition: 'border-color .25s, transform .25s', cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = cardBdrHov; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = cardBdr; e.currentTarget.style.transform = 'none' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: numColor, marginBottom: 14 }}>{svc.num}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', letterSpacing: '.04em', color: titleColor, marginBottom: 10 }}>{svc.title}</h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: descColor, marginBottom: 18 }}>{svc.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {svc.items.map(item => (
                <span key={item} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', padding: '3px 10px', background: tagBg, border: `1px solid ${tagBdr}`, borderRadius: 100, color: tagColor }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: subColor, marginTop: '2.5rem', textAlign: 'center' }}>
        Currently available for new projects — <a href="mailto:ahamiojejeremy@gmail.com" style={{ color: 'var(--volt)', textDecoration: 'underline', textUnderlineOffset: 3 }}>let's talk</a>
      </p>
    </section>
  )
}
