import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, site } from '../data/site'
import { GithubIcon } from './icons'

export default function Navbar({ resume }: { resume: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (window.scrollY < 200) setActive('top')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6"
    >
      <div
        className={`mx-auto flex h-12 max-w-[1100px] items-center justify-between rounded-full border px-3 pl-5 transition-all duration-500 ${
          open ? 'border-line bg-void' : scrolled ? 'border-line bg-void/60 backdrop-blur-md' : 'border-white/[0.07] bg-void/25 backdrop-blur-sm'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Jaswinder Singh, back to top">
          <span className="serif-i text-2xl leading-none">J</span>
          <span className="hidden text-sm tracking-tight text-silver lg:inline">Jaswinder Singh</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? 'true' : undefined}
              className={`relative rounded-full px-3 py-1.5 text-[0.8rem] transition-colors ${
                active === n.id ? 'text-ink' : 'text-silver hover:text-ink'
              }`}
            >
              <span className="hidden xl:inline">{n.label}</span>
              <span className="xl:hidden">{n.short}</span>
              {active === n.id && (
                <motion.span layoutId="nav-dot" className="absolute left-1/2 top-full h-1 w-1 -translate-x-1/2 rounded-full bg-indigo" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in new tab)" className="rounded-full p-2 text-silver transition-colors hover:text-ink">
            <GithubIcon size={18} />
          </a>
          {resume && (
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hidden rounded-full border border-line px-3.5 py-1.5 text-[0.82rem] transition-colors hover:border-indigo/50 sm:inline-block">
              Resume
            </a>
          )}
          <button
            className="rounded-full p-2 text-silver hover:text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4.5rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-[1100px] overflow-hidden rounded-3xl border border-line bg-void md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-1 px-6 pb-16">
              {nav.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-line py-3.5 text-2xl tracking-tight">
                    <span className="eyebrow w-6">{String(i + 1).padStart(2, '0')}</span>
                    {n.label}
                  </a>
                </motion.li>
              ))}
              {resume && (
                <li className="pt-6">
                  <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
                    Resume
                  </a>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
