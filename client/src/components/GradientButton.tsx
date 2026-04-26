import React from 'react';
import { Link } from 'wouter';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Animated CTA button — subtle rotating border glow (uiverse.io style)
 * Dark navy background with orange animated border + always-readable white text.
 */
export default function GradientButton({ children, onClick, href, className = '', size = 'md' }: GradientButtonProps) {
  const sizeClass: Record<string, string> = {
    sm: 'text-sm px-5 py-2.5',
    md: 'text-base px-8 py-3',
    lg: 'text-lg px-10 py-4',
  };

  const inner = (
    <div className={`grad-btn-outer ${sizeClass[size]} ${className}`}>
      <style>{`
        .grad-btn-outer {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          cursor: pointer;
          font-weight: 600;
          font-family: inherit;
          letter-spacing: 0.04em;
          color: #fff;
          background: #1B2A4A;
          z-index: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
          user-select: none;
        }
        .grad-btn-outer::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: conic-gradient(
            from var(--grad-btn-angle, 0deg),
            #F5A623 0%,
            #fff3c0 15%,
            #1B2A4A 30%,
            #1B2A4A 60%,
            #F5A623 75%,
            #fff3c0 90%,
            #F5A623 100%
          );
          animation: gradBtn-spin 3s linear infinite;
          z-index: -1;
        }
        .grad-btn-outer::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 9999px;
          background: #1B2A4A;
          z-index: -1;
        }
        .grad-btn-outer:hover {
          transform: scale(1.04);
          box-shadow: 0 0 18px 4px rgba(245,166,35,0.35);
        }
        .grad-btn-outer:active {
          transform: scale(0.97);
        }
        @property --grad-btn-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes gradBtn-spin {
          to { --grad-btn-angle: 360deg; }
        }
      `}</style>
      <span style={{ position: 'relative', zIndex: 1, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
        {children}
      </span>
    </div>
  );

  if (href) {
    // Use wouter Link for internal routes, plain <a> for external
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
    if (isExternal) {
      return (
        <a href={href} style={{ textDecoration: 'none', display: 'inline-flex' }} onClick={onClick}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'inline-flex' }} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <div onClick={onClick} style={{ display: 'inline-flex' }}>
      {inner}
    </div>
  );
}
