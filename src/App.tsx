import BackgroundEffects from './components/BackgroundEffects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import CompetitiveProgramming from './components/CompetitiveProgramming'
import Foundations from './components/Foundations'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useResume } from './lib/resume'

export default function App() {
  const resume = useResume()
  return (
    <>
      <a href="#about" className="skip">Skip to content</a>
      <BackgroundEffects />
      <div className="grain" aria-hidden="true" />
      <Navbar resume={resume} />
      <main>
        <Hero resume={resume} />
        <About />
        <Work />
        <Skills />
        <CompetitiveProgramming />
        <Foundations />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
