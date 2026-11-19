import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="serif-i text-2xl leading-none">Beyond the code.</p>
          <p className="mt-2 text-sm text-dim">© {new Date().getFullYear()} {site.name} · IIT Bhilai, CSE</p>
          <p className="mt-1 text-xs text-dim/80">IIT Bhilai emblem: Wikimedia Commons, CC BY-SA 4.0. The emblem is a mark of IIT Bhilai.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-silver">
          <a className="link-u hover:text-ink" href={site.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="link-u hover:text-ink" href="https://codeforces.com/profile/jas.thinks" target="_blank" rel="noreferrer">Codeforces</a>
          <a className="link-u hover:text-ink" href="https://www.codechef.com/users/jasthinks" target="_blank" rel="noreferrer">CodeChef</a>
          <a className="link-u hover:text-ink" href="https://leetcode.com/u/Jas_thinks/" target="_blank" rel="noreferrer">LeetCode</a>
          <a className="link-u hover:text-ink" href={`mailto:${site.email}`}>Email</a>
          <a className="link-u hover:text-ink" href="#top">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  )
}
