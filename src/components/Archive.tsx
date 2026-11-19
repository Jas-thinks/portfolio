import { useMemo } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { archive, type ArchiveItem } from '../data/projects'
import { GithubIcon } from './icons'
import Reveal from './Reveal'
import Tilt from './Tilt'

// A small deterministic constellation per card, purely decorative.
function Sky({ seed }: { seed: number }) {
  const pts = useMemo(() => {
    let s = seed * 7919 + 13
    const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
    return Array.from({ length: 7 }, () => [10 + r() * 180, 8 + r() * 64] as [number, number])
  }, [seed])
  return (
    <svg viewBox="0 0 200 80" className="h-16 w-full" aria-hidden="true">
      {pts.slice(1).map((p, i) => (
        <line key={i} x1={pts[i][0]} y1={pts[i][1]} x2={p[0]} y2={p[1]} stroke="rgba(160,175,215,.25)" strokeWidth=".7" />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i % 3 === 0 ? 2.4 : 1.4} fill={i % 3 === 0 ? '#fff' : '#a9b6ff'} />
      ))}
    </svg>
  )
}

function Card({ a, i }: { a: ArchiveItem; i: number }) {
  return (
    <Reveal delay={(i % 3) * 0.07}>
      <Tilt className="h-full rounded-2xl" lift={26}>
        <a
          href={a.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${a.title} on GitHub (opens in new tab)`}
          className="card-edge group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-[#0c1428]/90 to-[#080d1c]/95 p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] transition-colors hover:border-indigo/40"
        >
          <div className="flex items-start justify-between">
            <span className="eyebrow">{String(i + 7).padStart(2, '0')}</span>
            <ArrowUpRight size={18} className="text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
          </div>
          <Sky seed={i + 2} />
          <h4 className="mt-2 text-xl tracking-tight">{a.title}</h4>
          <p className="serif-i mt-1 text-[1.02rem] text-silver">{a.kind}</p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-silver">{a.note}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] text-dim">
            {a.stack.map((s) => (<span key={s}>{s}</span>))}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-silver"><GithubIcon size={13} /> {a.team ? 'team repo' : 'source'}</span>
        </a>
      </Tilt>
    </Reveal>
  )
}

export default function Archive() {
  return (
    <div className="mt-28">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="eyebrow mb-3 text-indigo">The rest of the universe</p>
            <h3 className="text-3xl tracking-tight md:text-4xl">Everything else <span className="serif-i text-silver">I've built.</span></h3>
          </div>
          <a href="https://github.com/Jas-thinks?tab=repositories" target="_blank" rel="noreferrer" className="link-u font-mono text-[0.75rem] text-silver">All repositories ↗</a>
        </div>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {archive.map((a, i) => (<Card key={a.title} a={a} i={i} />))}
      </div>
    </div>
  )
}
