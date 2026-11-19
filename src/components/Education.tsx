import Reveal from './Reveal'
import Tilt from './Tilt'

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32">
      <div className="wrap">
        <Reveal>
          <Tilt className="rounded-3xl" max={4} lift={24}>
          <div className="card-edge relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-[#0c1428]/90 to-[#050816]/90 px-7 py-12 shadow-[0_40px_90px_-40px_rgba(0,0,0,.95)] md:px-16 md:py-16">
            <svg aria-hidden="true" viewBox="0 0 600 300" className="pointer-events-none absolute -right-20 -top-10 h-[130%] opacity-60" fill="none">
              <ellipse cx="420" cy="150" rx="260" ry="90" stroke="rgba(160,175,215,.15)" transform="rotate(-20 420 150)" />
              <ellipse cx="420" cy="150" rx="190" ry="60" stroke="rgba(160,175,215,.12)" transform="rotate(-20 420 150)" />
              <circle cx="640" cy="90" r="3" fill="#60a5fa" />
            </svg>
            <p className="eyebrow mb-8 flex items-center gap-4">
              <span className="text-warm">06</span>
              <span className="h-px w-10 bg-line" />
              Education
            </p>
            <div className="relative grid items-end gap-8 md:grid-cols-12">
              <div className="flex items-center gap-6 md:col-span-8">
                <img src="/assets/iit-bhilai-logo.webp" width={104} height={104} loading="lazy" alt="Emblem of the Indian Institute of Technology Bhilai" className="hidden h-[104px] w-[104px] shrink-0 rounded-full ring-1 ring-line sm:block" />
                <div>
                <h2 className="text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                  Indian Institute of <span className="serif-i text-silver">Technology Bhilai</span>
                </h2>
                <p className="mt-5 text-lg text-ink/90">B.Tech — Computer Science and Engineering</p>
                </div>
              </div>
              <p className="font-mono text-sm text-silver md:col-span-4 md:text-right">
                2023 <span className="mx-2 text-dim">——</span> 2027
              </p>
            </div>
          </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  )
}
