import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

export function usePageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const navigate   = useNavigate()

  const go = useCallback((path: string) => {
    const el = overlayRef.current
    if (!el) { navigate(path); return }
    gsap.to(el, {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => navigate(path),
    })
  }, [navigate])

  return { overlayRef, go }
}
