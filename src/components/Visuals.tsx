import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { VisualKind } from '../data/projects'

const mono = { font: '14px var(--font-mono)' } as const
const sub = { font: '11.5px var(--font-mono)' } as const
const cap = { font: '12px var(--font-mono)' } as const
const stroke = 'rgba(160,175,215,.35)'

function Box({ x, y, w, h, label, note, hot }: { x: number; y: number; w: number; h: number; label: string; note?: string; hot?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={hot ? 'rgba(139,175,255,.12)' : 'rgba(255,255,255,.02)'} stroke={hot ? 'rgba(160,175,255,.65)' : stroke} />
      <text x={x + w / 2} y={y + h / 2 + (note ? -2 : 5)} textAnchor="middle" className="fill-ink" style={mono}>{label}</text>
      {note && <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" className="fill-dim" style={sub}>{note}</text>}
    </g>
  )
}
function Flow({ d }: { d: string }) {
  return (
    <g fill="none">
      <path d={d} stroke="rgba(160,175,215,.28)" />
      <path d={d} stroke="#60a5fa" strokeWidth="1.4" strokeDasharray="3 14" className="flow" />
    </g>
  )
}
const FlowCss = () => (
  <style>{`.flow{animation:dash 2.4s linear infinite}@keyframes dash{to{stroke-dashoffset:-34}}@media (prefers-reduced-motion:reduce){.flow{animation:none}}`}</style>
)

function Nexora() {
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" role="img" aria-label="Nexora architecture: browser, TLS proxy and load balancer in front of two web replicas and three API replicas, backed by Redis, Postgres with pgvector and a code executor with sandbox containers, plus a background worker.">
      <FlowCss />
      <Flow d="M84 175 H112" /><Flow d="M208 175 H236" />
      <Flow d="M332 175 C352 175 352 72 372 72" /><Flow d="M332 175 H372" />
      <Flow d="M422 104 V146" />
      <Flow d="M472 166 C506 166 506 52 540 52" /><Flow d="M472 175 C506 175 506 148 540 148" /><Flow d="M472 184 C506 184 506 244 540 244" />
      <Flow d="M472 328 C520 328 520 164 540 164" />
      <Box x={0} y={150} w={84} h={50} label="Browser" />
      <Box x={112} y={150} w={96} h={50} label="Caddy TLS" />
      <Box x={236} y={150} w={96} h={50} label="nginx LB" hot />
      <Box x={372} y={40} w={100} h={64} label="web ×2" note="Next.js" />
      <Box x={372} y={146} w={100} h={64} label="api ×3" note="FastAPI" hot />
      <Box x={372} y={296} w={100} h={64} label="worker" note="job queue" />
      <Box x={540} y={20} w={100} h={64} label="Redis" note="cache · limits" />
      <Box x={540} y={116} w={100} h={64} label="Postgres" note="+ pgvector" />
      <Box x={540} y={212} w={100} h={64} label="executor" note="sandboxes" />
      <text x={0} y={392} className="fill-dim" style={cap}>CI/CD → GHCR images → smoke test → rollback</text>
    </svg>
  )
}

function QubitX() {
  const stages = ['intent', 'retrieve', 'rerank', 'answer', 'NLI check']
  const metrics = [
    ['MRR@10', 0.796, 'hybrid + rerank · 104 questions'],
    ['Recall@5', 0.873, 'hybrid + rerank'],
    ['Intent macro-F1', 0.963, 'cascade · 80 hand-written messages'],
    ['Out-of-scope decline F1', 0.98, 'cross-encoder gate'],
  ] as const
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" role="img" aria-label="QubitX NLP pipeline stages and measured retrieval and intent metrics.">
      <FlowCss />
      {stages.map((s, i) => (
        <g key={s}>
          <Box x={i * 134} y={6} w={106} h={44} label={s} hot={i === 4} />
          {i < stages.length - 1 && <Flow d={`M${i * 134 + 106} 28 H${(i + 1) * 134}`} />}
        </g>
      ))}
      <text x={0} y={92} className="fill-dim" style={cap}>MEASURED · eval/results/REPORT.md</text>
      {metrics.map(([k, v, n], i) => (
        <g key={k} transform={`translate(0 ${126 + i * 70})`}>
          <text x={0} y={0} className="fill-silver" style={mono}>{k}</text>
          <text x={640} y={0} textAnchor="end" className="fill-ink" style={{ font: '17px var(--font-mono)' }}>{v.toFixed(3)}</text>
          <rect x={0} y={12} width={640} height={4} rx={2} fill="rgba(255,255,255,.07)" />
          <motion.rect x={0} y={12} height={4} rx={2} fill="#60a5fa" initial={{ width: 0 }} whileInView={{ width: 640 * v }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }} />
          <text x={0} y={34} className="fill-dim" style={sub}>{n}</text>
        </g>
      ))}
    </svg>
  )
}

function Backdoor() {
  const asr = [['5%', 65.38], ['10%', 75.72], ['20%', 97.84]] as const
  const det = [['Spectral signature', 4.57], ['OAS Mahalanobis', 21.63]] as const
  const bh = 150
  const steps = ['clean data', 'add trigger', 'train victim', 'measure ASR', 'run detectors']
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" role="img" aria-label="Backdoor attack success on CodeT5 at 5, 10 and 20 percent poison budgets was 65.4, 75.7 and 97.8 percent. On UniXcoder the two detectors recovered 4.6 and 21.6 percent of triggered inputs.">
      <text x={0} y={14} className="fill-dim" style={cap}>CodeT5 · ATTACK SUCCESS</text>
      <text x={0} y={30} className="fill-dim" style={cap}>by poison budget</text>
      {asr.map(([k, v], i) => {
        const h = (v / 100) * bh
        return (
          <g key={k} transform={`translate(${i * 112 + 4} 0)`}>
            <motion.rect x={0} width={78} rx={3} fill={i === 2 ? '#60a5fa' : 'rgba(141,155,255,.45)'} initial={{ y: 232, height: 0 }} whileInView={{ y: 232 - h, height: h }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} />
            <text x={39} y={232 - h - 8} textAnchor="middle" className="fill-ink" style={{ font: '14px var(--font-mono)' }}>{v.toFixed(1)}%</text>
            <text x={39} y={254} textAnchor="middle" className="fill-dim" style={mono}>{k}</text>
          </g>
        )
      })}
      <line x1={0} x2={350} y1={232} y2={232} stroke={stroke} />
      <text x={394} y={14} className="fill-dim" style={cap}>UniXcoder · DETECTOR</text>
      <text x={394} y={30} className="fill-dim" style={cap}>recall of triggered inputs</text>
      {det.map(([k, v], i) => (
        <g key={k} transform={`translate(394 ${76 + i * 64})`}>
          <text x={0} y={0} className="fill-silver" style={mono}>{k}</text>
          <text x={246} y={0} textAnchor="end" className="fill-ink" style={mono}>{v.toFixed(2)}%</text>
          <rect x={0} y={12} width={246} height={4} rx={2} fill="rgba(255,255,255,.07)" />
          <motion.rect x={0} y={12} height={4} rx={2} fill="#a5d8ff" initial={{ width: 0 }} whileInView={{ width: 2.46 * v }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + i * 0.12 }} />
        </g>
      ))}
      <text x={394} y={212} className="fill-silver" style={sub}>Detection was the hard part.</text>
      <text x={394} y={230} className="fill-dim" style={sub}>Single seed, one test set.</text>
      {steps.map((s, i) => (
        <g key={s}>
          <text x={i * 130} y={350} className="fill-silver" style={cap}>{s}</text>
          {i < 4 && <text x={i * 130 + 100} y={350} className="fill-dim" style={cap}>→</text>}
        </g>
      ))}
      <line x1={0} x2={640} y1={316} y2={316} stroke="rgba(160,175,215,.15)" strokeDasharray="3 5" />
    </svg>
  )
}

function Gearbox() {
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" role="img" aria-label="Gearbox booking flow: client request with idempotency key, API, Postgres with an exclusion constraint, outbox, relay, SQS with dead-letter queue, and workers.">
      <FlowCss />
      <Flow d="M96 52 H132" /><Flow d="M236 52 H272" /><Flow d="M376 52 H412" /><Flow d="M516 52 H540" />
      <Box x={0} y={24} w={96} h={56} label="Client" note="Idem. key" />
      <Box x={132} y={24} w={104} h={56} label="API" note="rate-limited" />
      <Box x={272} y={24} w={104} h={56} label="Postgres" note="no overlap" hot />
      <Box x={412} y={24} w={104} h={56} label="outbox" note="same txn" />
      <Box x={540} y={24} w={100} h={56} label="relay" note="SKIP LOCKED" />
      <Flow d="M590 80 V150 H516" />
      <Box x={412} y={122} w={104} h={56} label="SQS" hot />
      <Flow d="M412 150 H376" /><Flow d="M464 178 V212" />
      <Box x={272} y={122} w={104} h={56} label="workers" note="autoscaled" />
      <Box x={412} y={212} w={104} h={56} label="DLQ" note="+ alarm" />
      <text x={0} y={310} className="fill-dim" style={cap}>GUARANTEES</text>
      {['EXCLUDE USING gist (equipment, daterange)', 'Redis claim + unique idempotency key', 'outbox row commits with the booking'].map((s, i) => (
        <text key={s} x={0} y={338 + i * 22} className="fill-silver" style={cap}>— {s}</text>
      ))}
    </svg>
  )
}

function Pond() {
  const rings = [0, 1, 2, 3, 4, 5, 6].map((i) => (
    <ellipse key={i} cx={330 + i * 4} cy={190 - i * 3} rx={70 + i * 38} ry={40 + i * 24} fill="none" stroke={`rgba(160,175,215,${0.1 + (6 - i) * 0.035})`} transform={`rotate(${-14 + i * 3} 330 190)`} />
  ))
  const sites: [number, number, string][] = [[318, 196, '1'], [446, 150, '2'], [220, 242, '3']]
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" role="img" aria-label="Illustration of the pond-planning pipeline: terrain contours with flow converging on three ranked candidate sites. Illustrative, not real output.">
      <FlowCss />
      {rings}
      <Flow d="M120 80 C 210 120, 250 170, 318 196" />
      <Flow d="M560 90 C 500 110, 470 130, 446 150" />
      <Flow d="M90 330 C 140 290, 180 262, 220 242" />
      {sites.map(([x, y, n]) => (
        <g key={n}>
          <circle cx={x} cy={y} r="15" fill="rgba(139,175,255,.16)" stroke="#60a5fa" />
          <text x={x} y={y + 5} textAnchor="middle" className="fill-ink" style={mono}>{n}</text>
        </g>
      ))}
      <text x={0} y={384} className="fill-dim" style={cap}>fill sinks → D8 flow → catchments → exclusions → TOPSIS</text>
      <text x={640} y={16} textAnchor="end" className="fill-dim" style={cap}>ILLUSTRATION, NOT OUTPUT</text>
    </svg>
  )
}

function Nova() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 })
  return (
    <div
      className="relative h-full w-full [perspective:1400px]"
      onMouseMove={(e) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="absolute inset-0">
        <div className="absolute left-0 top-[4%] w-[88%] overflow-hidden rounded-xl border border-line shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)]">
          <img src="/projects/nova-optimizer.webp" alt="NOVA studio: Optimization Laboratory showing per-pass transformation counts, before and after IR size, and verified preserved semantics." loading="lazy" width={1400} height={875} className="block w-full" />
        </div>
        <div className="absolute bottom-[2%] right-0 w-[56%] overflow-hidden rounded-xl border border-line shadow-[0_30px_80px_-20px_rgba(0,0,0,.95)] [transform:translateZ(60px)]">
          <img src="/projects/nova-playground.webp" alt="NOVA compiler playground with source editor and program output." loading="lazy" width={1400} height={875} className="block w-full" />
        </div>
      </motion.div>
    </div>
  )
}

export default function Visual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case 'nexora': return <Nexora />
    case 'nova': return <Nova />
    case 'qubitx': return <QubitX />
    case 'backdoor': return <Backdoor />
    case 'gearbox': return <Gearbox />
    case 'pond': return <Pond />
  }
}
