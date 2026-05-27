import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  start?: string
  stagger?: number
}

/**
 * Single-element reveal animation tied to gsap.context for safe cleanup.
 */
export function useGsapReveal<T extends HTMLElement>(
  opts: RevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, ...opts.from },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          ...opts.to,
          scrollTrigger: {
            trigger: el,
            start: opts.start ?? 'top 80%',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

/**
 * Staggered reveal animation tied to gsap.context for safe cleanup.
 */
export function useGsapStagger<T extends HTMLElement>(
  selector: string,
  opts: RevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 36, ...opts.from },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: opts.stagger ?? 0.12,
          ease: 'power2.out',
          ...opts.to,
          scrollTrigger: {
            trigger: el,
            start: opts.start ?? 'top 74%',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
