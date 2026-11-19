export const site = {
  name: 'Jaswinder Singh',
  email: 'jaswinders@iitbhilai.ac.in',
  phone: '9855139699',
  phoneHref: 'tel:+919855139699',
  github: 'https://github.com/Jas-thinks',
  // LinkedIn URL is taken from the "Connect" section of the GitHub profile README (github.com/Jas-thinks).
  linkedin: 'https://www.linkedin.com/in/jaswinder-singh-968153300/',
  // Resume: drop the PDF at public/resume.pdf. The buttons render only when this is true.
  // Detected at build time (see vite-env / Resume check in lib/resume.ts).
}

export const nav = [
  { id: 'top', label: 'Home', short: 'Home' },
  { id: 'about', label: 'About', short: 'About' },
  { id: 'work', label: 'Projects', short: 'Projects' },
  { id: 'skills', label: 'Skills', short: 'Skills' },
  { id: 'cp', label: 'Competitive Programming', short: 'CP' },
  { id: 'education', label: 'Education', short: 'Education' },
  { id: 'contact', label: 'Contact', short: 'Contact' },
] as const
