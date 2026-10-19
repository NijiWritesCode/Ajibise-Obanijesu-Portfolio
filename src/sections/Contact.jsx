import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, ArrowUpRight, Copy, Check, ArrowUp, Github, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import { PERSONAL_INFO } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const contentRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useGSAP(
    () => {
      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 320px)', () => {
        const headlineLines = headlineRef.current?.querySelectorAll('.closing-headline-line');
        const contentChildren = contentRef.current?.children;

        // Stage C & D: Controlled typography reveal for the final statement
        if (headlineLines) {
          gsap.from(headlineLines, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'top 35%',
              scrub: 0.8,
            },
            yPercent: 90,
            opacity: 0,
            stagger: 0.15,
          });
        }

        // Stage E: Reveal contact action elements
        if (contentChildren) {
          gsap.from(contentChildren, {
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'bottom 85%',
              end: 'bottom 45%',
              scrub: 0.8,
            },
            y: 40,
            opacity: 0,
            stagger: 0.1,
          });
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  );

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="section"
      style={{
        position: 'relative',
        backgroundColor: '#050507',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 'clamp(6rem, 12vw, 12rem)',
        paddingBottom: '3rem',
        overflow: 'hidden',
      }}
    >
      {/* Cinematic Ambient Glow */}
      <div
        className="ambient-glow ambient-glow-accent"
        style={{
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          opacity: 0.08,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Stage C: Pre-Headline Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent)',
              fontWeight: '600',
            }}
          >
            // 04
          </span>
          <span className="tag tag-accent">
            <span className="dot" />
            <span>Initiate Collaboration</span>
          </span>
        </div>

        {/* Stage D: Bold Final Headline */}
        <div ref={headlineRef} style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <div className="text-mask-wrapper">
            <h2
              className="closing-headline-line"
              style={{
                fontSize: 'clamp(2.5rem, 7.5vw, 7.2rem)',
                fontWeight: '800',
                lineHeight: 0.98,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
              }}
            >
              LET&apos;S BUILD
            </h2>
          </div>

          <div className="text-mask-wrapper">
            <h2
              className="closing-headline-line"
              style={{
                fontSize: 'clamp(2.5rem, 7.5vw, 7.2rem)',
                fontWeight: '800',
                lineHeight: 0.98,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(245, 245, 247, 0.85)',
              }}
            >
              SOMETHING
            </h2>
          </div>

          <div className="text-mask-wrapper">
            <h2
              className="closing-headline-line"
              style={{
                fontSize: 'clamp(2.5rem, 7.5vw, 7.2rem)',
                fontWeight: '800',
                lineHeight: 0.98,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              MEANINGFUL.
            </h2>
          </div>
        </div>

        {/* Stage E: Contact Actions & Channels */}
        <div
          ref={contentRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'flex-start',
            marginBottom: 'clamp(4rem, 8vw, 8rem)',
          }}
        >
          {/* Invitation Copy */}
          <div>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
              }}
            >
              I am interested in frontend engineering opportunities, software engineering roles,
              and collaborative software projects. If you value purposeful motion, responsive
              architectures, and high technical standards, let&apos;s connect.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Button
                href={`mailto:${PERSONAL_INFO.email}`}
                variant="primary"
                size="lg"
                icon={true}
              >
                Send Direct Email
              </Button>

              <button
                type="button"
                onClick={handleCopyEmail}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.5rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
                aria-label="Copy email address"
              >
                {copied ? <Check size={16} color="var(--accent)" /> : <Copy size={16} />}
                <span>{copied ? 'Email Copied' : 'Copy Address'}</span>
              </button>
            </div>
          </div>

          {/* Social Links & Active Coordinates */}
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Verified Channels & Codebases
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* GitHub Link */}
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-border)';
                  e.currentTarget.style.backgroundColor = 'rgba(204, 255, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Github size={18} color="var(--accent)" />
                  <div>
                    <span style={{ fontSize: '0.95rem', fontWeight: '600', display: 'block' }}>
                      GitHub
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      @NijiWritesCode
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} />
              </a>

              {/* X / Twitter Link */}
              <a
                href={PERSONAL_INFO.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-border)';
                  e.currentTarget.style.backgroundColor = 'rgba(204, 255, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '800',
                      fontSize: '1rem',
                      color: 'var(--accent)',
                    }}
                  >
                    𝕏
                  </div>
                  <div>
                    <span style={{ fontSize: '0.95rem', fontWeight: '600', display: 'block' }}>
                      X (Twitter)
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      @NijiWritesCode
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Email Address Indicator */}
            <div
              style={{
                marginTop: '0.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Mail size={14} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {PERSONAL_INFO.email}
              </span>
            </div>
          </div>
        </div>

        {/* Stage F: Final Resting State & Footer Chrome */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
              }}
            >
              {PERSONAL_INFO.name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Frontend Developer & Software Engineer • {PERSONAL_INFO.location}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
              }}
            >
              © {new Date().getFullYear()} All Rights Reserved
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.borderColor = 'var(--accent-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
              aria-label="Back to top of page"
            >
              <span>TOP</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
