import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props { onDone: () => void }

export default function Preloader({ onDone }: Props) {
  const ref     = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef(false)

  useEffect(() => {
    const el   = ref.current
    const text = textRef.current
    if (!el || !text) return

    const tl = gsap.timeline()

    // Cinematic fade-in sequence
    tl.fromTo(text,
      { opacity: 0, y: 18, letterSpacing: '0.4em' },
      { opacity: 1, y: 0, letterSpacing: '0.18em', duration: 1.1, ease: 'power3.out' }
    )
    .to({}, { duration: 0.9 }) // hold
    .to(text, { opacity: 0, y: -12, duration: 0.6, ease: 'power2.in' })
    .to(el, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        if (!doneRef.current) { doneRef.current = true; onDone() }
      }
    })

    return () => { tl.kill() }
  }, [onDone])

  return (
    <div ref={ref} style={{
      position: 'fixed', inset: 0, background: 'var(--color-ink)',
      zIndex: 99990, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '0.5rem',
    }}>
      {/* Logo mark */}
      <img
        src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778837798/Gemini_Generated_Image_alhhftalhhftalhh-removebg-preview_zpil3k.png"
        alt="Jeremy Ahamioje"
        style={{ width: 256, height: 256, objectFit: 'contain', opacity: 0.9, marginBottom: 0 }}
      />
      <div ref={textRef} style={{ opacity: 0 }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.65rem, 1.8vw, 0.85rem)',
          letterSpacing: '0.18em',
          color: 'rgba(245,240,232,0.55)',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          Build Things That Matter
        </p>
      </div>
    </div>
  )
}
