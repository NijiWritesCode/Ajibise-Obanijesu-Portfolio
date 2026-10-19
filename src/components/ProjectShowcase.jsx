import React from 'react';
import { ArrowUpRight, Github, ExternalLink, CheckCircle2, Globe, Lock } from 'lucide-react';
import Button from './Button';

/**
 * Reusable Project Card Component for projects (Auriel, Hoteliers Association, Interview Prep).
 * Displays the authentic home screen asset inside an editorial browser frame alongside project metrics and details.
 */
export default function ProjectShowcase({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <article
      className="interactive-card"
      data-cursor="view"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '24px',
        padding: 'clamp(2rem, 4vw, 3.5rem)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color var(--transition-medium), transform var(--transition-medium)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-medium)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Background corner glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: isEven ? 'var(--accent)' : 'var(--violet)',
          filter: 'blur(110px)',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left column: Information & Contribution */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent)',
                fontWeight: '600',
              }}
            >
              // 0{index + 2}
            </span>
            <span className="tag">{project.category}</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              {project.year}
            </span>
            {project.liveUrl && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--accent)',
                  backgroundColor: 'var(--accent-dim)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--accent-border)',
                  fontWeight: '600',
                }}
              >
                LIVE
              </span>
            )}
          </div>

          <h3
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: '800',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '0.5rem',
              color: 'var(--text-primary)',
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--accent)',
              marginBottom: '1.5rem',
              letterSpacing: '0.02em',
            }}
          >
            {project.subtitle}
          </p>

          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              marginBottom: '1.75rem',
            }}
          >
            {project.summary}
          </p>

          {/* Technical Contribution */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderLeft: '2px solid var(--accent)',
              padding: '1rem 1.25rem',
              borderRadius: '0 8px 8px 0',
              marginBottom: '1.75rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '0.4rem',
                letterSpacing: '0.06em',
              }}
            >
              Technical Contribution & Role
            </span>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {project.contribution}
            </p>
          </div>

          {/* Highlights checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
            {project.highlights?.map((hl, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={16} color="var(--accent)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{hl}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                target="_blank"
                variant="primary"
                size="sm"
                icon={true}
              >
                Visit Live Site
              </Button>
            )}
            {project.repoUrl && (
              <Button
                href={project.repoUrl}
                target="_blank"
                variant="outline"
                size="sm"
                icon={true}
              >
                View Repository
              </Button>
            )}
          </div>
        </div>

        {/* Right column: Authentic Home Screen Image Display */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Browser Window Device Mockup */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#0a0a0f',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.8)',
              transition: 'transform var(--transition-medium), border-color var(--transition-medium)',
            }}
          >
            {/* Top Browser Header */}
            <div
              style={{
                padding: '9px 14px',
                backgroundColor: '#12121a',
                borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Lock size={10} color="var(--accent)" />
                {project.title.toLowerCase().replace(/\s+/g, '')}.app
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                }}
              >
                {project.status.includes('Live') ? 'ONLINE' : 'PREVIEW'}
              </span>
            </div>

            {/* Project Home Screen Image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 10',
                overflow: 'hidden',
                backgroundColor: '#050508',
              }}
            >
              <img
                src={project.image}
                alt={`${project.title} Home Screen`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                loading="lazy"
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 40%, rgba(0, 0, 0, 0.25) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Key metrics grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '0.85rem',
            }}
          >
            {project.metrics?.map((m) => (
              <div
                key={m.label}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.2rem',
                  }}
                >
                  {m.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                  }}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
