import React, { useId } from 'react';

interface HologramCubeProps {
  color?: string; // accent color in hex, e.g. "#F5A623"
  title: string;
  lines?: string[]; // extra hologram text lines
}

/**
 * Animated SVG cube with floating particles (uiverse.io by Juanes200122)
 * and hologram text rising from the cube.
 */
export default function HologramCube({ color = '#F5A623', title, lines = [] }: HologramCubeProps) {
  const uid = useId().replace(/:/g, '');

  return (
    <div className="hologram-cube-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: typeof window !== 'undefined' && window.innerWidth < 400 ? 'scale(0.75)' : typeof window !== 'undefined' && window.innerWidth < 640 ? 'scale(0.85)' : 'scale(1)', transformOrigin: 'top center' }}>
      <style>{`
        .hc-${uid} #svg-global { overflow: visible; }

        @keyframes hc-fade-particles-${uid} {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        @keyframes hc-floatUp-${uid} {
          0%   { transform: translateY(0);     opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(-40px); opacity: 0; }
        }
        @keyframes hc-bounce-${uid} {
          0%, 100% { transform: translateY(0);  }
          50%      { transform: translateY(-3px); }
        }
        @keyframes hc-hologram-rise-${uid} {
          0%   { transform: translateY(18px); opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateY(-6px); opacity: 0; }
        }
        @keyframes hc-scanline-${uid} {
          0%   { transform: translateY(-100%); opacity: 0.6; }
          100% { transform: translateY(100%);  opacity: 0; }
        }

        .hc-${uid} .hc-particles { animation: hc-fade-particles-${uid} 5s infinite alternate; }
        .hc-${uid} .hc-particle  { animation: hc-floatUp-${uid} linear infinite; }
        .hc-${uid} .hc-p1 { animation-duration:2.2s; animation-delay:0s; }
        .hc-${uid} .hc-p2 { animation-duration:2.5s; animation-delay:0.3s; }
        .hc-${uid} .hc-p3 { animation-duration:2s;   animation-delay:0.6s; }
        .hc-${uid} .hc-p4 { animation-duration:2.8s; animation-delay:0.2s; }
        .hc-${uid} .hc-p5 { animation-duration:2.3s; animation-delay:0.4s; }
        .hc-${uid} .hc-p6 { animation-duration:3s;   animation-delay:0.1s; }
        .hc-${uid} .hc-p7 { animation-duration:2.1s; animation-delay:0.5s; }
        .hc-${uid} .hc-p8 { animation-duration:2.6s; animation-delay:0.2s; }
        .hc-${uid} .hc-p9 { animation-duration:2.4s; animation-delay:0.3s; }

        .hc-${uid} .hc-line-v1,
        .hc-${uid} .hc-line-v2,
        .hc-${uid} .hc-node-server,
        .hc-${uid} .hc-panel-right,
        .hc-${uid} .hc-reflectors,
        .hc-${uid} .hc-particles {
          animation: hc-bounce-${uid} 3s ease-in-out infinite alternate;
        }
        .hc-${uid} .hc-line-v2   { animation-delay: 0.2s; }
        .hc-${uid} .hc-node-server,
        .hc-${uid} .hc-panel-right,
        .hc-${uid} .hc-reflectors,
        .hc-${uid} .hc-particles  { animation-delay: 0.4s; }

        .hc-${uid} .hc-holo-text {
          animation: hc-hologram-rise-${uid} 3.5s ease-in-out infinite;
        }
        .hc-${uid} .hc-holo-line1 { animation-delay: 0s; }
        .hc-${uid} .hc-holo-line2 { animation-delay: 0.4s; }
        .hc-${uid} .hc-holo-line3 { animation-delay: 0.8s; }

        .hc-${uid} .hc-scanline {
          animation: hc-scanline-${uid} 2s linear infinite;
        }
      `}</style>

      <div className={`hc-${uid}`} style={{ position: 'relative', width: 140, height: 160 }}>
        {/* Hologram text rising above cube */}
        <div style={{
          position: 'absolute',
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 160,
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          overflow: 'hidden',
          height: 60,
        }}>
          {/* Scan line */}
          <div className="hc-scanline" style={{
            position: 'absolute',
            left: 0, right: 0, height: 2,
            background: `linear-gradient(to right, transparent, ${color}88, transparent)`,
            zIndex: 11,
          }} />
          <div className="hc-holo-text hc-holo-line1" style={{
            color,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textShadow: `0 0 8px ${color}, 0 0 16px ${color}88`,
            lineHeight: 1.4,
            fontFamily: 'monospace',
          }}>
            {title}
          </div>
          {lines.map((l, idx) => (
            <div key={idx} className={`hc-holo-text hc-holo-line${idx + 2}`} style={{
              color: `${color}cc`,
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textShadow: `0 0 6px ${color}88`,
              lineHeight: 1.4,
              fontFamily: 'monospace',
            }}>
              {l}
            </div>
          ))}
        </div>

        {/* SVG Cube */}
        <svg
          id="svg-global"
          viewBox="0 0 200 200"
          width="140"
          height="160"
          style={{ marginTop: 40, overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-top-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={color} stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id={`grad-left-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B2A4A" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0d1628" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id={`grad-right-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0d1628" stopOpacity="0.7" />
            </linearGradient>
            <filter id={`glow-${uid}`}>
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Cube body */}
          {/* Top face */}
          <polygon
            className="hc-node-server"
            points="100,40 155,70 100,100 45,70"
            fill={`url(#grad-top-${uid})`}
            stroke={color}
            strokeWidth="1.2"
            filter={`url(#glow-${uid})`}
          />
          {/* Left face */}
          <polygon
            className="hc-line-v1"
            points="45,70 100,100 100,145 45,115"
            fill={`url(#grad-left-${uid})`}
            stroke={color}
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
          {/* Right face */}
          <polygon
            className="hc-line-v2"
            points="100,100 155,70 155,115 100,145"
            fill={`url(#grad-right-${uid})`}
            stroke={color}
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Edge highlights */}
          <line x1="100" y1="40" x2="100" y2="100" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
          <line x1="100" y1="100" x2="100" y2="145" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />

          {/* Reflectors (small accent lines on top face) */}
          <g className="hc-reflectors">
            <line x1="100" y1="55" x2="140" y2="73" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round" />
            <line x1="100" y1="65" x2="130" y2="78" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
          </g>

          {/* Panel right (decorative lines on right face) */}
          <g className="hc-panel-right">
            <line x1="120" y1="105" x2="148" y2="88" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" strokeLinecap="round" />
            <line x1="120" y1="115" x2="148" y2="98" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" strokeLinecap="round" />
          </g>

          {/* Floating particles */}
          <g className="hc-particles">
            <circle className="hc-particle hc-p1" cx="80"  cy="95"  r="2" fill={color} opacity="0.9" />
            <circle className="hc-particle hc-p2" cx="100" cy="90"  r="1.5" fill={color} opacity="0.8" />
            <circle className="hc-particle hc-p3" cx="120" cy="95"  r="2" fill={color} opacity="0.9" />
            <circle className="hc-particle hc-p4" cx="90"  cy="88"  r="1.2" fill={color} opacity="0.7" />
            <circle className="hc-particle hc-p5" cx="110" cy="92"  r="1.8" fill={color} opacity="0.85" />
            <circle className="hc-particle hc-p6" cx="75"  cy="100" r="1.5" fill={color} opacity="0.75" />
            <circle className="hc-particle hc-p7" cx="125" cy="88"  r="1.2" fill={color} opacity="0.8" />
            <circle className="hc-particle hc-p8" cx="95"  cy="98"  r="2" fill={color} opacity="0.9" />
            <circle className="hc-particle hc-p9" cx="115" cy="85"  r="1.5" fill={color} opacity="0.7" />
          </g>

          {/* Base glow ring */}
          <ellipse cx="100" cy="145" rx="40" ry="8" fill={color} opacity="0.12" />
          <ellipse cx="100" cy="145" rx="28" ry="5" fill={color} opacity="0.18" />
        </svg>
      </div>
    </div>
  );
}
