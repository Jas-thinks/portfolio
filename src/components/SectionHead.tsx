import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function SectionHead({
  no,
  label,
  title,
  sub,
}: {
  no: string
  label: string
  title: ReactNode
  sub?: string
}) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="eyebrow mb-6 flex items-center gap-4">
        <span className="text-warm">{no}</span>
        <span className="h-px w-10 bg-line" />
        <span>{label}</span>
      </div>
      <h2 className="h-section max-w-3xl">{title}</h2>
      {sub && <p className="mt-5 max-w-xl text-silver">{sub}</p>}
    </Reveal>
  )
}
