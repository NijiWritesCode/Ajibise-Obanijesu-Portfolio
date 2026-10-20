import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Code2, Compass, Cpu, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { PERSONAL_INFO } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const bioRef = useRef(null);
  const cardsRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced) return;

      const paragraphs = bioRef.current?.querySelectorAll('p');
      const cards = cardsRef.current?.children;

      if (paragraphs) {
        gsap.from(paragraphs, {
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 0.8,
          },
          y: 35,
          opacity: 0.2,
          stagger: 0.15,
        });
      }

      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.8,
          },
          y: 40,
          opacity: 0,
          stagger: 0.15,
        });
      }
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  );

  return (
    <section id="about" ref={containerRef} className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionHeading
          index="02"
          tag="Developer Identity"
          title="About & Engineering Ethos"
          subtitle="A perspective centered on deliberate architecture, responsive performance, and meaningful interaction design."
        />

        {/* Asymmetrical Editorial Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 6vw, 5rem)',
            alignItems: 'flex-start',
            marginBottom: 'clamp(3rem, 6vw, 6rem)',
          }}
        >
          {/* Left Column: Statement & Personal Identity */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              // Biography & Focus
            </span>

            <h3
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                fontWeight: '800',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '1.75rem',
                color: 'var(--text-primary)',
              }}
            >
              Engineering interfaces that prioritize clarity and tactile feedback.
            </h3>

            {/* Quick highlight block */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>Nigeria</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Discipline</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>Software Engineering</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Primary Focus</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>React & React Native</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative Paragraphs */}
          <div ref={bioRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {PERSONAL_INFO.bio.paragraphs.map((para, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Engineering Principles Cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {PERSONAL_INFO.bio.principles.map((principle, idx) => (
            <div
              key={principle.title}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '18px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color var(--transition-medium), transform var(--transition-medium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-active)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent-dim)',
                  border: '1px solid var(--accent-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                }}
              >
                {idx === 0 ? <Sparkles size={18} /> : idx === 1 ? <Cpu size={18} /> : <Compass size={18} />}
              </div>

              <h4
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                }}
              >
                {principle.title}
              </h4>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
