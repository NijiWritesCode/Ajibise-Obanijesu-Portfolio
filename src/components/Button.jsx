import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Reusable editorial button component with accessible focus and hover states.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'outline'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = false,
  customIcon = null,
  target,
  rel,
  className = '',
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.625rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '500',
    fontSize: size === 'sm' ? '0.8rem' : size === 'lg' ? '0.95rem' : '0.875rem',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden',
    padding:
      size === 'sm'
        ? '0.5rem 1rem'
        : size === 'lg'
        ? '1rem 2rem'
        : '0.75rem 1.5rem',
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--accent)',
      color: 'var(--accent-text)',
      border: '1px solid var(--accent)',
      boxShadow: '0 4px 20px rgba(255, 59, 48, 0.28)',
    },
    secondary: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-medium)',
      backdropFilter: 'blur(8px)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent',
      padding: '0.5rem 0',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...(variantStyles[variant] || variantStyles.primary),
  };

  const content = (
    <>
      <span>{children}</span>
      {customIcon ? (
        customIcon
      ) : icon ? (
        <ArrowUpRight
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          style={{ transition: 'transform 0.2s ease' }}
          className="btn-icon"
        />
      ) : null}
    </>
  );

  const hoverHandlers = {
    onMouseEnter: (e) => {
      if (variant === 'primary') {
        e.currentTarget.style.backgroundColor = '#ff5247';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(255, 59, 48, 0.45)';
      } else if (variant === 'secondary') {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.borderColor = 'var(--text-primary)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      } else if (variant === 'outline') {
        e.currentTarget.style.borderColor = 'var(--accent-border)';
        e.currentTarget.style.color = 'var(--accent)';
      } else if (variant === 'ghost') {
        e.currentTarget.style.color = 'var(--text-primary)';
      }
      const iconEl = e.currentTarget.querySelector('.btn-icon');
      if (iconEl) {
        iconEl.style.transform = 'translate(2px, -2px)';
      }
    },
    onMouseLeave: (e) => {
      if (variant === 'primary') {
        e.currentTarget.style.backgroundColor = 'var(--accent)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 59, 48, 0.28)';
      } else if (variant === 'secondary') {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.borderColor = 'var(--border-medium)';
        e.currentTarget.style.transform = 'translateY(0)';
      } else if (variant === 'outline') {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.color = 'var(--text-primary)';
      } else if (variant === 'ghost') {
        e.currentTarget.style.color = 'var(--text-secondary)';
      }
      const iconEl = e.currentTarget.querySelector('.btn-icon');
      if (iconEl) {
        iconEl.style.transform = 'translate(0, 0)';
      }
    },
  };

  if (href) {
    return (
      <a
        href={href}
        style={combinedStyles}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
        className={`portfolio-btn ${className}`}
        {...hoverHandlers}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={combinedStyles}
      className={`portfolio-btn ${className}`}
      {...hoverHandlers}
      {...props}
    >
      {content}
    </button>
  );
}
