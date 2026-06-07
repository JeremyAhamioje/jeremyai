'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Moon, Sun, Grid3x3, X } from 'lucide-react'

export function LandingPage() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [ticketmasterEvents, setTicketmasterEvents] = useState<any[]>([])
  const [loadingEvents, setLoadingEvents] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Initialize theme from document
    const html = document.documentElement
    const isDark = html.getAttribute('data-theme') === 'dark'
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const newTheme = theme === 'light' ? 'dark' : 'light'
    html.setAttribute('data-theme', newTheme)
    setTheme(newTheme)
  }

  // Wave animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0,
      H = 0,
      dpr = 1,
      t = 0,
      raf: number

    const spikes = [
      { x: 0.1, h: 1.0, w: 0.03, drift: 0.018 },
      { x: 0.24, h: 0.55, w: 0.024, drift: 0.022 },
      { x: 0.33, h: 0.42, w: 0.02, drift: 0.026 },
      { x: 0.93, h: 0.92, w: 0.034, drift: 0.015 },
    ]

    function resize() {
      dpr = window.devicePixelRatio || 1
      const r = canvas.getBoundingClientRect()
      W = r.width
      H = r.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function gauss(x: number, c: number, w: number) {
      const d = (x - c) / w
      return Math.exp(-d * d)
    }

    function draw() {
      t += 0.6
      ctx.clearRect(0, 0, W, H)
      const isDark = theme === 'dark'
      const base = H * 0.78

      // Baseline wave
      ctx.beginPath()
      for (let x = 0; x <= W; x += 3) {
        const y = base + Math.sin(x * 0.012 + t * 0.01) * 5 + Math.sin(x * 0.03 - t * 0.012) * 3
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.strokeStyle = isDark ? 'rgba(154,160,166,0.22)' : 'rgba(60,64,67,0.16)'
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      ctx.stroke()

      // Spiky search-interest line
      const pts: [number, number][] = []
      for (let x = 0; x <= W; x += 2) {
        const nx = x / W
        let spikeSum = 0
        spikes.forEach((s, i) => {
          const cx = s.x + Math.sin(t * 0.004 + i) * s.drift
          spikeSum += gauss(nx, cx, s.w) * s.h
        })
        const pulse = 0.85 + 0.15 * Math.sin(t * 0.02)
        const wobble = Math.sin(x * 0.02 + t * 0.015) * 4
        const y = base + wobble - spikeSum * (H * 0.62) * pulse
        pts.push([x, y])
      }

      // Fill
      ctx.beginPath()
      ctx.moveTo(0, base)
      pts.forEach((p) => ctx.lineTo(p[0], p[1]))
      ctx.lineTo(W, base + 40)
      ctx.lineTo(0, base + 40)
      ctx.closePath()

      const grad = ctx.createLinearGradient(0, 0, 0, base)
      grad.addColorStop(0, isDark ? 'rgba(138,180,248,0.20)' : 'rgba(66,133,244,0.16)')
      grad.addColorStop(1, 'rgba(66,133,244,0)')
      ctx.fillStyle = grad
      ctx.fill()

      // Line
      ctx.beginPath()
      pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1])))
      ctx.strokeStyle = isDark ? 'rgba(138,180,248,0.85)' : 'rgba(120,170,250,0.85)'
      ctx.lineWidth = 3
      ctx.lineJoin = 'round'
      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  const tools = [
    {
      name: 'SpotHero Collector',
      desc: 'Metrics grid + price trend charts across all monitored SpotHero venues.',
      status: 'live',
      route: '/spothero-data',
      kind: 'chart',
    },
    {
      name: 'Event Discovery',
      desc: 'Surface every listing for a trending event in a single modal overlay.',
      status: 'live',
      route: 'modal',
      kind: 'pins',
    },
    {
      name: 'Change Detection',
      desc: 'High-profile alerts for 20%+ price spikes and 40%+ inventory crunches.',
      status: 'live',
      route: '/alerts',
      kind: 'alert',
    },
    { name: 'Way Scraper', desc: 'Direct collection from Way parking inventory. In development.', status: 'soon', route: '—', kind: 'lock' },
    { name: 'ParkWhiz Scraper', desc: 'Direct collection from ParkWhiz inventory. In development.', status: 'soon', route: '—', kind: 'lock' },
    {
      name: 'Price Trends',
      desc: 'All snapshots grouped by venue with up / down / flat / volatile classification.',
      status: 'live',
      route: '/spothero-data',
      kind: 'multiline',
    },
  ]

  const handleToolClick = async (tool: (typeof tools)[0]) => {
    if (tool.status === 'soon') return
    if (tool.route === 'modal') {
      setModalOpen(true)
      // Fetch ticketmaster events
      if (ticketmasterEvents.length === 0) {
        setLoadingEvents(true)
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ticketmaster-events`)
          const data = await res.json()
          setTicketmasterEvents(Array.isArray(data) ? data.slice(0, 4) : [])
        } catch (error) {
          console.error('Failed to fetch events:', error)
        } finally {
          setLoadingEvents(false)
        }
      }
    } else {
      router.push(tool.route)
    }
  }

  const getThumbnailSvg = (kind: string) => {
    if (kind === 'chart')
      return (
        <svg viewBox="0 0 320 148" preserveAspectRatio="none">
          <rect width="320" height="148" fill="#e8f0fe" />
          <path
            d="M0 110 Q50 60 100 90 T200 70 T320 40 V148 H0Z"
            fill="#4285F4"
            fillOpacity=".18"
          />
          <path
            d="M0 110 Q50 60 100 90 T200 70 T320 40"
            stroke="#4285F4"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )
    if (kind === 'pins')
      return (
        <svg viewBox="0 0 320 148">
          <rect width="320" height="148" fill="#fce8e6" />
          <circle cx="90" cy="64" r="14" fill="#EA4335" />
          <path d="M90 64 v22" stroke="#EA4335" strokeWidth="4" />
          <circle cx="180" cy="80" r="11" fill="#EA4335" fillOpacity=".7" />
          <circle cx="235" cy="55" r="11" fill="#EA4335" fillOpacity=".7" />
        </svg>
      )
    if (kind === 'alert')
      return (
        <svg viewBox="0 0 320 148">
          <rect width="320" height="148" fill="#fef7e0" />
          <path d="M160 36 l46 78 H114 Z" fill="#FBBC04" />
          <rect x="156" y="66" width="8" height="26" rx="4" fill="#fff" />
          <circle cx="160" cy="102" r="4.5" fill="#fff" />
        </svg>
      )
    if (kind === 'multiline')
      return (
        <svg viewBox="0 0 320 148" preserveAspectRatio="none">
          <rect width="320" height="148" fill="#e6f4ea" />
          <path d="M0 100 L80 70 L160 90 L240 50 L320 60" stroke="#34A853" strokeWidth="3" fill="none" />
          <path d="M0 80 L80 95 L160 60 L240 85 L320 40" stroke="#4285F4" strokeWidth="3" fill="none" />
          <path d="M0 120 L80 110 L160 118 L240 105 L320 112" stroke="#EA4335" strokeWidth="3" fill="none" />
        </svg>
      )
    return (
      <svg viewBox="0 0 320 148">
        <rect width="320" height="148" fill="#eceef3" />
        <rect x="140" y="50" width="40" height="34" rx="6" fill="none" stroke="#9aa0a6" strokeWidth="4" />
        <path d="M148 50 v-8 a12 12 0 0124 0 v8" stroke="#9aa0a6" strokeWidth="4" fill="none" />
      </svg>
    )
  }

  if (!mounted) return null

  return (
    <div className="landing-page">
      <style jsx global>{`
        :root {
          --blue: #4285F4;
          --blue-deep: #1a73e8;
          --red: #EA4335;
          --yellow: #FBBC04;
          --green: #34A853;
          --bg: #ffffff;
          --bg-band: #eef1fb;
          --bg-band-2: #f6f8fe;
          --surface: #ffffff;
          --surface-2: #f8f9fc;
          --border: #e3e6ee;
          --text: #1f2024;
          --text-2: #5f6368;
          --text-3: #80868b;
          --shadow: 0 1px 3px rgba(60, 64, 67, 0.08), 0 4px 14px rgba(60, 64, 67, 0.06);
          --shadow-hover: 0 2px 6px rgba(60, 64, 67, 0.12), 0 10px 28px rgba(60, 64, 67, 0.14);
          --pill: #f1f3f9;
          --skeleton: #eceef5;
          --skeleton-sheen: #f6f7fb;
          --grid-line: rgba(60, 64, 67, 0.1);
        }
        [data-theme='dark'] {
          --bg: #131314;
          --bg-band: #1b1c1e;
          --bg-band-2: #161719;
          --surface: #1e1f20;
          --surface-2: #232427;
          --border: #303134;
          --text: #e4e5e8;
          --text-2: #9aa0a6;
          --text-3: #80868b;
          --shadow: 0 1px 3px rgba(0, 0, 0, 0.4), 0 4px 14px rgba(0, 0, 0, 0.3);
          --shadow-hover: 0 2px 6px rgba(0, 0, 0, 0.5), 0 12px 30px rgba(0, 0, 0, 0.45);
          --pill: #2a2b2e;
          --skeleton: #26272a;
          --skeleton-sheen: #303134;
          --grid-line: rgba(255, 255, 255, 0.06);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Manrope', -apple-system, sans-serif;
          background: var(--bg);
          color: var(--text);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          transition: background 0.35s ease, color 0.35s ease;
        }
        h1,
        h2,
        h3,
        h4,
        .font-display {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }
        a {
          text-decoration: none;
          color: inherit;
        }

        /* NAVBAR */
        nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: color-mix(in srgb, var(--bg) 88%, transparent);
          backdrop-filter: saturate(180%) blur(12px);
          border-bottom: 1px solid var(--border);
          transition: background 0.35s ease, border-color 0.35s ease;
        }
        .nav-inner {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 36px;
        }
        .logo {
          font-family: 'Plus Jakarta Sans';
          font-weight: 700;
          font-size: 22px;
          letter-spacing: -0.3px;
          display: flex;
          align-items: center;
        }
        .logo .p {
          color: var(--blue);
        }
        .logo .a {
          color: var(--red);
        }
        .logo .r {
          color: var(--yellow);
        }
        .logo .k {
          color: var(--blue);
        }
        .logo .i {
          color: var(--green);
        }
        .logo .n2 {
          color: var(--red);
        }
        .logo .gtail {
          color: var(--text);
          font-weight: 500;
          margin-left: 7px;
        }
        .nav-links {
          display: flex;
          gap: 30px;
          flex: 1;
        }
        .nav-links a {
          font-size: 15px;
          color: var(--text-2);
          font-weight: 500;
          padding: 6px 2px;
          position: relative;
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: var(--text);
        }
        .nav-links a.active {
          color: var(--text);
        }
        .nav-links a.active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -20px;
          height: 3px;
          background: var(--blue);
          border-radius: 3px 3px 0 0;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .region {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-2);
          cursor: pointer;
          padding: 8px 10px;
          border-radius: 8px;
        }
        .region:hover {
          background: var(--pill);
        }
        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--text-2);
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: background 0.2s;
        }
        .icon-btn:hover {
          background: var(--pill);
        }
        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #34a853, #1a73e8);
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 15px;
          font-family: 'Plus Jakarta Sans';
          cursor: pointer;
        }

        /* HERO */
        .hero {
          position: relative;
          min-height: 460px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: linear-gradient(180deg, var(--bg) 0%, var(--bg-band-2) 100%);
        }
        #waveCanvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 50px;
          width: 100%;
          padding: 70px 0 96px;
          flex-wrap: wrap;
        }
        .hero-head {
          flex: 0 0 auto;
          max-width: 360px;
        }
        .hero-head h1 {
          font-size: 52px;
          line-height: 1.06;
          font-weight: 700;
          letter-spacing: -1.5px;
        }
        .hl {
          background: #fde7a9;
          color: #1f2024;
          padding: 0 6px;
          border-radius: 3px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        [data-theme='dark'] .hl {
          background: #5a4a18;
          color: #fbe9b6;
        }
        .hero-search {
          flex: 1 1 420px;
          max-width: 560px;
        }
        .searchbar {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 8px 8px 8px 22px;
          box-shadow: var(--shadow);
          transition: box-shadow 0.25s, border-color 0.25s;
        }
        .searchbar:hover {
          box-shadow: var(--shadow-hover);
        }
        .search-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--blue);
          flex: 0 0 auto;
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--blue) 18%, transparent);
        }
        .explore-btn {
          background: var(--blue);
          color: #fff;
          border: none;
          font-family: 'Plus Jakarta Sans';
          font-weight: 600;
          font-size: 15px;
          padding: 11px 26px;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .explore-btn:hover {
          background: var(--blue-deep);
          box-shadow: 0 6px 18px color-mix(in srgb, var(--blue) 40%, transparent);
          transform: translateY(-1px);
        }

        /* TOOLS GRID */
        .tools {
          background: var(--bg);
          padding: 76px 0 90px;
          text-align: center;
        }
        .tools h2 {
          font-size: 34px;
          font-weight: 600;
          letter-spacing: -0.5px;
        }
        .tools .sub {
          color: var(--text-2);
          font-size: 16px;
          margin-top: 10px;
        }
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          margin-top: 48px;
          text-align: left;
        }
        .tool-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: box-shadow 0.25s, transform 0.25s;
          display: flex;
          flex-direction: column;
        }
        .tool-card.live {
          cursor: pointer;
        }
        .tool-card.live:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-4px);
        }
        .tool-card.soon {
          opacity: 0.6;
          filter: grayscale(0.55);
        }
        .tool-thumb {
          height: 148px;
          position: relative;
        }
        .tool-thumb svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .badge {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          padding: 5px 11px;
          border-radius: 999px;
        }
        .badge.live {
          background: color-mix(in srgb, var(--green) 16%, var(--surface));
          color: #137333;
        }
        [data-theme='dark'] .badge.live {
          background: #143620;
          color: #81c995;
        }
        .badge.soon {
          background: var(--pill);
          color: var(--text-2);
        }
        .tool-body {
          padding: 18px 20px 22px;
        }
        .tool-body h4 {
          font-size: 17.5px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tool-body p {
          font-size: 14px;
          color: var(--text-2);
          margin-top: 7px;
          line-height: 1.5;
        }
        .tool-route {
          font-size: 12.5px;
          font-family: 'Manrope';
          color: var(--blue-deep);
          margin-top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-weight: 600;
        }
        [data-theme='dark'] .tool-route {
          color: #8ab4f8;
        }
        .tool-route.muted {
          color: var(--text-3);
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 21, 23, 0.55);
          backdrop-filter: blur(3px);
          z-index: 200;
          display: none;
          place-items: center;
          padding: 24px;
        }
        .modal-overlay.open {
          display: grid;
        }
        .modal {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          max-width: 560px;
          width: 100%;
          box-shadow: var(--shadow-hover);
          overflow: hidden;
          animation: pop 0.3s cubic-bezier(0.2, 0.8, 0.3, 1);
        }
        @keyframes pop {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(10px);
          }
        }
        .modal-head {
          padding: 22px 26px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-head h3 {
          font-size: 20px;
          font-weight: 600;
        }
        .modal-body {
          padding: 8px 26px 26px;
        }
        .listing {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid var(--border);
        }
        .listing:last-child {
          border-bottom: none;
        }
        .listing .ln {
          font-weight: 600;
          font-size: 15px;
        }
        .listing .lsub {
          font-size: 13px;
          color: var(--text-2);
        }
        .listing .price {
          font-family: 'Plus Jakarta Sans';
          font-weight: 700;
          font-size: 18px;
        }
        .listing .price.up {
          color: var(--red);
        }
        .listing .price.down {
          color: var(--green);
        }

        /* FOOTER */
        footer {
          background: var(--bg-band);
          border-top: 1px solid var(--border);
          padding: 36px 0;
        }
        .foot-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 13.5px;
          color: var(--text-2);
        }
        .foot-links {
          display: flex;
          gap: 22px;
        }
        .foot-links a:hover {
          color: var(--text);
        }

        @media (max-width: 980px) {
          .tools-grid {
            grid-template-columns: 1fr;
          }
          .hero-head h1 {
            font-size: 42px;
          }
          .nav-links {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .wrap {
            padding: 0 18px;
          }
          .hero-head h1 {
            font-size: 36px;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav>
        <div className="wrap nav-inner">
          <Link href="/" className="logo">
            <span className="p">P</span>
            <span className="a">a</span>
            <span className="r">r</span>
            <span className="k">k</span>
            <span className="i">i</span>
            <span className="n2">n</span>
            <span className="p">g</span>
            <span className="gtail">Intel</span>
          </Link>
          <div className="nav-links">
            <a href="#" className="active">
              Home
            </a>
            <a href="#tools">Explore</a>
            <a href="#tools">Trending now</a>
          </div>
          <div className="nav-right">
            <div className="region">
              United States
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === 'light' ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <button className="icon-btn" title="Apps">
              <Grid3x3 size={22} />
            </button>
            <div className="avatar">J</div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <canvas id="waveCanvas" ref={canvasRef}></canvas>
        <div className="wrap hero-inner">
          <div className="hero-head">
            <h1>
              Real-Time <span className="hl">Monitoring</span> System
            </h1>
          </div>
          <div className="hero-search">
            <div className="searchbar">
              <span className="search-dot"></span>
              <button
                className="explore-btn"
                onClick={() => {
                  const el = document.getElementById('tools')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* TOOLS */}
      <section className="tools" id="tools">
        <div className="wrap">
          <h2>Tools</h2>
          <p className="sub">Six instruments for tracking the parking market in real time.</p>
          <div className="tools-grid">
            {tools.map((tool) => {
              const isLive = tool.status === 'live'
              return (
                <div
                  key={tool.name}
                  className={`tool-card ${isLive ? 'live' : 'soon'}`}
                  onClick={() => handleToolClick(tool)}
                >
                  <div className="tool-thumb">
                    {getThumbnailSvg(tool.kind)}
                    <span className={`badge ${isLive ? 'live' : 'soon'}`}>
                      {isLive ? 'Live' : 'Coming Soon'}
                    </span>
                  </div>
                  <div className="tool-body">
                    <h4>{tool.name}</h4>
                    <p>{tool.desc}</p>
                    {isLive && (
                      <span className="tool-route">
                        {tool.route === 'modal' ? 'Open event modal' : tool.route}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                    )}
                    {!isLive && <span className="tool-route muted">Available soon</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* EVENT DISCOVERY MODAL */}
      <div className={`modal-overlay ${modalOpen ? 'open' : ''}`} id="modal" onClick={() => setModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-head">
            <h3>Discovered Events — Ticketmaster</h3>
            <button className="icon-btn" onClick={() => setModalOpen(false)}>
              <X size={22} />
            </button>
          </div>
          <div className="modal-body">
            {loadingEvents ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">Loading events...</div>
            ) : ticketmasterEvents.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">No events discovered yet</div>
            ) : (
              ticketmasterEvents.map((event, idx) => {
                const eventDate = new Date(event.event_date)
                const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                return (
                  <div key={idx} className="listing">
                    <div>
                      <div className="ln">{event.event_name} — {event.venue_name}</div>
                      <div className="lsub">{formattedDate}</div>
                    </div>
                    <a href={event.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                      View →
                    </a>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="wrap foot-inner">
          <div>© 2026 ParkingIntel — Parking Arbitrage Intelligence Platform</div>
          <div className="foot-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">About</a>
            <a href="#">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
