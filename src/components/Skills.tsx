import Reveal from './Reveal'
import Tilt from './Tilt'
import SectionHead from './SectionHead'

// Each line is tied to a project where it was actually used.
const map = [
  {
    title: 'Languages',
    items: [
      ['C++', 'NOVA compiler'],
      ['Python', 'Nexora, QubitX, research'],
      ['TypeScript / JavaScript', 'Gearbox, web frontends'],
      ['SQL', 'NOVA-SQL, Postgres'],
    ],
  },
  {
    title: 'Backend & tooling',
    items: [
      ['FastAPI, REST APIs', 'Nexora, QubitX, NOVA'],
      ['PostgreSQL, Redis', 'Nexora, Gearbox'],
      ['Docker, GitHub Actions', 'CI/CD, rollbacks'],
      ['Git, Linux', 'daily'],
      ['Testing', 'pytest, fuzzing, differential tests'],
    ],
  },
  {
    title: 'AI / ML',
    items: [
      ['PyTorch, Transformers', 'QubitX, backdoor study'],
      ['NLP', 'retrieval, NLI, NER, text-to-circuit'],
      ['Training & evaluation', 'baselines and ablations'],
      ['Dataset processing', 'code corpora, poisoned sets'],
    ],
  },
  {
    title: 'Computer science',
    items: [
      ['Data structures & algorithms', 'competitive programming'],
      ['Compiler design', 'LR(1), SSA, optimization'],
      ['Operating systems, networks', 'coursework'],
      ['Distributed-systems patterns', 'outbox, idempotency'],
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHead
          no="03"
          label="Engineering"
          title={
            <>
              A map of what I work with, <span className="serif-i text-silver">and where I used it.</span>
            </>
          }
          sub="Not a list of badges. Each line points at something I built with it."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {map.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.07}>
              <Tilt className="h-full rounded-2xl" lift={30}>
              <div className="card-edge h-full rounded-2xl border border-line bg-gradient-to-b from-[#0c1428]/95 to-[#080d1c]/95 p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] md:p-8">
              <p className="eyebrow mb-7 text-indigo">{g.title}</p>
              <ul className="space-y-5">
                {g.items.map(([name, where]) => (
                  <li key={name}>
                    <p className="text-[1.02rem] tracking-tight">{name}</p>
                    <p className="mt-0.5 font-mono text-[0.72rem] text-dim">{where}</p>
                  </li>
                ))}
              </ul>
              </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
