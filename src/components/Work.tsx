import { useCallback, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import Archive from './Archive'
import Tilt from './Tilt'
import CaseStudy from './CaseStudy'
import { GithubIcon } from './icons'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import Visual from './Visuals'

type Open = (p: Project) => void

function Meta({ p, open, large }: { p: Project; open: Open; large?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <div className="eyebrow mb-5 flex items-center gap-3">
        <span className="text-indigo">{p.index}</span>
        <span className="h-px w-8 bg-line" />
        <span>{p.status}</span>
      </div>
      <h3 className={`font-medium leading-[1.02] tracking-[-0.035em] ${large ? 'text-[clamp(2.4rem,5vw,4.2rem)]' : 'text-[clamp(1.7rem,3vw,2.3rem)]'}`}>{p.title}</h3>
      <p className="serif-i mt-3 text-[1.25rem] leading-snug text-silver">{p.kicker}</p>
      <p className="mt-5 max-w-md leading-relaxed text-silver">{p.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[0.72rem] text-dim" aria-label="Technologies">
        {p.stack.map((s) => (<li key={s}>{s}</li>))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button onClick={() => open(p)} className="btn btn-primary !py-2.5" aria-haspopup="dialog">
          Case study <ArrowUpRight size={15} />
        </button>
        {p.repo ? (
          <a href={p.repo} target="_blank" rel="noreferrer" className="btn !py-2.5" aria-label={`${p.title} on GitHub (opens in new tab)`}>
            <GithubIcon size={15} /> Code
          </a>
        ) : (
          <span className="font-mono text-[0.72rem] text-dim">Private repository</span>
        )}
      </div>
    </div>
  )
}

function Frame({ p, className }: { p: Project; className?: string }) {
  return (
    <Tilt className={`shrink-0 rounded-2xl ${className ?? ''}`} lift={30}>
    <div className="card-edge group relative h-full w-full overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#0c1428]/90 to-[#080d1c]/95 p-5 shadow-[0_40px_80px_-35px_rgba(10,14,40,.5)] transition-colors duration-500 hover:border-indigo/40 md:p-7">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: 'radial-gradient(600px 300px at 50% 0%, rgba(91,108,255,.10), transparent 70%)' }} />
      <div className="relative h-full w-full">
        <Visual kind={p.visual} />
      </div>
    </div>
    </Tilt>
  )
}

export default function Work() {
  const [sel, setSel] = useState<Project | null>(null)
  const open: Open = useCallback((p) => setSel(p), [])
  const close = useCallback(() => setSel(null), [])
  const [nexora, nova, qubitx, backdoor, gearbox, pond] = projects

  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="wrap">
        <SectionHead
          no="02"
          label="Selected work"
          title={
            <>
              Systems I built to <span className="serif-i text-silver">understand systems.</span>
            </>
          }
          sub="Six deep dives with case studies that include what is not done, then everything else on my GitHub: fifteen projects in all."
        />

        {/* 01 featured */}
        <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14" aria-label={nexora.title}>
          <Reveal className="lg:col-span-7"><Frame p={nexora} className="aspect-[16/10]" /></Reveal>
          <Reveal delay={0.1} className="lg:col-span-5"><Meta p={nexora} open={open} large /></Reveal>
        </article>

        <div className="hairline my-20 md:my-28" />

        {/* 02 reversed, real screenshots */}
        <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14" aria-label={nova.title}>
          <Reveal className="lg:order-2 lg:col-span-7">
            <div className="relative aspect-[16/11]"><Visual kind="nova" /></div>
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1 lg:col-span-5"><Meta p={nova} open={open} large /></Reveal>
        </article>

        <div className="hairline my-20 md:my-28" />

        {/* 03 + 04 medium */}
        <div className="grid gap-16 md:grid-cols-2 md:gap-10">
          {[qubitx, backdoor].map((p) => (
            <Reveal key={p.id}>
              <article aria-label={p.title} className="flex h-full flex-col gap-8">
                <Frame p={p} className="aspect-[16/11]" />
                <Meta p={p} open={open} />
              </article>
            </Reveal>
          ))}
        </div>

        <div className="hairline my-20 md:my-28" />

        {/* 05 + 06 compact */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-10">
          {[gearbox, pond].map((p) => (
            <Reveal key={p.id}>
              <article aria-label={p.title} className="flex h-full flex-col gap-7">
                <Frame p={p} className="aspect-[16/9]" />
                <Meta p={p} open={open} />
              </article>
            </Reveal>
          ))}
        </div>

        <Archive />
      </div>
      <CaseStudy project={sel} onClose={close} />
    </section>
  )
}
