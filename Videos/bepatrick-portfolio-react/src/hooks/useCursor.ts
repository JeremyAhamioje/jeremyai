import { useEffect, useRef } from 'react'

export function useCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mx = useRef(0)
  const my = useRef(0)
  const tx = useRef(0)
  const ty = useRef(0)
  const raf = useRef(0)
  const lastRipple = useRef(0)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
      spawnRipple(e.clientX, e.clientY)
    }

    function spawnRipple(x: number, y: number) {
      const now = Date.now()
      if (now - lastRipple.current < 500) return
      lastRipple.current = now
      const el = document.createElement('div')
      el.className = 'cursor-ripple'
      el.style.left = x + 'px'
      el.style.top  = y + 'px'
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 1200)
    }

    function trailLoop() {
      tx.current += (mx.current - tx.current) * 0.1
      ty.current += (my.current - ty.current) * 0.1
      if (ring) {
        ring.style.left = tx.current + 'px'
        ring.style.top  = ty.current + 'px'
      }
      raf.current = requestAnimationFrame(trailLoop)
    }

    document.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(trailLoop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return { dotRef, ringRef }
}
