import React from 'react';

/**
 * Editorial section header with numbered index, tag, and split reveal masks.
 */
export default function SectionHeading({
  index = '01',
  tag = 'Section',
  title = 'Heading',
  subtitle,
  align = 'left',
  className = '',
}) {
  return (
    <div
      className={`section-header ${align === 'center' ? 'text-center' : ''} ${className}`}
      style={{
        textAlign: align,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            letterSpacing: '0.1em',
            fontWeight: '600',
          }}
        >
          // {index}
        </span>
        <span className="tag">{tag}</span>
      </div>

      <div className="text-mask-wrapper">
        <h2 className="section-title text-mask-line">{title}</h2>
      </div>

      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}
