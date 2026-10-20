import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Code, Smartphone, Database, Wrench, CheckCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { SKILL_GROUPS } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef(null);
  const groupsRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const getCategoryIcon = (category) => {
    if (category.includes('Frontend')) return <Code size={20} />;
    if (category.includes('Mobile')) return <Smartphone size={20} />;
    if (category.includes('Backend') || category.includes('Database')) return <Database size={20} />;
    return <Wrench size={20} />;
  };

  useGSAP(
    () => {
      if (prefersReduced) return;

      const groupCards = groupsRef.current?.children;
      if (!groupCards) return;

      gsap.from(groupCards, {
        scrollTrigger: {
          trigger: groupsRef.current,
          start: 'top 80%',
          end: 'bottom 70%',
          scrub: 0.8,
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
      });
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  );

  return (
    <section id="skills" ref={containerRef} className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionHeading
          index="03"
          tag="Capabilities"
          title="Technical Competencies"
          subtitle="Organized by discipline without arbitrary percentages or artificial metrics. Frontend engineering and mobile application architecture are my core specializations."
        />

        {/* Skill Groups Grid */}
        <div
          ref={groupsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {SKILL_GROUPS.map((group, idx) => {
            const isFrontend = group.category.includes('Frontend');

            return (
              <div
                key={group.category}
                style={{
                  backgroundColor: isFrontend ? 'var(--accent-dim)' : 'var(--bg-secondary)',
                  border: isFrontend
                    ? '1px solid var(--accent-border)'
                    : '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isFrontend
                    ? 'var(--accent)'
                    : 'var(--border-medium)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isFrontend
                    ? 'var(--accent-border)'
                    : 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Header of the Group */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: isFrontend
                        ? 'var(--accent-dim)'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: isFrontend
                        ? '1px solid var(--accent-border)'
                        : '1px solid var(--border-medium)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isFrontend ? 'var(--accent)' : 'var(--text-secondary)',
                    }}
                  >
                    {getCategoryIcon(group.category)}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {group.category}
                    </h3>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '1.75rem',
                  }}
                >
                  {group.description}
                </p>

                {/* Skills List within Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                  {group.skills.map((skill) => {
                    const isCoreFocus =
                      skill.name.includes('React') || skill.name.includes('JavaScript');

                    return (
                      <div
                        key={skill.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          backgroundColor: isCoreFocus
                            ? 'var(--accent-dim)'
                            : 'rgba(255, 255, 255, 0.02)',
                          border: isCoreFocus
                            ? '1px solid var(--accent-border)'
                            : '1px solid var(--border-subtle)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: isCoreFocus ? 'var(--accent)' : 'var(--text-muted)',
                              boxShadow: isCoreFocus ? '0 0 6px var(--accent)' : 'none',
                            }}
                          />
                          <span
                            style={{
                              fontFamily: isCoreFocus ? 'var(--font-display)' : 'var(--font-body)',
                              fontWeight: isCoreFocus ? '700' : '500',
                              fontSize: isCoreFocus ? '0.98rem' : '0.9rem',
                              color: isCoreFocus ? 'var(--text-primary)' : 'var(--text-secondary)',
                            }}
                          >
                            {skill.name}
                          </span>
                        </div>

                        {isCoreFocus && (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              color: 'var(--accent)',
                              backgroundColor: 'var(--accent-dim)',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              letterSpacing: '0.04em',
                              fontWeight: '600',
                            }}
                          >
                            PRIMARY
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
