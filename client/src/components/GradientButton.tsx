import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Animated gradient CTA button from uiverse.io by dexter-st
 * Adapted to ORTAM AI brand colors: navy (#1B2A4A) + orange (#F5A623)
 */
export default function GradientButton({ children, onClick, href, className = '', size = 'md' }: GradientButtonProps) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { fontSize: '0.85rem', padding: '8px 22px' },
    md: { fontSize: '1rem',    padding: '12px 32px' },
    lg: { fontSize: '1.15rem', padding: '14px 40px' },
  };

  const style: React.CSSProperties = {
    // CSS custom properties for the animation
    ['--rad' as string]: '32px',
    ['--color-wrapper-border' as string]: '#F5A623',
    ['--color-btn-bg' as string]: '#F5A623',
    ['--color-btn-text' as string]: '#1B2A4A',
    ['--color-btn-text-shadow' as string]: '#fff',
    ['--color-btn-inset-shadow' as string]: '#1B2A4A',
    ['--color-layer-a' as string]: '#F5A623',
    ['--color-layer-b' as string]: '#1B2A4A',
    ['--color-overlay-text' as string]: '#fff',
    ['--color-overlay-glow' as string]: '#F5A623',
    ['--color-overlay-shadow' as string]: '#0004',
    ['--color-overlay-highlight' as string]: '#fff5',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'clip',
    overflowClipMargin: '4px' as any,
    border: '2px solid var(--color-wrapper-border)',
    borderRadius: 'var(--rad)',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    filter: 'saturate(0.65) brightness(1.8)',
    cursor: 'pointer',
    textDecoration: 'none',
  } as React.CSSProperties;

  const btnStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: -1,
    border: 'none',
    borderRadius: 'var(--rad)',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    letterSpacing: '0.12rem',
    color: 'var(--color-btn-text)',
    backgroundColor: 'var(--color-btn-bg)',
    backgroundSize: '200% 200%',
    boxShadow: 'inset 0 0 10px 9px var(--color-btn-inset-shadow)',
    textShadow: '0 1px 3px var(--color-btn-text-shadow)',
    cursor: 'pointer',
    mixBlendMode: 'color-dodge',
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    background: 'none',
    ...sizeStyles[size],
  };

  const gradientLayerStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    left: '-160px',
    width: '500%',
    aspectRatio: '1',
    background: 'radial-gradient(ellipse at 65% 180%, var(--color-layer-a), var(--color-layer-b), var(--color-layer-a), var(--color-layer-b), var(--color-layer-a), var(--color-layer-b), var(--color-layer-a))',
    mixBlendMode: 'difference',
    animation: 'gradBtn-rotate 8s linear infinite',
  };

  const gradientLayerBStyle: React.CSSProperties = {
    ...gradientLayerStyle,
    mixBlendMode: 'color-dodge',
  };

  const textOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 2,
    borderRadius: 'var(--rad)',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    letterSpacing: '0.12rem',
    color: 'var(--color-overlay-text)',
    textShadow: '0 0 4px var(--color-overlay-glow)',
    boxShadow: 'inset 0 -4px 4px 0 var(--color-overlay-shadow), inset 0 4px 4px 0 var(--color-overlay-highlight)',
    mixBlendMode: 'multiply',
    transition: 'transform 0.3s ease',
    animation: 'gradBtn-opacityPulse 5s ease infinite',
    ...sizeStyles[size],
  };

  const lightStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 1,
    borderRadius: '50px',
    width: '80%',
    height: '1.9rem',
    aspectRatio: '1',
    backgroundColor: '#fff5',
    filter: 'blur(5px)',
    animation: 'gradBtn-pulse 3s ease-in-out infinite',
  };

  const inner = (
    <div style={style} className={`grad-btn-wrapper ${className}`}>
      <style>{`
        @keyframes gradBtn-rotate {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gradBtn-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.1; }
        }
        @keyframes gradBtn-opacityPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        .grad-btn-wrapper:hover .grad-btn-text-overlay { transform: scale(1.08); }
        .grad-btn-wrapper:active .grad-btn-text-overlay { transform: scale(0.95); }
      `}</style>
      <div style={gradientLayerStyle} />
      <div style={gradientLayerBStyle} />
      <button style={btnStyle} onClick={onClick}>
        {children}
      </button>
      <div style={textOverlayStyle} className="grad-btn-text-overlay">
        {children}
      </div>
      <div style={lightStyle} />
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', display: 'inline-flex' }}>
        {inner}
      </a>
    );
  }

  return inner;
}
