// The resume button appears only if a real PDF exists at /resume.pdf.
// Vite exposes everything in /public at runtime, so a HEAD request tells us whether the file was added.
import { useEffect, useState } from 'react'

export function useResume(): boolean {
  const [exists, setExists] = useState(false)
  useEffect(() => {
    let alive = true
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((r) => {
        const type = r.headers.get('content-type') ?? ''
        if (alive) setExists(r.ok && type.includes('pdf'))
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])
  return exists
}
