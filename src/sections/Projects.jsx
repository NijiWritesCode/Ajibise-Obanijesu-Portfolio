import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, Navigation, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProjectPreview from '../components/ProjectPreview';
import ProjectShowcase from '../components/ProjectShowcase';
import Button from '../components/Button';
import { FEATURED_PROJECT, SECONDARY_PROJECTS } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const pinnedWrapperRef = useRef(null);
  const previewContainerRef = useRef(null);
  const infoPanelRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (> 900px): Full Pinned Scroll-Driven Showcase Experience
      mm.add('(min-width: 901px)', () => {
        const pinWrapper = pinnedWrapperRef.current;
        const preview = previewContainerRef.current;
        const info = infoPanelRef.current;
        const titleLine = titleWrapperRef.current?.querySelector('.project-title-line');

        if (!pinWrapper || !preview || !info) return;

        // Stage A: Setup initial states with graceful visibility
        gsap.set(preview, {
          y: 40,
          opacity: 0.85,
          scale: 0.96,
          rotationY: 0,
          rotationX: 0,
          transformPerspective: 1200,
        });

        gsap.set(info.children, {
          y: 20,
          opacity: 0.85,
        });

        if (titleLine) {
          gsap.set(titleLine, { yPercent: 0, opacity: 1 });
        }

        // Pinned ScrollTrigger Timeline
        const pinnedTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapper,
            pin: true,
            start: 'top top',
            end: '+=220%',
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Stage B: Project preview focus
        pinnedTimeline.to(
          preview,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          0
        );

        // Stage C: 3D transformation & Perspective tilt
        pinnedTimeline.to(
          preview,
          {
            rotationY: -10,
            rotationX: 6,
            scale: 1.03,
            duration: 0.8,
            ease: 'sine.inOut',
          },
          0.3
        );

        // Stage D: Project information emphasize
        pinnedTimeline.to(
          info.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.4
        );

        // Stage E: Transition to next section (smooth exit)
        pinnedTimeline.to(
          preview,
          {
            y: -40,
            scale: 0.95,
            rotationY: 0,
            rotationX: 0,
            opacity: 0.4,
            duration: 0.6,
            ease: 'power2.in',
          },
          1.4
        );

        pinnedTimeline.to(
          info,
          {
            y: -30,
            opacity: 0.4,
            duration: 0.6,
            ease: 'power2.in',
          },
          1.4
        );
      });

      // Mobile (<= 900px): Clean scrollable layout without trapping the user
      mm.add('(max-width: 900px)', () => {
        const preview = previewContainerRef.current;
        const info = infoPanelRef.current;

        if (preview && info) {
          gsap.from(preview, {
            scrollTrigger: {
              trigger: preview,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
            y: 50,
            opacity: 0.4,
            scale: 0.95,
          });

          gsap.from(info.children, {
            scrollTrigger: {
              trigger: info,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
            y: 30,
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
    <section id="work" ref={containerRef} className="section" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        {/* Section Intro Heading */}
        <SectionHeading
          index="01"
          tag="Selected Work"
          title="Featured Projects"
          subtitle="Interactive web applications, mobile architectures, and responsive software systems crafted with focus and precision."
        />
      </div>

      {/* ======================================================================
          MANDATORY SIGNATURE EXPERIENCE TWO: PINNED MOVE IT SHOWCASE
          ====================================================================== */}
      <div
        ref={pinnedWrapperRef}
        className="pinned-showcase-section"
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingTop: '2rem',
          paddingBottom: '4rem',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Project Information (Stage A & D) */}
            <div ref={infoPanelRef} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  marginBottom: '1rem',
                }}
              >
                <span className="tag tag-accent">
                  <span className="dot" />
                  <span>Featured Case Study</span>
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {FEATURED_PROJECT.platform}
                </span>
              </div>

              {/* Title with clipping mask */}
              <div ref={titleWrapperRef} className="text-mask-wrapper" style={{ marginBottom: '0.5rem' }}>
                <h3
                  className="project-title-line"
                  style={{
                    fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
                    fontWeight: '800',
                    lineHeight: 1.02,
                    letterSpacing: '-0.035em',
                    color: 'var(--text-primary)',
                  }}
                >
                  {FEATURED_PROJECT.title}
                </h3>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.04em',
                  marginBottom: '1.5rem',
                  fontWeight: '500',
                }}
              >
                {FEATURED_PROJECT.subtitle}
              </p>

              <p
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  marginBottom: '1.75rem',
                }}
              >
                {FEATURED_PROJECT.summary}
              </p>

              {/* Technical Role & Contribution */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: '2px solid var(--accent)',
                  borderRadius: '0 12px 12px 0',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '1.75rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  Technical Contribution & Architecture
                </span>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                  {FEATURED_PROJECT.contribution}
                </p>
              </div>

              {/* Highlights */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  marginBottom: '2rem',
                }}
              >
                {FEATURED_PROJECT.highlights.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2
                      size={17}
                      color="var(--accent)"
                      style={{ marginTop: '2px', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technology Stack Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {FEATURED_PROJECT.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '6px',
                      backgroundColor: 'var(--accent-dim)',
                      border: '1px solid var(--accent-border)',
                      color: 'var(--accent)',
                      fontWeight: '500',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                {FEATURED_PROJECT.liveUrl && (
                  <Button
                    href={FEATURED_PROJECT.liveUrl}
                    target="_blank"
                    variant="primary"
                    size="md"
                    icon={true}
                  >
                    Launch Live App
                  </Button>
                )}
                {FEATURED_PROJECT.repoUrl && (
                  <Button
                    href={FEATURED_PROJECT.repoUrl}
                    target="_blank"
                    variant="outline"
                    size="md"
                    icon={true}
                  >
                    View Codebase
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column: 3D Interactive Project Preview (Stage B & C) */}
            <div
              ref={previewContainerRef}
              className="perspective-container"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <ProjectPreview project={FEATURED_PROJECT} />
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================================
          ADDITIONAL PROJECTS: REUSABLE PRESENTATION SYSTEM (Servio, ExamForge)
          ====================================================================== */}
      <div className="container" style={{ marginTop: 'clamp(4rem, 8vw, 8rem)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Concept Systems & Engineering Studies
          </span>
          <h3
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: 'var(--text-primary)',
            }}
          >
            Additional Projects
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {SECONDARY_PROJECTS.map((project, idx) => (
            <ProjectShowcase key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
