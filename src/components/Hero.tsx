import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react'
import { site } from '../data/site'
import { GithubIcon } from './icons'

const ease = [0.22, 1, 0.36, 1] as const

function Word({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className={`block ${className ?? ''}`}
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  )
}

function Orbits() {
  // Three tilted ellipses with a small body on each; the whole thing rotates very slowly.
  return (
    <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g className="orbit-spin" style={{ transformOrigin: '300px 300px', ['--d' as string]: '90s' }}>
        <ellipse cx="300" cy="300" rx="296" ry="150" fill="none" stroke="rgba(165,216,255,.32)" strokeWidth="1" transform="rotate(-24 300 300)" />
        <g transform="rotate(-24 300 300)">
          <circle cx="596" cy="300" r="4" fill="#a5d8ff" />
        </g>
      </g>
      <g className="orbit-spin" style={{ transformOrigin: '300px 300px', ['--d' as string]: '140s', animationDirection: 'reverse' }}>
        <ellipse cx="300" cy="300" rx="262" ry="262" fill="none" stroke="rgba(165,216,255,.2)" strokeWidth="1" strokeDasharray="2 7" />
        <circle cx="300" cy="38" r="2.5" fill="#f1f5ff" />
      </g>
      <g className="orbit-spin" style={{ transformOrigin: '300px 300px', ['--d' as string]: '60s' }}>
        <ellipse cx="300" cy="300" rx="270" ry="96" fill="none" stroke="rgba(165,216,255,.26)" strokeWidth="1" transform="rotate(38 300 300)" />
        <g transform="rotate(38 300 300)">
          <circle cx="30" cy="300" r="3" fill="#60a5fa" />
        </g>
      </g>
    </svg>
  )
}

export default function Hero({ resume }: { resume: boolean }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 60])
  const fade = useTransform(scrollY, [0, 520], [1, reduce ? 1 : 0.25])
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 60, damping: 16 })
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 16 })

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 md:pb-24 md:pt-28"
      onPointerMove={(e) => {
        if (reduce || e.pointerType === 'touch') return
        mx.set(e.clientX / window.innerWidth - 0.5)
        my.set(e.clientY / window.innerHeight - 0.5)
      }}
    >
      {/* keeps the name readable over the brightest part of the aurora */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void/70 via-void/25 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />

      <div className="wrap relative grid items-center gap-12 md:grid-cols-12 md:gap-6">
        <div className="relative z-10 md:col-span-7">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="eyebrow mb-7 flex items-center gap-3 text-warm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-aurora" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aurora" />
            </span>
            2023 — 2027 · Open to SDE internships and roles
          </motion.p>

          <h1 className="name-3d text-[clamp(3.4rem,10.2vw,9rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            <span className="sr-only">Jaswinder Singh</span>
            <span aria-hidden="true">
              <Word text="Jaswinder" delay={0.25} />
              <Word text="Singh" delay={0.42} className="serif-i pl-[0.04em] font-normal tracking-[-0.03em] text-[#a5d8ff]" />
            </span>
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="mt-8 flex items-center gap-3"
          >
            <img src="/assets/iit-bhilai-logo.webp" width={36} height={36} alt="IIT Bhilai emblem" className="h-9 w-9 rounded-full ring-1 ring-line" />
            <p className="eyebrow leading-relaxed !text-silver">
              Computer Science &amp; Engineering
              <br />
              Indian Institute of Technology Bhilai
            </p>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease }}
            className="mt-7 max-w-xl text-[clamp(1.05rem,1.7vw,1.3rem)] leading-relaxed text-ink/85"
          >
            Exploring the intersection of algorithms, intelligent systems, and software engineering. I enjoy turning
            complex problems into things that work.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#work" className="btn btn-primary">
              Explore My Work <ArrowDown size={16} />
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className="btn bg-void/40 backdrop-blur-sm">
              <GithubIcon size={16} /> GitHub <ArrowUpRight size={14} className="opacity-60" />
            </a>
            {resume && (
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn bg-void/40 backdrop-blur-sm">
                <FileText size={16} /> Resume
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          style={{ y: photoY, opacity: fade, rotateX: rX, rotateY: rY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
          className="relative mx-auto w-full max-w-[300px] md:col-span-5 md:max-w-[520px]"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease }}
            className="relative aspect-square [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 [transform:translateZ(-50px)]"><Orbits /></div>
            <div
              className="absolute inset-[14%] overflow-hidden rounded-full border border-line [transform:translateZ(60px)]"
              style={{ boxShadow: '0 50px 90px -20px rgba(0,0,0,.9), 0 0 70px -30px rgba(96,165,250,.3)' }}
            >
              <img
                src="/assets/jaswinder.webp"
                srcSet="/assets/jaswinder-sm.webp 480w, /assets/jaswinder.webp 900w"
                sizes="(min-width: 768px) 420px, 260px"
                width={900}
                height={900}
                alt="Portrait of Jaswinder Singh"
                fetchPriority="high"
                className="h-full w-full scale-[1.12] object-cover object-[50%_28%]"
              />
            </div>
          </motion.div>
          <p className="eyebrow mt-3 hidden text-right md:block">Fig. 00 — the author</p>
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to About" className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-3 md:flex">
        <span className="eyebrow">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <span className="cue absolute inset-0 bg-warm" />
        </span>
      </a>
    </section>
  )
}
