import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Mail, Copy, Check, ArrowUpRight, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';

export default function LinkTreeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (!isOpen) return null;

  return (
    <div
      className="linktree-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="linktree-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 5, 8, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'linktreeFadeIn 0.25s ease-out forwards',
      }}
    >
      <div
        className="linktree-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#0c0c10',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '2rem 1.75rem',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 59, 48, 0.12)',
          animation: 'linktreeSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Linktree"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <X size={18} />
        </button>

        {/* Profile Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 59, 48, 0.12)',
              border: '2px solid var(--accent)',
              boxShadow: '0 0 20px rgba(255, 59, 48, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: '800',
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            OS
          </div>

          <h3
            id="linktree-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '0.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            {PERSONAL_INFO.name}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.85rem',
            }}
          >
            {PERSONAL_INFO.role}
          </p>

          <div className="tag tag-accent" style={{ fontSize: '0.72rem', padding: '0.3rem 0.8rem' }}>
            <span className="dot" />
            <span>{PERSONAL_INFO.status}</span>
          </div>
        </div>

        {/* Links Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {/* 1. WhatsApp Action */}
          <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="linktree-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.1rem 1.25rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 59, 48, 0.08)',
              border: '1.5px solid var(--accent)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 20px rgba(255, 59, 48, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 59, 48, 0.35)';
              const sub = e.currentTarget.querySelector('.item-subtext');
              if (sub) sub.style.color = 'rgba(255, 255, 255, 0.85)';
              const icon = e.currentTarget.querySelector('.item-icon-wrap');
              if (icon) icon.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.08)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 59, 48, 0.15)';
              const sub = e.currentTarget.querySelector('.item-subtext');
              if (sub) sub.style.color = 'var(--text-secondary)';
              const icon = e.currentTarget.querySelector('.item-icon-wrap');
              if (icon) icon.style.backgroundColor = 'rgba(255, 59, 48, 0.15)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                className="item-icon-wrap"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 59, 48, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background-color 0.2s ease',
                }}
              >
                <MessageCircle size={22} color="var(--accent)" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.02rem', lineHeight: 1.2 }}>
                  Chat on WhatsApp
                </div>
                <div className="item-subtext" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  +234 901 126 3971 • Direct Message
                </div>
              </div>
            </div>
            <ArrowUpRight size={18} />
          </a>

          {/* 2. Direct Email Action */}
          <div
            className="linktree-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.1rem 1.25rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
            }}
          >
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                flex: 1,
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Mail size={20} color="var(--accent)" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.02rem', lineHeight: 1.2 }}>
                  Send an Email
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {PERSONAL_INFO.email}
                </div>
              </div>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email address"
                style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: '8px',
                  backgroundColor: copied ? 'var(--accent)' : 'rgba(255, 255, 255, 0.06)',
                  color: copied ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                title="Open email client"
                style={{
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.25rem',
                }}
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* 3. GitHub & X Quick Socials Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.25rem' }}>
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-border)';
                e.currentTarget.style.backgroundColor = 'var(--accent-dim)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Github size={16} color="var(--accent)" />
                <span>GitHub</span>
              </div>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </a>

            <a
              href={PERSONAL_INFO.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-border)';
                e.currentTarget.style.backgroundColor = 'var(--accent-dim)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: '800', color: 'var(--accent)' }}>𝕏</span>
                <span>Twitter / X</span>
              </div>
              <ArrowUpRight size={14} color="var(--text-muted)" />
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ textAlign: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Lagos, Nigeria (WAT) • Direct WhatsApp & Email
          </span>
        </div>
      </div>

      <style>{`
        @keyframes linktreeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes linktreeSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
