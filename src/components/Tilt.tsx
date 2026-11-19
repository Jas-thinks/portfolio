import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/** 3D tilt card: perspective rotation toward the cursor, a moving specular glare and a lifted inner layer. */
export default function Tilt({
  children,
  className = '',
  max = 11,
  lift = 44,
}: {
  children: ReactNode
  className?: string
  max?: number
  lift?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 })
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glow = useMotionValue(0)
  const shadow = useMotionTemplate`${useTransform(ry, (v) => -v * 3)}px ${useTransform(rx, (v) => v * 3 + 30)}px 60px -20px rgba(0,0,0,.85)`
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(120,190,255,.14), transparent 60%)`

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === 'touch') return
    const r = ref.current!.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 2 * max)
    rx.set((0.5 - py) * 2 * max)
    gx.set(px * 100)
    gy.set(py * 100)
    glow.set(1)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
    glow.set(0)
  }

  return (
    <div className="h-full [perspective:1100px]" onPointerMove={move} onPointerLeave={leave}>
      <motion.div
        ref={ref}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={`relative will-change-transform ${className}`}
      >
        <div style={{ transform: `translateZ(${lift}px)`, transformStyle: 'preserve-3d' }} className="h-full">
          {children}
        </div>
        <div
          aria-hidden="true"
          style={{ transform: 'translateZ(-14px)' }}
          className="pointer-events-none absolute inset-[3px] rounded-[inherit] border border-white/5 bg-[#0c1428]"
        />
        <motion.div
          aria-hidden="true"
          style={{ boxShadow: shadow, transform: 'translateZ(-30px)' }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
        <motion.div
          aria-hidden="true"
          style={{ background: glare, opacity: glow }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        />
      </motion.div>
    </div>
  )
}
