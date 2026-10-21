import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import LinkTreeModal from './components/LinkTreeModal';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import { useReducedMotion } from './hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef(null);
  const [isLinkTreeOpen, setIsLinkTreeOpen] = useState(false);

  const handleOpenContact = () => {
    setIsLinkTreeOpen(true);
  };

  useEffect(() => {
    // If user prefers reduced motion, disable Lenis and rely on standard browser scrolling
    if (prefersReduced) {
      ScrollTrigger.refresh();
      return;
    }

    // Initialize Lenis with documented GSAP ScrollTrigger synchronization
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll updates to GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Synchronize GSAP ticker with Lenis requestAnimationFrame
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial mount layout
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  return (
    <div className="portfolio-app-root">
      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Main Navigation Bar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Page Sections */}
      <main id="main-content">
        {/* Section 1: Typography-Led Hero Entrance */}
        <Hero onOpenContact={handleOpenContact} />

        {/* Section 2: Pinned Move It Showcase & Secondary Projects */}
        <Projects />

        {/* Section 3: Developer Identity & Ethos */}
        <About />

        {/* Section 4: Technical Competencies */}
        <Skills />
      </main>

      {/* Section 5: Cinematic Closing & Contact */}
      <Contact onOpenContact={handleOpenContact} />

      {/* Interactive LinkTree Modal (WhatsApp & Email hub) */}
      <LinkTreeModal
        isOpen={isLinkTreeOpen}
        onClose={() => setIsLinkTreeOpen(false)}
      />
    </div>
  );
}
