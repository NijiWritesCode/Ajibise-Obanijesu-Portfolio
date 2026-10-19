import React from 'react';
import { Lock, ArrowUpRight, Sparkles, TrendingUp, ExternalLink, Globe } from 'lucide-react';

/**
 * High-fidelity desktop browser presentation for the featured project (FlowDesk).
 * Displays the authentic home screen asset inside a responsive browser chrome with 3D perspective.
 */
export default function ProjectPreview({ project }) {
  const { previewData } = project;

  return (
    <div
      className="project-preview-viewport preserve-3d"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '680px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      {/* Background ambient glow behind preview */}
      <div
        className="ambient-glow ambient-glow-accent"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '460px',
          height: '460px',
          opacity: 0.16,
        }}
      />

      {/* Floating Meta Badge 1 - Top Left */}
      <div
        className="floating-stat-card meta-badge-top"
        style={{
          top: '-5%',
          left: '-4%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          zIndex: 30,
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
          <Sparkles size={18} />
        </div>
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              display: 'block',
              letterSpacing: '0.05em',
            }}
          >
            Live Vercel Deployment
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
            }}
          >
            FlowDesk v2.0
          </span>
        </div>
      </div>

      {/* Floating Meta Badge 2 - Bottom Right */}
      <div
        className="floating-stat-card meta-badge-bottom"
        style={{
          bottom: '-6%',
          right: '-4%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          zIndex: 30,
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a78bfa',
          }}
        >
          <TrendingUp size={18} />
        </div>
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              display: 'block',
              letterSpacing: '0.05em',
            }}
          >
            Monthly Telemetry
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
            }}
          >
            $38,421 • +12% MoM
          </span>
        </div>
      </div>

      {/* Desktop Browser Mockup Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#0c0c12',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '18px',
          boxShadow:
            '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.06)',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Browser Top Window Bar */}
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: '#111118',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Window Traffic Lights */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          </div>

          {/* URL Pill */}
          <div
            style={{
              flex: 1,
              maxWidth: '380px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
            }}
          >
            <Lock size={11} color="var(--accent)" />
            <span>{previewData?.url || 'flow-desk-woad-alpha.vercel.app'}</span>
          </div>

          {/* Live External Indicator */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--accent)',
                backgroundColor: 'var(--accent-dim)',
                padding: '3px 8px',
                borderRadius: '5px',
                border: '1px solid var(--accent-border)',
                fontWeight: '600',
              }}
              title="Open Live Application"
            >
              <span>LIVE</span>
              <ExternalLink size={10} />
            </a>
          )}
        </div>

        {/* Real Home Screen Image Render */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            overflow: 'hidden',
            backgroundColor: '#070709',
          }}
        >
          <img
            src={project.image}
            alt={`${project.title} Home Screen View`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top left',
              display: 'block',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Subtle vignette/reflection gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 20%, rgba(0, 0, 0, 0.3) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 768px) {
          .meta-badge-top,
          .meta-badge-bottom {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
