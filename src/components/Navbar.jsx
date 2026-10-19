import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO, NAV_LINKS } from '../data/portfolio';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['home', 'work', 'about', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 900,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: isScrolled ? '0.85rem 0' : '1.5rem 0',
        backgroundColor: isScrolled ? 'rgba(7, 7, 9, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(255, 255, 255, 0.08)'
          : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            textDecoration: 'none',
          }}
          aria-label="Ajibise Obanijesu Solomon - Home"
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: '700',
              fontSize: '0.9rem',
              color: 'var(--accent)',
            }}
          >
            OS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '0.95rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Ajibise Obanijesu
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Frontend Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          aria-label="Primary Navigation"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              background: isScrolled ? 'transparent' : 'rgba(19, 19, 27, 0.6)',
              padding: isScrolled ? '0' : '0.5rem 1.25rem',
              borderRadius: '9999px',
              border: isScrolled ? 'none' : '1px solid var(--border-subtle)',
              backdropFilter: isScrolled ? 'none' : 'blur(12px)',
            }}
          >
            {NAV_LINKS.map((link) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'color var(--transition-fast)',
                    position: 'relative',
                    padding: '0.25rem 0',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isActive ? 'var(--accent)' : 'var(--text-secondary)')
                  }
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'var(--accent)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Quick Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '0.5rem 1.15rem',
              borderRadius: '6px',
              backgroundColor: 'var(--accent-dim)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: '600',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-dim)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={14} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-nav-toggle"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-medium)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '70px',
            height: 'calc(100vh - 70px)',
            backgroundColor: 'rgba(7, 7, 9, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 899,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.5rem 1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Navigation
            </span>

            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '1rem',
                }}
              >
                <span>{link.label}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--accent)',
                  }}
                >
                  0{idx + 1}
                </span>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  boxShadow: '0 0 8px var(--accent)',
                }}
              />
              <span>{PERSONAL_INFO.status}</span>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}
              >
                GitHub ↗
              </a>
              <a
                href={PERSONAL_INFO.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}
              >
                X (Twitter) ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Responsive media query styling */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
