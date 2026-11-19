import Reveal from './Reveal'
import SectionHead from './SectionHead'

const interests = ['Algorithms', 'Systems', 'Compilers', 'Backend', 'ML and NLP', 'Security', 'Developer tools']

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="wrap">
        <SectionHead
          no="01"
          label="About"
          title={
            <>
              I like knowing what happens <span className="serif-i text-silver">beneath the surface.</span>
            </>
          }
        />
        <div className="grid gap-12 md:grid-cols-12">
          <div className="space-y-6 text-[1.08rem] leading-[1.75] text-silver md:col-span-7 md:text-[1.18rem]">
            <Reveal as="p">
              I'm a Computer Science student at IIT Bhilai. I came to software wanting to understand why things work, not
              only to make them work: what a compiler does with a program, what a database does with a query, what a model
              does with a poisoned example.
            </Reveal>
            <Reveal as="p" delay={0.08}>
              Most of my learning happens by building. A compiler I wanted to trust ended up with a fuzzer. A tutor that
              sounded too sure of itself ended up with a faithfulness checker. I like projects where theory and
              implementation have to agree, and where it is fine to write down what didn't work.
            </Reveal>
            <Reveal as="p" delay={0.16}>
              Right now I'm working toward becoming a stronger engineer and preparing for SDE roles and internships. More
              systems, more problems, more things shipped.
            </Reveal>
          </div>

          <Reveal delay={0.2} className="md:col-span-4 md:col-start-9">
            <div className="border-l border-line pl-6">
              <p className="eyebrow mb-5">Currently drawn to</p>
              <ul className="space-y-2.5 text-ink/90">
                {interests.map((i, n) => (
                  <li key={i} className="flex items-baseline gap-3">
                    <span className="eyebrow w-5">{String(n + 1).padStart(2, '0')}</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
