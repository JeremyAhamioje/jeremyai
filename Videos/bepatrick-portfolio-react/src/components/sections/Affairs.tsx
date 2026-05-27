import { useTheme } from '@/contexts/ThemeContext'
import { AFFAIRS } from '@/lib/constants'

export default function Affairs() {
  const { isDark } = useTheme()
  const items = [...AFFAIRS, ...AFFAIRS, ...AFFAIRS]

  const labelColor  = isDark ? undefined : 'rgba(26,18,8,0.4)'
  const subColor    = isDark ? 'var(--text-faint)' : 'rgba(26,18,8,0.3)'
  const labelClass  = isDark ? 'sec-label' : 'sec-label sec-label-dark'

  return (
    <section
      id="affairs"
      className="affairs-section"
      style={{ padding: '8rem 0 8rem 0', overflow: 'hidden' }}
    >
      <div style={{ padding: '0 2.5rem', marginBottom: '3rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div className={labelClass} style={{ marginBottom: 0, border: 'none', paddingBottom: 0, color: labelColor }}>
          05 — Other Affairs
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: subColor }}>
          Beyond the screen.
        </span>
      </div>

      {/* Faded edge mask */}
      <div style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}>
        <div className="affairs-track">
          {items.map((a, i) => (
            <a
              key={i}
              href={a.href}
              className="affair-card"
              style={{
                flexShrink: 0,
                width: 300,
                height: 200,
                borderRadius: 12,
                overflow: 'hidden',
                position: 'relative',
                display: 'block',
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.04) translateY(-4px)'
                const ov = e.currentTarget.querySelector('.affair-overlay') as HTMLElement
                if (ov) ov.style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                const ov = e.currentTarget.querySelector('.affair-overlay') as HTMLElement
                if (ov) ov.style.opacity = '0'
              }}
            >
              <img
                src={a.image}
                alt={a.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.72) saturate(0.88)' }}
                loading="lazy"
              />
              {/* Bottom label gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 52%)',
                display: 'flex', alignItems: 'flex-end', padding: '16px 18px',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.12em', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
                  {a.label}
                </span>
              </div>
              {/* Hover volt border */}
              <div
                className="affair-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(232,255,0,0.1)',
                  border: '1.5px solid var(--volt)',
                  borderRadius: 12, opacity: 0,
                  transition: 'opacity 0.25s', pointerEvents: 'none',
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
