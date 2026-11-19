# Jaswinder Singh — Portfolio

Personal portfolio of Jaswinder Singh, a Computer Science undergraduate at IIT Bhilai.

A single-page site with a continuously animated WebGL aurora background, an editorial layout, and case studies for six projects plus nine more in an archive. Project descriptions come from the actual repositories, including what is not finished.

## Stack
React 19 · TypeScript · Vite · Tailwind CSS 4 · Framer Motion · Lucide icons · hand-written WebGL fragment shader (no Three.js)

## Highlights
- **Aurora renderer** (`src/components/AuroraBackground.tsx`): a ray-marched, tri-noise volumetric shader rendered at reduced resolution. It adapts its resolution to frame time, pauses when the tab is hidden, falls back to CSS if WebGL is unavailable, and renders a single frame when the visitor prefers reduced motion.
- **3D tilt cards** (`Tilt.tsx`) with a moving highlight, disabled on touch and for reduced motion.
- **Accessible**: semantic landmarks, keyboard navigation, focus trapping in the case-study dialog, visible focus states.
- **Data-driven content** in `src/data/`: projects, courses and competitive-programming stats (a dated snapshot from public profile APIs).

## Run
```bash
npm install
npm run dev       # development
npm run build     # type-check and production build into dist/
```
Add a PDF at `public/resume.pdf` and the Resume buttons appear automatically.

## Credits
The IIT Bhilai emblem is from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Logo_IIT_Bhilai.png) (CC BY-SA 4.0) and remains a mark of IIT Bhilai.
