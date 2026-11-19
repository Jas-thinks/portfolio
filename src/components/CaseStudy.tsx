import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data/projects'
import { GithubIcon } from './icons'
import Visual from './Visuals'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-6">
      <h3 className="eyebrow mb-3 text-indigo">{title}</h3>
      {children}
    </section>
  )
}

export default function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!project) return
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href],button')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[70] flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <button aria-label="Close case study" tabIndex={-1} className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cs-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-[640px] overflow-y-auto border-l border-line bg-[#080d1c] px-6 pb-16 pt-6 md:px-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="eyebrow">Case study · {project.index}</span>
              <button ref={closeRef} onClick={onClose} aria-label="Close" className="rounded-full border border-line p-2 text-silver transition-colors hover:text-ink">
                <X size={16} />
              </button>
            </div>
            <h2 id="cs-title" className="text-[2.2rem] font-medium leading-[1.05] tracking-[-0.03em]">{project.title}</h2>
            <p className="serif-i mt-2 text-xl text-silver">{project.kicker}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.72rem] text-dim">
              {project.role && <span>{project.role}</span>}
              <span>{project.status}</span>
            </div>

            <div className="my-8 aspect-[16/10] overflow-hidden rounded-xl border border-line bg-black/30 p-4">
              <Visual kind={project.visual} />
            </div>

            <Block title="The problem"><p className="text-silver leading-relaxed">{project.problem}</p></Block>
            <Block title="What I built">
              <ul className="space-y-2.5 text-silver">
                {project.built.map((b) => (<li key={b} className="flex gap-3 leading-relaxed"><span className="mt-2.5 h-px w-3 shrink-0 bg-indigo" />{b}</li>))}
              </ul>
            </Block>
            <Block title="What was interesting">
              <ul className="space-y-2.5 text-silver">
                {project.interesting.map((b) => (<li key={b} className="flex gap-3 leading-relaxed"><span className="mt-2.5 h-px w-3 shrink-0 bg-indigo" />{b}</li>))}
              </ul>
            </Block>
            <Block title="Where it falls short"><p className="text-silver leading-relaxed">{project.honest}</p></Block>
            <Block title="What to explore"><p className="text-silver leading-relaxed">{project.explore}</p></Block>
            <Block title="Stack">
              <p className="font-mono text-[0.78rem] leading-relaxed text-silver">{project.stack.join('  ·  ')}</p>
            </Block>

            <div className="mt-4">
              {project.repo ? (
                <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <GithubIcon size={16} /> View on GitHub <ArrowUpRight size={14} />
                </a>
              ) : (
                <p className="font-mono text-[0.75rem] text-dim">{project.repoNote}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
