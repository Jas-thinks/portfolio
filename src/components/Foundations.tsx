import { useMemo, useState } from 'react'
import { groups, type Group } from '../data/courses'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

// Deterministic pseudo-random points so each group has its own stable "constellation".
function points(n: number, seed: number) {
  let s = seed * 9301 + 49297
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  const out: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1)
    out.push([14 + t * 172 + (rnd() - 0.5) * 18, 18 + rnd() * 84])
  }
  return out
}

function Constellation({ n, seed, hover }: { n: number; seed: number; hover: number | null }) {
  const pts = useMemo(() => points(n, seed), [n, seed])
  return (
    <svg viewBox="0 0 200 120" className="h-auto w-full max-w-[220px]" aria-hidden="true">
      {pts.slice(1).map((p, i) => (
        <line key={i} x1={pts[i][0]} y1={pts[i][1]} x2={p[0]} y2={p[1]} stroke="rgba(160,175,215,.22)" strokeWidth="0.8" />
      ))}
      {pts.map((p, i) => (
        <g key={i}>
          {hover === i && <circle cx={p[0]} cy={p[1]} r="9" fill="rgba(139,175,255,.18)" />}
          <circle cx={p[0]} cy={p[1]} r={hover === i ? 3.2 : 2} fill={hover === i ? '#fff' : '#b9c3ff'} style={{ transition: 'all .25s' }} />
        </g>
      ))}
    </svg>
  )
}

function GroupBlock({ g, i }: { g: Group; i: number }) {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <Reveal delay={0.05}>
      <div className="grid gap-8 border-t border-line py-9 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <p className="eyebrow mb-3 text-indigo">{String(i + 1).padStart(2, '0')} · {g.courses.length} {g.courses.length === 1 ? 'course' : 'courses'}</p>
          <h3 className="text-xl tracking-tight">{g.title}</h3>
          <p className="mt-2 max-w-xs text-sm text-silver">{g.blurb}</p>
          <div className="mt-6 hidden md:block">
            <Constellation n={g.courses.length} seed={i + 3} hover={hover} />
          </div>
        </div>
        <ul className={`md:col-span-8 ${g.courses.length > 4 ? 'md:columns-2 md:gap-10' : ''}`}>
          {g.courses.map((c, ci) => (
            <li
              key={c}
              onMouseEnter={() => setHover(ci)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(ci)}
              onBlur={() => setHover(null)}
              tabIndex={0}
              className="group flex break-inside-avoid items-baseline gap-4 border-b border-line/60 py-3.5 text-[1.02rem] text-silver outline-offset-2 transition-colors hover:text-ink focus-visible:text-ink"
            >
              <span className="font-mono text-[0.68rem] text-dim transition-colors group-hover:text-indigo">{String(ci + 1).padStart(2, '0')}</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export default function Foundations() {
  return (
    <section id="foundations" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHead
          no="05"
          label="The foundations"
          title={
            <>
              Built on computer science <span className="serif-i text-silver">fundamentals.</span>
            </>
          }
          sub="A foundation in the ideas behind the systems we build. Courses I have taken or am currently studying."
        />
        <div className="border-b border-line">
          {groups.map((g, i) => (
            <GroupBlock key={g.id} g={g} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
