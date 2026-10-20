import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, Sparkles, Code2, Smartphone, Zap, Layers } from 'lucide-react';
import Button from '../components/Button';
import { PERSONAL_INFO } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const DISCIPLINES = [
  { num: '01', title: 'Frontend Architecture', detail: 'React, Next.js & Modern ES' },
  { num: '02', title: 'Mobile Development', detail: 'React Native & Expo Ecosystem' },
  { num: '03', title: 'Interaction & Motion', detail: 'GSAP, Spatial UI & Feedback' },
  { num: '04', title: 'System Performance', detail: 'Accessible, Fast & Resilient' },
];

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const metaRef = useRef(null);
  const ctaRef = useRef(null);
  const portraitRef = useRef(null);
  const portraitGlowRef = useRef(null);
  const disciplinesRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 320px)', () => {
        const headlineLines = headlineRef.current?.querySelectorAll('.hero-headline-line');
        const metaElements = metaRef.current?.children;
        const ctaButtons = ctaRef.current?.children;
        const disciplineItems = disciplinesRef.current?.children;

        // Stage A: Initial hidden states
        gsap.set(headlineLines, { yPercent: 110, opacity: 0 });
        gsap.set(metaElements, { y: 20, opacity: 0 });
        gsap.set(subtextRef.current, { y: 24, opacity: 0 });
        gsap.set(ctaButtons, { y: 20, opacity: 0 });
        // [PORTRAIT TEMPLATE - UNCOMMENT TO RESTORE PORTRAIT ANIMATION]
        // if (portraitRef.current) gsap.set(portraitRef.current, { y: 40, opacity: 0, scale: 0.94 });
        // if (portraitGlowRef.current) gsap.set(portraitGlowRef.current, { scale: 0.7, opacity: 0, xPercent: -50, yPercent: -50 });
        gsap.set(disciplineItems, { y: 20, opacity: 0 });
        if (scrollIndicatorRef.current) {
          gsap.set(scrollIndicatorRef.current, { opacity: 0, y: -10 });
        }

        // Stage B: Coordinated Entrance
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          delay: 0.15,
        });

        // 1. Headline reveals through clipping masks
        tl.to(
          headlineLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.12,
            ease: 'power4.out',
          },
          0.1
        );

        // [PORTRAIT ENTRANCE TEMPLATE - UNCOMMENT TO RESTORE PORTRAIT ENTRANCE]
        // if (portraitGlowRef.current) {
        //   tl.to(portraitGlowRef.current, { scale: 1, opacity: 1, xPercent: -50, yPercent: -50, duration: 1.2, ease: 'power2.out' }, 0);
        // }
        // if (portraitRef.current) {
        //   tl.to(portraitRef.current, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }, 0.1);
        // }

        // 2. Metadata, manifesto, and CTAs stagger in
        tl.to(
          metaElements,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
          },
          0.3
        )
          .to(
            subtextRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            0.5
          )
          .to(
            ctaButtons,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
            },
            0.6
          )
          // 4. Bottom discipline columns
          .to(
            disciplineItems,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
            },
            0.7
          );

        if (scrollIndicatorRef.current) {
          tl.to(
            scrollIndicatorRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
            },
            0.8
          );
        }

        // Stage D: Scroll-linked transition into the Project Showcase
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // [PORTRAIT SCROLL TEMPLATE - UNCOMMENT TO RESTORE PORTRAIT SCROLL]
        // if (portraitRef.current) {
        //   scrollTl.to(portraitRef.current, { y: 80, scale: 0.95, opacity: 0.25, ease: 'none' }, 0);
        // }

        scrollTl
          .to(
            headlineRef.current,
            {
              y: -80,
              opacity: 0.2,
              scale: 0.96,
              ease: 'none',
            },
            0
          )
          .to(
            subtextRef.current,
            {
              y: -50,
              opacity: 0,
              ease: 'none',
            },
            0
          )
          .to(
            ctaRef.current,
            {
              y: -40,
              opacity: 0,
              ease: 'none',
            },
            0
          )
          .to(
            disciplinesRef.current,
            {
              y: -30,
              opacity: 0,
              ease: 'none',
            },
            0
          );

        if (scrollIndicatorRef.current) {
          scrollTl.to(
            scrollIndicatorRef.current,
            {
              opacity: 0,
              ease: 'none',
            },
            0
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  );

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="section-full hero-cinematic-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'calc(var(--header-height) + 1.25rem)',
        paddingBottom: '2.5rem',
        overflow: 'hidden',
        backgroundColor: '#070709',
      }}
    >
      {/* 1. ATMOSPHERIC BACKDROP & FIERY AMBER GLOW (Warm studio atmosphere) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 38%, rgba(220, 38, 38, 0.42) 0%, rgba(234, 88, 12, 0.25) 32%, rgba(249, 115, 22, 0.08) 60%, transparent 84%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. FOREGROUND CONTENT CONTAINER */}
      <div
        className="container hero-container"
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        {/* Top Eyebrow / Identity Header */}
        <div
          ref={metaRef}
          className="hero-eyebrow-bar"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.85rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 10px var(--accent)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
                fontWeight: '600',
              }}
            >
              {PERSONAL_INFO.name}
            </span>
            <span style={{ color: 'var(--text-dim)' }}>—</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}
            >
              {PERSONAL_INFO.role}
            </span>
          </div>

          <div className="tag tag-accent">
            <span className="dot" />
            <span>{PERSONAL_INFO.status}</span>
          </div>
        </div>

        {/* ======================================================================
            HERO MAIN COMPOSITION
            Desktop: Left Headline + Centered Background Portrait + Right Manifesto
            Tablet: 2-Column Grid (Left: Headline & Manifesto, Right: Portrait Showcase)
            Mobile: Single Column (Headline -> Centered Portrait Centerpiece -> Manifesto & CTAs)
            ====================================================================== */}
        <div className="hero-editorial-overlay">
          {/* Left Column: Oversized Headline */}
          <div ref={headlineRef} className="hero-headline-column">
            <div style={{ marginBottom: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  textShadow: '0 2px 8px rgba(0,0,0,0.85)',
                }}
              >
                // Hey, I&apos;m Obanijesu
              </span>
            </div>

            <div className="text-mask-wrapper">
              <h1
                className="hero-headline-line hero-title-word"
                style={{
                  fontSize: 'clamp(2.4rem, 5.8vw, 5.8rem)',
                  fontWeight: '800',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  textShadow: '0 4px 24px rgba(0, 0, 0, 0.95)',
                }}
              >
                BUILDING
              </h1>
            </div>

            <div className="text-mask-wrapper">
              <h1
                className="hero-headline-line hero-title-word"
                style={{
                  fontSize: 'clamp(2.4rem, 5.8vw, 5.8rem)',
                  fontWeight: '800',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(245, 245, 247, 0.95)',
                  textShadow: '0 4px 24px rgba(0, 0, 0, 0.95)',
                }}
              >
                DIGITAL
              </h1>
            </div>

            <div className="text-mask-wrapper">
              <span style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
                <h1
                  className="hero-headline-line hero-title-word"
                  style={{
                    fontSize: 'clamp(2.4rem, 5.8vw, 5.8rem)',
                    fontWeight: '800',
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    display: 'inline-block',
                    textShadow: '0 4px 24px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  EXPERIENCES
                </h1>
                <span
                  className="hero-headline-line hero-title-word"
                  style={{
                    fontSize: 'clamp(2.4rem, 5.8vw, 5.8rem)',
                    fontWeight: '800',
                    color: 'var(--accent)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    display: 'inline-block',
                    textShadow: '0 0 25px var(--accent)',
                  }}
                >
                  .
                </span>
              </span>
            </div>
          </div>

          {/* ======================================================================
              [PORTRAIT TEMPLATE - COMMENTED OUT]
              Uncomment the block below whenever you wish to restore the studio
              portrait and radiant halo. All CSS rules & GSAP templates are preserved.
              ====================================================================== */}
          {/*
          <div ref={portraitRef} className="hero-portrait-stage">
            <div ref={portraitGlowRef} className="hero-portrait-glow" />
            <img
              src="/portrait.png"
              alt={PERSONAL_INFO.name}
              className="hero-portrait-img"
            />
          </div>
          */}

          {/* Right Column: Supporting Manifesto & CTAs */}
          <div className="hero-manifesto-column">
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.35rem, 1.8vw, 1.75rem)',
                  fontWeight: '700',
                  lineHeight: 1.25,
                  letterSpacing: '-0.025em',
                  color: 'var(--text-primary)',
                  marginBottom: '0.85rem',
                }}
              >
                Great software should feel effortless.
              </h2>

              <p
                ref={subtextRef}
                style={{
                  fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  fontWeight: '400',
                }}
              >
                Software engineering student and frontend developer building high-frequency
                interfaces, responsive web platforms, and mobile apps with React, React Native, and
                fluid GSAP motion.
              </p>
            </div>

            <div
              ref={ctaRef}
              className="hero-cta-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <Button
                href="#work"
                onClick={(e) => handleScrollTo(e, 'work')}
                variant="primary"
                size="md"
                icon={true}
              >
                Explore My Work
              </Button>

              <Button
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                variant="secondary"
                size="md"
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>

        {/* ======================================================================
            BOTTOM DISCIPLINE BAR
            #01 Frontend • #02 Mobile • #03 Motion • #04 Systems
            ====================================================================== */}
        <div ref={disciplinesRef} className="hero-disciplines-bar">
          {DISCIPLINES.map((d) => (
            <div
              key={d.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                }}
              >
                #{d.num}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: '700',
                  fontSize: '0.98rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {d.title}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                }}
              >
                {d.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Subtle scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="hero-scroll-indicator"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            paddingTop: '1.5rem',
            paddingBottom: '0.25rem',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <ArrowDown size={14} style={{ color: 'var(--accent)' }} />
          <span>Scroll to explore projects</span>
        </div>
      </div>

      {/* Responsive media rules across Desktop, Tablet, and Mobile */}
      <style>{`
        /* --- BASE STYLES --- */
        .hero-portrait-glow {
          position: absolute;
          top: 38%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(340px, 45vw, 640px);
          height: clamp(340px, 45vw, 640px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.65) 0%, rgba(249, 115, 22, 0.38) 38%, rgba(255, 59, 48, 0.08) 70%, transparent 88%);
          filter: blur(55px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-portrait-img {
          position: relative;
          z-index: 2;
          width: auto;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 25px 60px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 45px rgba(239, 68, 68, 0.25));
          -webkit-mask-image: linear-gradient(to bottom, black 74%, transparent 98%);
          mask-image: linear-gradient(to bottom, black 74%, transparent 98%);
        }

        /* --- 1. DESKTOP VIEWPORT (> 1024px) --- */
        @media (min-width: 1025px) {
          .hero-editorial-overlay {
            position: relative;
            display: flex;
            align-items: center;
            justifyContent: space-between;
            gap: clamp(1.5rem, 4vw, 3.5rem);
            margin: auto 0;
            padding: 1.5rem 0;
            min-height: clamp(480px, 62vh, 680px);
          }
          .hero-headline-column {
            position: relative;
            z-index: 10;
            max-width: min(720px, calc(100% - 410px));
            flex: 1 1 auto;
          }
          .hero-headline-column h1,
          .hero-headline-column .hero-title-word {
            font-size: clamp(2.2rem, 3.8vw, 4.2rem) !important;
            line-height: 0.94 !important;
          }
          .hero-portrait-stage {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 100%;
            max-width: 1200px;
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            pointer-events: none;
            z-index: 3;
          }
          .hero-portrait-img {
            height: clamp(460px, 72vh, 760px);
            max-height: 82vh;
            max-width: 95vw;
          }
          .hero-manifesto-column {
            position: relative;
            z-index: 10;
            max-width: clamp(300px, 32vw, 420px);
            flex: 0 0 380px;
            margin-left: auto;
            backdrop-filter: blur(6px);
            background-color: rgba(7, 7, 9, 0.45);
            padding: 1.5rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          }
          .hero-disciplines-bar {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            border-top: 1px solid var(--border-subtle);
            padding: 1.5rem 0.75rem 0;
            position: relative;
            z-index: 10;
            backdrop-filter: blur(8px);
            background-color: rgba(7, 7, 9, 0.55);
            border-radius: 8px 8px 0 0;
          }
        }

        /* --- 2. TABLET VIEWPORT (641px to 1024px) --- */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero-cinematic-section {
            padding-top: calc(var(--header-height) + 1.25rem) !important;
            padding-bottom: 2rem !important;
            min-height: auto !important;
          }
          .hero-editorial-overlay {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
            align-items: flex-start !important;
            margin: 1.5rem 0 !important;
            position: relative !important;
          }
          .hero-headline-column {
            order: 1 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .hero-headline-column h1,
          .hero-headline-column .hero-title-word {
            font-size: clamp(2.8rem, 6.2vw, 4.4rem) !important;
            line-height: 0.95 !important;
          }
          .hero-portrait-stage {
            order: 2 !important;
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            margin: 0 auto !important;
            height: clamp(360px, 44vh, 460px) !important;
            width: 100% !important;
            display: flex !important;
            align-items: flex-end !important;
            justify-content: center !important;
            pointer-events: auto !important;
          }
          .hero-portrait-img {
            height: 100% !important;
            max-height: 460px !important;
            max-width: 100% !important;
          }
          .hero-portrait-glow {
            width: 300px !important;
            height: 300px !important;
            filter: blur(45px) !important;
          }
          .hero-manifesto-column {
            order: 2 !important;
            max-width: 100% !important;
            margin: 0 !important;
            backdrop-filter: blur(8px) !important;
            background-color: rgba(7, 7, 9, 0.55) !important;
            padding: 1.5rem !important;
            border-radius: 14px !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
          /* When portrait stage template is uncommented, manifesto spans across beneath it */
          .hero-portrait-stage ~ .hero-manifesto-column {
            grid-column: 1 / -1 !important;
            order: 3 !important;
          }
          .hero-disciplines-bar {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
            border-top: 1px solid var(--border-subtle) !important;
            padding: 1.25rem 0.75rem 0 !important;
            backdrop-filter: blur(8px) !important;
            background-color: rgba(7, 7, 9, 0.55) !important;
          }
        }

        /* --- 3. MOBILE VIEWPORT (<= 640px) --- */
        @media (max-width: 640px) {
          .hero-cinematic-section {
            min-height: auto !important;
            padding-top: calc(var(--header-height) + 1rem) !important;
            padding-bottom: 2rem !important;
          }
          .hero-editorial-overlay {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.25rem !important;
            margin: 0.75rem 0 !important;
            padding: 0 !important;
          }
          .hero-headline-column {
            order: 1 !important;
            max-width: 100% !important;
            width: 100% !important;
            text-align: left !important;
          }
          .hero-headline-column h1,
          .hero-headline-column .hero-title-word {
            font-size: clamp(1.4rem, 6.7vw, 2.2rem) !important;
            line-height: 0.96 !important;
            letter-spacing: -0.035em !important;
          }
          .hero-portrait-stage {
            order: 2 !important;
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            width: 100% !important;
            max-width: 300px !important;
            height: clamp(270px, 40vh, 330px) !important;
            margin: 0.5rem auto 1rem !important;
            display: flex !important;
            align-items: flex-end !important;
            justify-content: center !important;
            pointer-events: auto !important;
          }
          .hero-portrait-img {
            height: 100% !important;
            max-height: 330px !important;
            max-width: 100% !important;
            filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 25px rgba(239, 68, 68, 0.35)) !important;
            -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%) !important;
            mask-image: linear-gradient(to bottom, black 80%, transparent 100%) !important;
          }
          .hero-portrait-glow {
            width: 240px !important;
            height: 240px !important;
            filter: blur(40px) !important;
            top: 42% !important;
          }
          .hero-manifesto-column {
            order: 3 !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 1.25rem !important;
            backdrop-filter: blur(10px) !important;
            background-color: rgba(7, 7, 9, 0.65) !important;
            border-radius: 12px !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
          }
          .hero-cta-group {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.75rem !important;
            width: 100% !important;
          }
          .hero-cta-group a,
          .hero-cta-group button {
            width: 100% !important;
            justify-content: center !important;
          }
          .hero-disciplines-bar {
            order: 4 !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1rem !important;
            padding: 1.25rem !important;
            border-radius: 12px !important;
            background-color: rgba(7, 7, 9, 0.75) !important;
            backdrop-filter: blur(14px) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            margin-top: 1rem !important;
          }
        }

        @media (max-width: 440px) {
          .hero-disciplines-bar {
            grid-template-columns: 1fr !important;
            gap: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
}
