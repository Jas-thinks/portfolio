import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react'
import { site } from '../data/site'
import { GithubIcon } from './icons'
import Reveal from './Reveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setFailed(false)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard API can be blocked (insecure context, permissions). Select the text and try the legacy path.
      const el = document.getElementById('email-text')
      let ok = false
      if (el) {
        const r = document.createRange()
        r.selectNodeContents(el)
        const s = window.getSelection()
        s?.removeAllRanges()
        s?.addRange(r)
        try {
          ok = document.execCommand('copy')
        } catch {
          ok = false
        }
      }
      setCopied(ok)
      setFailed(!ok)
      if (ok) setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-48">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(37,99,235,.18), transparent 62%)' }} />
      <svg aria-hidden="true" viewBox="0 0 1000 1000" className="orbit-spin pointer-events-none absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-60" style={{ ['--d' as string]: '200s' }} fill="none">
        <circle cx="500" cy="500" r="330" stroke="rgba(160,175,215,.09)" />
        <circle cx="500" cy="500" r="480" stroke="rgba(160,175,215,.07)" strokeDasharray="2 8" />
        <circle cx="830" cy="500" r="3.5" fill="#60a5fa" />
      </svg>

      <div className="wrap relative">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-4">
            <span className="text-warm">07</span>
            <span className="h-px w-10 bg-line" />
            Contact
          </p>
          <h2 className="max-w-4xl text-[clamp(2.4rem,7vw,5.8rem)] font-medium leading-[0.98] tracking-[-0.04em]">
            Always curious about <span className="serif-i text-[#a5d8ff]">what can be built next.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-silver">
            I'm looking for SDE internships and roles. If you're working on something interesting, or just want to talk
            about one of these projects, write to me.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          <div className="bg-void/80 p-7">
            <p className="eyebrow mb-4 flex items-center gap-2"><Mail size={14} /> Email</p>
            <a id="email-text" href={`mailto:${site.email}`} className="link-u break-all text-[1.05rem]">
              {site.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={`mailto:${site.email}`} className="btn btn-primary !px-4 !py-2 !text-[0.82rem]">Write to me</a>
              <button onClick={copy} className="btn !px-4 !py-2 !text-[0.82rem]" aria-live="polite">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : failed ? 'Press Ctrl+C' : 'Copy email'}
              </button>
            </div>
          </div>
          <div className="bg-void/80 p-7">
            <p className="eyebrow mb-4 flex items-center gap-2"><Phone size={14} /> Phone</p>
            <a href={site.phoneHref} className="link-u text-[1.05rem]">+91 {site.phone}</a>
            <p className="mt-5 text-sm text-dim">India (IST)</p>
          </div>
          <div className="bg-void/80 p-7">
            <p className="eyebrow mb-4 flex items-center gap-2"><GithubIcon size={14} /> GitHub</p>
            <a href={site.github} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-1 text-[1.05rem]">
              github.com/Jas-thinks <ArrowUpRight size={16} />
            </a>
            <p className="mt-5 text-sm text-dim">
              Also on{' '}
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-u text-silver">LinkedIn</a>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
