import React, { useId } from 'react';

export type SphereVariant = 'obsidian' | 'platinum' | 'pearl';

interface MetallicSphereProps {
  variant?: SphereVariant;
  size?: number; // diameter in px, default 120
}

/**
 * A pure-CSS metallic sphere that:
 *  - floats up/down (sine wave)
 *  - has a subtle equatorial ring that "spins" via a CSS perspective trick
 *  - emits small particle dots that drift upward (energy rays toward the card title)
 *  - casts a soft shadow on the ground beneath it
 */
export default function MetallicSphere({ variant = 'platinum', size = 120 }: MetallicSphereProps) {
  const uid = useId().replace(/:/g, '');

  // ── Palette per variant ────────────────────────────────────────────────────
  const palette = {
    obsidian: {
      base: 'radial-gradient(circle at 35% 30%, #4a4a52 0%, #1c1c24 40%, #08080C 100%)',
      highlight: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, transparent 55%)',
      rim: 'rgba(200,200,208,0.18)',
      ring: 'rgba(200,200,208,0.30)',
      particle: '#C8C8D0',
      shadow: 'rgba(0,0,0,0.45)',
      glow: 'rgba(200,200,208,0.08)',
    },
    platinum: {
      base: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #C8C8D0 35%, #8B8FA8 70%, #5a5e72 100%)',
      highlight: 'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.85) 0%, transparent 50%)',
      rim: 'rgba(255,255,255,0.40)',
      ring: 'rgba(255,255,255,0.50)',
      particle: '#8B8FA8',
      shadow: 'rgba(0,0,0,0.25)',
      glow: 'rgba(200,200,208,0.15)',
    },
    pearl: {
      base: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f0ede8 30%, #ddd8d0 65%, #b8b0a8 100%)',
      highlight: 'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.95) 0%, transparent 50%)',
      rim: 'rgba(255,255,255,0.55)',
      ring: 'rgba(255,255,255,0.60)',
      particle: '#c8c0b8',
      shadow: 'rgba(0,0,0,0.18)',
      glow: 'rgba(255,248,240,0.18)',
    },
  }[variant];

  const r = size / 2;

  // Particle positions (angle in degrees, distance from center as fraction of r)
  const particles = [
    { angle: -20, dist: 0.55, delay: 0,    dur: 2.4 },
    { angle:  10, dist: 0.45, delay: 0.4,  dur: 2.0 },
    { angle: -5,  dist: 0.60, delay: 0.8,  dur: 2.7 },
    { angle:  25, dist: 0.50, delay: 0.2,  dur: 2.2 },
    { angle: -35, dist: 0.40, delay: 0.6,  dur: 1.9 },
    { angle:  15, dist: 0.65, delay: 1.0,  dur: 2.5 },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size + 36, // extra space for shadow + particles
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <style>{`
        /* Float animation */
        @keyframes ms-float-${uid} {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        /* Spin ring (perspective illusion via scaleX) */
        @keyframes ms-ring-${uid} {
          0%   { transform: rotateX(75deg) rotateZ(0deg); }
          100% { transform: rotateX(75deg) rotateZ(360deg); }
        }
        /* Particle float upward */
        @keyframes ms-particle-${uid} {
          0%   { transform: translateY(0)   scale(1);   opacity: 0.9; }
          60%  { opacity: 0.6; }
          100% { transform: translateY(-${r * 1.6}px) scale(0.3); opacity: 0; }
        }
        /* Shadow pulse */
        @keyframes ms-shadow-${uid} {
          0%, 100% { transform: scaleX(1);   opacity: 0.45; }
          50%       { transform: scaleX(0.7); opacity: 0.25; }
        }

        .ms-sphere-${uid} {
          animation: ms-float-${uid} 3.6s ease-in-out infinite;
        }
        .ms-ring-${uid} {
          animation: ms-ring-${uid} 6s linear infinite;
        }
        .ms-shadow-${uid} {
          animation: ms-shadow-${uid} 3.6s ease-in-out infinite;
        }
      `}</style>

      {/* ── Sphere ── */}
      <div
        className={`ms-sphere-${uid}`}
        style={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          background: palette.base,
          boxShadow: `
            inset -${r * 0.15}px -${r * 0.1}px ${r * 0.3}px rgba(0,0,0,0.4),
            inset ${r * 0.1}px ${r * 0.1}px ${r * 0.2}px ${palette.rim},
            0 0 ${r * 0.6}px ${palette.glow},
            0 ${r * 0.15}px ${r * 0.5}px ${palette.shadow}
          `,
          flexShrink: 0,
        }}
      >
        {/* Specular highlight */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: palette.highlight,
          pointerEvents: 'none',
        }} />

        {/* Equatorial ring (CSS 3D perspective trick) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size * 1.22,
            height: size * 1.22,
            marginTop: -(size * 1.22) / 2,
            marginLeft: -(size * 1.22) / 2,
            borderRadius: '50%',
            border: `1.5px solid ${palette.ring}`,
            transformOrigin: 'center center',
            pointerEvents: 'none',
          }}
          className={`ms-ring-${uid}`}
        />

        {/* Particles */}
        {particles.map((p, idx) => {
          const rad = (p.angle * Math.PI) / 180;
          const px = r + Math.cos(rad) * r * p.dist - 3;
          const py = r + Math.sin(rad) * r * p.dist - 3;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: px,
                top: py,
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: palette.particle,
                boxShadow: `0 0 6px ${palette.particle}`,
                animation: `ms-particle-${uid} ${p.dur}s ease-out ${p.delay}s infinite`,
                pointerEvents: 'none',
              }}
            />
          );
        })}
      </div>

      {/* ── Ground shadow ── */}
      <div
        className={`ms-shadow-${uid}`}
        style={{
          width: size * 0.65,
          height: 10,
          borderRadius: '50%',
          background: palette.shadow,
          filter: 'blur(6px)',
          marginTop: 8,
          flexShrink: 0,
        }}
      />
    </div>
  );
}
