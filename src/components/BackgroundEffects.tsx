import { useEffect, useRef } from 'react'
import AuroraBackground from './AuroraBackground'

type Star = { x: number; y: number; r: number; d: number; p: number; s: number; hue: number }
type Meteor = { x: number; y: number; vx: number; vy: number; life: number }

/** Fixed deep-space backdrop: drifting nebulae, a Milky-Way band, ~350 parallax stars, flares and shooting stars. */
export default function BackgroundEffects() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let stars: Star[] = []
    let meteors: Meteor[] = []
    let raf = 0
    let scroll = window.scrollY
    let mx = 0
    let my = 0
    let tx = 0
    let ty = 0
    let visible = true
    let nextMeteor = Infinity

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(260, (w * h) / 6000))
      stars = Array.from({ length: n }, () => {
        const d = Math.random() ** 1.6
        // a fraction of stars cluster along the diagonal Milky-Way band
        const band = Math.random() < 0.0
        const t = Math.random()
        const spread = (Math.random() + Math.random() - 1) * 150
        const x = band ? t * w + spread * 0.6 : Math.random() * w
        const y = band ? h * (0.98 - t * 0.8) + spread * 0.8 : Math.random() * h
        return {
          x,
          y,
          r: band ? 0.22 + d * 0.55 : 0.3 + d * 0.95,
          d: 0.15 + d * 0.85,
          p: Math.random() * Math.PI * 2,
          s: 0.5 + Math.random() * 1.4,
          hue: Math.random(),
        }
      })
    }

    const color = (hue: number) => (hue < 0.35 ? '#9cc8ff' : hue < 0.7 ? '#cfe4ff' : '#f1f5ff')

    const draw = (t: number, dt: number) => {
      ctx.clearRect(0, 0, w, h)
      mx += (tx - mx) * 0.04
      my += (ty - my) * 0.04
      for (const s of stars) {
        const y = (((s.y - scroll * 0.05 * s.d + my * 8 * s.d) % h) + h) % h
        const x = (((s.x + mx * 10 * s.d) % w) + w) % w
        const tw = reduce ? 0.85 : 0.45 + 0.55 * Math.sin((t / 1000) * s.s + s.p)
        const a = tw * (0.3 + s.d * 0.65) * (s.r < 0.5 ? 0.7 : 1)
        ctx.globalAlpha = a
        ctx.fillStyle = color(s.hue)
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
        if (s.r > 1.0) {
          // bright star: soft halo + four-point flare
          const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 8)
          g.addColorStop(0, 'rgba(170,190,255,.35)')
          g.addColorStop(1, 'rgba(170,190,255,0)')
          ctx.globalAlpha = a * 0.8
          ctx.fillStyle = g
          ctx.fillRect(x - s.r * 8, y - s.r * 8, s.r * 16, s.r * 16)
          ctx.globalAlpha = a * 0.7
          ctx.strokeStyle = color(s.hue)
          ctx.lineWidth = 0.5
          ctx.beginPath()
          const f = s.r * (5 + 4 * tw)
          ctx.moveTo(x - f, y)
          ctx.lineTo(x + f, y)
          ctx.moveTo(x, y - f)
          ctx.lineTo(x, y + f)
          ctx.stroke()
        }
      }
      // shooting stars
      if (false as boolean) {
        nextMeteor -= dt
        if (nextMeteor <= 0) {
          nextMeteor = 4500 + Math.random() * 6000
          const sx = Math.random() * w * 0.8
          meteors.push({ x: sx, y: Math.random() * h * 0.4, vx: 0.9 + Math.random() * 0.5, vy: 0.45 + Math.random() * 0.3, life: 1 })
        }
        meteors = meteors.filter((m) => m.life > 0)
        for (const m of meteors) {
          const sp = dt * 0.9
          m.x += m.vx * sp
          m.y += m.vy * sp
          m.life -= dt / 900
          const len = 120
          const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * len, m.y - m.vy * len)
          g.addColorStop(0, `rgba(235,240,255,${m.life})`)
          g.addColorStop(1, 'rgba(235,240,255,0)')
          ctx.globalAlpha = 1
          ctx.strokeStyle = g
          ctx.lineWidth = 1.4
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(m.x - m.vx * len, m.y - m.vy * len)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
    }

    let last = performance.now()
    const loop = (t: number) => {
      const dt = Math.min(64, t - last)
      last = t
      if (visible) draw(t, dt)
      raf = requestAnimationFrame(loop)
    }

    const onScroll = () => {
      scroll = window.scrollY
      if (reduce) draw(0, 0)
    }
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / w - 0.5
      ty = e.clientY / h - 0.5
    }
    const onVis = () => {
      visible = !document.hidden
    }

    resize()
    if (reduce) draw(0, 0)
    else raf = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <AuroraBackground />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(2,4,12,0.7) 100%)' }} />
    </div>
  )
}
