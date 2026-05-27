import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { TOOLS } from '@/lib/constants'
import type { Tool } from '@/lib/constants'
import { useTheme } from '@/contexts/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

function ToolModal({ tool, onClose }: { tool: Tool; onClose: () => void }) {
  const { isDark } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="tool-modal-bg"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(26,18,8,0.05)',
          borderRadius: 18,
          padding: '40px',
          maxWidth: 360,
          width: '90%',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(26,18,8,0.6)',
          }}
        >
          <X size={18} />
        </button>

        <img
          src={tool.src}
          alt={tool.name}
          style={{
            width: 80,
            height: 80,
            objectFit: 'contain',
            marginBottom: 18,
          }}
        />

        <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>
          {tool.name}
        </h3>

        <p style={{ fontSize: 14, lineHeight: 1.6 }}>
          {tool.desc}
        </p>
      </div>
    </div>
  )
}

export default function Tools() {
  const [active, setActive] = useState<Tool | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tool-item',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.02,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="tools-section"
      style={{
        padding: '8rem 2.5rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Constrained wrapper — keeps grid centered, prevents stretching */}
      <div style={{ maxWidth: 900, width: '100%' }}>
        <div className="sec-label">04 — Tool Stack</div>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            marginBottom: '3rem',
            color: isDark ? 'rgba(245,240,232,.4)' : 'rgba(26,18,8,.55)',
          }}
        >
          The tools I wield daily.
        </p>

        <div
          className="tools-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2px',
            justifyItems: 'center',
          }}
        >
          {TOOLS.map(tool => (
            <div
              key={tool.name}
              className="tool-item"
              onClick={() => setActive(tool)}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                background: 'transparent',
                transition: 'transform .2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)'
                const hover = e.currentTarget.querySelector<HTMLDivElement>('.tool-hover-lbl')
                if (hover) hover.style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                const hover = e.currentTarget.querySelector<HTMLDivElement>('.tool-hover-lbl')
                if (hover) hover.style.opacity = '0'
              }}
            >
              <img
                src={tool.src}
                alt={tool.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />

              <div
                className="tool-hover-lbl"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '.08em',
                  opacity: 0,
                  transition: 'opacity .18s',
                  background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)',
                  color: isDark ? '#fff' : '#000',
                }}
              >
                Click Me
              </div>
            </div>
          ))}
        </div>

        {active && <ToolModal tool={active} onClose={() => setActive(null)} />}
      </div>
    </section>
  )
}
