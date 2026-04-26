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
 * Animated gradient CTA button — uiverse.io style, toned down.
 * The original animation is preserved but with reduced brightness/saturation
 * so the text stays readable at all times.
 */
export default function GradientButton({ children, onClick, href, className = '', size = 'md' }: GradientButtonProps) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { fontSize: '0.85rem', padding: '9px 22px' },
    md: { fontSize: '1rem',    padding: '12px 32px' },
    lg: { fontSize: '1.1rem',  padding: '14px 40px' },
  };

  /* ── wrapper ── */
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'clip',
    overflowClipMargin: '4px' as any,
    border: '2px solid #F5A623',
    borderRadius: '9999px',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    /* toned-down filter: less bright, less saturated than original */
    filter: 'saturate(0.55) brightness(1.3)',
    ...sizeStyles[size],
  };

  /* ── spinning gradient layer ── */
  const gradLayerStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    left: '-160px',
    width: '500%',
    aspectRatio: '1',
    background: 'radial-gradient(ellipse at 65% 180%, #F5A623, #1B2A4A, #F5A623, #1B2A4A, #F5A623, #1B2A4A, #F5A623)',
    mixBlendMode: 'difference',
    animation: 'gradBtn-rotate 8s linear infinite',
  };

  const gradLayerBStyle: React.CSSProperties = {
    ...gradLayerStyle,
    mixBlendMode: 'color-dodge',
    /* extra opacity reduction to prevent total wash-out */
    opacity: 0.55,
  };

  /* ── dark overlay that keeps text readable ── */
  const darkOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: '9999px',
    background: 'rgba(15, 22, 40, 0.52)',   /* semi-transparent navy */
    pointerEvents: 'none',
    zIndex: 1,
  };

  /* ── text layer — always on top ── */
  const textStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    color: '#fff',
    textShadow: '0 1px 4px rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    letterSpacing: '0.05em',
  };

  const inner = (
    <div style={wrapperStyle} className={`grad-btn-wrapper ${className}`}>
      <style>{`
        @keyframes gradBtn-rotate {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .grad-btn-wrapper:hover {
          filter: saturate(0.7) brightness(1.5) !important;
          box-shadow: 0 0 16px 3px rgba(245,166,35,0.3);
        }
        .grad-btn-wrapper:active {
          transform: scale(0.97);
        }
      `}</style>
      <div style={gradLayerStyle} />
      <div style={gradLayerBStyle} />
      <div style={darkOverlayStyle} />
      <span style={textStyle}>{children}</span>
    </div>
  );

  if (href) {
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
