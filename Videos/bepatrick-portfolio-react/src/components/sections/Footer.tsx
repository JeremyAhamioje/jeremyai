import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Instagram, Linkedin, Twitter, MessageCircle, Mail } from 'lucide-react'
import { DRAG_CARDS, SITE_NAME, LOGO_URL } from '@/lib/constants'
import { useTheme } from '@/contexts/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

/* ── Draggable card ── */
function DragCard({ id, bg, content, initStyle }: {
  id: string; bg: string; content: string; initStyle: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return

    // Apply inline initStyle string
    initStyle.split(';').forEach(rule => {
      const [prop, val] = rule.split(':').map(s => s.trim())
      if (prop && val) {
        const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        ;(card.style as unknown as Record<string, string>)[camel] = val
      }
    })

    // Restore from localStorage
    try {
      const saved = localStorage.getItem('jeremy_card_' + id)
      if (saved) {
        const { x, y, r } = JSON.parse(saved) as { x: number; y: number; r: number }
        card.style.left = x + 'px'
        card.style.top  = y + 'px'
        card.style.transform = `rotate(${r}deg)`
      }
    } catch {}

    let dragging = false
    let ox = 0, oy = 0, oLeft = 0, oTop = 0

    const down = (e: MouseEvent | TouchEvent) => {
      dragging = true
      const src = 'touches' in e ? e.touches[0] : e
      ox = src.clientX; oy = src.clientY
      oLeft = card.offsetLeft; oTop = card.offsetTop
      card.style.zIndex = '200'
      card.style.transform = 'scale(1.05) rotate(0deg)'
      card.style.boxShadow = '0 24px 64px rgba(0,0,0,0.6)'
      e.preventDefault?.()
    }

    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return
      const src = 'touches' in e ? (e as TouchEvent).touches[0] : e as MouseEvent
      card.style.left = (oLeft + src.clientX - ox) + 'px'
      card.style.top  = (oTop  + src.clientY - oy) + 'px'
    }

    const up = () => {
      if (!dragging) return
      dragging = false
      card.style.zIndex = '10'
      card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.45)'
      const r = +(Math.random() * 8 - 4).toFixed(1)
      card.style.transform = `rotate(${r}deg)`
      try {
        localStorage.setItem('jeremy_card_' + id, JSON.stringify({ x: card.offsetLeft, y: card.offsetTop, r }))
      } catch {}
    }

    card.addEventListener('mousedown',  down as EventListener)
    card.addEventListener('touchstart', down as EventListener, { passive: false })
    window.addEventListener('mousemove',  move as EventListener)
    window.addEventListener('touchmove',  move as EventListener, { passive: true })
    window.addEventListener('mouseup',  up)
    window.addEventListener('touchend', up)

    return () => {
      card.removeEventListener('mousedown',  down as EventListener)
      card.removeEventListener('touchstart', down as EventListener)
      window.removeEventListener('mousemove',  move as EventListener)
      window.removeEventListener('touchmove',  move as EventListener)
      window.removeEventListener('mouseup',  up)
      window.removeEventListener('touchend', up)
    }
  }, [id, initStyle])

  return (
    <div
      ref={ref}
      className="drag-card"
      style={{ background: bg }}
      dangerouslySetInnerHTML={{
        __html: `<p style="font-family:var(--font-serif);font-size:1.05rem;line-height:1.35;color:rgba(255,255,255,0.95)">${content}</p>`
      }}
    />
  )
}

const SOCIALS = [
  { label: 'Twitter',   href: '#', Icon: Twitter        },
  { label: 'Instagram', href: '#', Icon: Instagram      },
  { label: 'LinkedIn',  href: '#', Icon: Linkedin       },
  { label: 'Github',    href: 'https://github.com/JeremyAhamioje', Icon: Github        },
  { label: 'WhatsApp',  href: '/connect', Icon: MessageCircle  },
  { label: 'Email',     href: 'mailto:ahamiojejeremy@gmail.com', Icon: Mail },
] as const

export default function Footer() {
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { isDark } = useTheme()

  const textColor   = isDark ? 'var(--text)'       : '#1a1208'
  const mutedColor  = isDark ? 'var(--text-muted)' : 'rgba(26,18,8,0.45)'
  const faintColor  = isDark ? 'var(--text-faint)' : 'rgba(26,18,8,0.22)'
  const borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(26,18,8,0.1)'
  const wordOpacity = isDark ? 0.07 : 0.06

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-word-el',
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 0.82, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 82%' } }
      )
      gsap.fromTo('.drag-card',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="contact"
      className="footer-section"
      style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Big display name ── */}
      <div
        ref={titleRef}
        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.2rem 2rem', padding: '5rem 2.5rem 0' }}
      >
        {(['jeremy', 'ahamioje'] as const).map((w, i) => (
          <span
            key={w}
            className="footer-word-el"
            style={{
              opacity: 0,
              fontFamily: i === 1 ? 'var(--font-serif)' : 'var(--font-display)',
              fontStyle:  i === 1 ? 'italic' : 'normal',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              letterSpacing: '-.01em',
              lineHeight: 0.9,
              color: textColor,
              filter: `opacity(${wordOpacity * 10})`,
            }}
          >
            {w}
          </span>
        ))}
      </div>

      {/* ── Tagline ── */}
      <div style={{ padding: '2rem 2.5rem 0' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.2rem,3vw,2rem)', color: mutedColor, maxWidth: 500, lineHeight: 1.5 }}>
          Let's build something that matters.
        </p>
      </div>

      {/* ── CTA buttons ── */}
      <div style={{ padding: '2rem 2.5rem 0', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a
          href="mailto:ahamiojejeremy@gmail.com"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px',
            background: 'var(--volt)', color: '#080808',
            fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '.06em',
            borderRadius: 100, textDecoration: 'none', transition: 'transform .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Mail size={14} strokeWidth={2} /> Get In Touch
        </a>
        <a
          href="#works"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px',
            background: 'transparent', color: mutedColor,
            border: `1px solid ${borderColor}`,
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.06em',
            borderRadius: 100, textDecoration: 'none', transition: 'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--volt)'; e.currentTarget.style.color = textColor }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.color = mutedColor }}
        >
          View Work
        </a>
      </div>

      {/* ── Draggable cards area ── */}
      <div
        ref={cardsRef}
        className="footer-cards-area"
        style={{ flex: 1, position: 'relative', minHeight: 480 }}
      >
        {DRAG_CARDS.map(card => (
          <DragCard key={card.id} {...card} />
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="footer-bottom-bar"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1.5rem',
          padding: '2rem 2.5rem',
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        {/* Logo + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={LOGO_URL} alt={SITE_NAME} style={{ width: 128, height: 128, objectFit: 'contain', borderRadius: '50%' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', color: faintColor }}>
            © 2026 {SITE_NAME}
          </span>
        </div>

        {/* Social links with icons */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="social-link"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em',
                color: mutedColor,
                textDecoration: 'underline', textDecorationColor: 'transparent',
                textUnderlineOffset: 4, transition: 'color .2s, text-decoration-color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--volt)'; e.currentTarget.style.textDecorationColor = 'var(--volt)' }}
              onMouseLeave={e => { e.currentTarget.style.color = mutedColor; e.currentTarget.style.textDecorationColor = 'transparent' }}
            >
              <Icon size={13} strokeWidth={1.5} />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>

        {/* Location */}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', color: faintColor }}>
          Lagos, Nigeria
        </span>
      </div>
    </footer>
  )
}
