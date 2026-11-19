import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { codeforcesHistory as h, platforms } from '../data/cp'
import Reveal from './Reveal'
import Tilt from './Tilt'
import SectionHead from './SectionHead'

function RatingCurve() {
  const reduce = useReducedMotion()
  const W = 640
  const H = 260
  const pad = { l: 40, r: 16, t: 20, b: 26 }
  const min = 200
  const max = 1600
  const x = (i: number) => pad.l + (i / (h.length - 1)) * (W - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b)
  const d = h.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const peak = h.indexOf(Math.max(...h))
  const ticks = [400, 800, 1200, 1600]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Codeforces rating over ${h.length} rated contests, rising from ${h[0]} to a peak of ${h[peak]} and currently ${h[h.length - 1]}`}>
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#60a5fa" stopOpacity=".22" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="rgba(160,175,215,.09)" strokeDasharray="2 6" />
          <text x={pad.l - 8} y={y(t) + 3.5} textAnchor="end" className="fill-dim" style={{ font: '10px var(--font-mono)' }}>
            {t}
          </text>
        </g>
      ))}
      <path d={`${d} L${x(h.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`} fill="url(#area)" />
      <motion.path
        d={d}
        fill="none"
        stroke="#a5d8ff"
        strokeWidth="1.6"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <circle cx={x(peak)} cy={y(h[peak])} r="4" fill="#050816" stroke="#fff" strokeWidth="1.5" />
      <text x={x(peak) - 10} y={y(h[peak]) - 10} textAnchor="end" className="fill-ink" style={{ font: '11px var(--font-mono)' }}>
        peak {h[peak]}
      </text>
      <circle cx={x(h.length - 1)} cy={y(h[h.length - 1])} r="3" fill="#60a5fa" />
      <text x={x(h.length - 1)} y={y(h[h.length - 1]) + 18} textAnchor="end" className="fill-silver" style={{ font: '11px var(--font-mono)' }}>
        now {h[h.length - 1]}
      </text>
      <text x={pad.l} y={H - 6} className="fill-dim" style={{ font: '10px var(--font-mono)' }}>
        contest 1
      </text>
      <text x={W - pad.r} y={H - 6} textAnchor="end" className="fill-dim" style={{ font: '10px var(--font-mono)' }}>
        contest {h.length}
      </text>
    </svg>
  )
}

export default function CompetitiveProgramming() {
  return (
    <section id="cp" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHead
          no="04"
          label="Competitive programming"
          title={
            <>
              The problem-solving <span className="serif-i text-silver">log.</span>
            </>
          }
          sub="Practice that sharpens the fundamentals. The numbers are read from the public profiles, including the dips."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-line bg-[#080d1c]/80">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="ml-3 font-mono text-[0.72rem] text-dim">~/codeforces/jas.thinks · rating history</span>
              </div>
              <div className="p-4 md:p-6">
                <RatingCurve />
                <p className="mt-3 font-mono text-[0.72rem] leading-relaxed text-dim">
                  <span className="text-indigo">$</span> 47 rated contests. Climbed from 358 to a peak of 1448 (Specialist),
                  then eased back to 1065 over the latest contests. Still practising.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4 lg:col-span-5">
            {platforms.map((p, i) => (
              <Reveal key={p.id} delay={0.08 * i} className="flex-1">
                <Tilt className="h-full rounded-2xl" lift={26} max={8}>
                <a href={p.url} target="_blank" rel="noreferrer" className="card-edge group block h-full rounded-2xl border border-line bg-gradient-to-b from-[#0c1428]/95 to-[#080d1c]/95 p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] transition-colors hover:border-indigo/40" aria-label={`${p.name} profile ${p.handle} (opens in new tab)`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg tracking-tight">{p.name}</p>
                      <p className="font-mono text-[0.75rem] text-dim">@{p.handle}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </div>
                  <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                    {p.stats.map((s) => (
                      <div key={s.k}>
                        <dt className="eyebrow">{s.k}</dt>
                        <dd className="mt-1 text-2xl tracking-tight">{s.v}</dd>
                        {s.note && <p className="font-mono text-[0.68rem] text-dim">{s.note}</p>}
                      </div>
                    ))}
                  </dl>
                </a>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="mt-5 font-mono text-[0.7rem] text-dim">Snapshot taken 20 Nov 2026 from Codeforces API, LeetCode GraphQL and the CodeChef profile page.</p>
      </div>
    </section>
  )
}
