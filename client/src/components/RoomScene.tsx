import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DoorOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import RoomBackdrop from './RoomBackdrop';

/**
 * Returning to the lobby should land IN the lobby, not at the top of the
 * flight. The flag makes the home page jump straight to its end (where the
 * lobby lives) on the next mount.
 */
export const RETURN_TO_LOBBY_KEY = 'ortam-return-to-lobby';

export function useLobbyExit() {
  const [, navigate] = useLocation();
  return () => {
    try { sessionStorage.setItem(RETURN_TO_LOBBY_KEY, '1'); } catch { /* private mode */ }
    navigate('/');
  };
}

/** A floating sign at the end of a room that walks the visitor back out. */
export function LobbyExitSign() {
  const { lang } = useLanguage();
  const isRtl = lang === 'he';
  const exitToLobby = useLobbyExit();
  return (
    <div className="relative z-20 flex justify-center px-4 pb-14 md:pb-20">
      <motion.button onClick={exitToLobby}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
        className="cursor-pointer text-center rounded-2xl px-8 py-4"
        style={{
          background: 'rgba(8,8,12,0.68)',
          border: '1px solid rgba(200,200,208,0.35)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.45), 0 0 24px rgba(200,200,208,0.08)',
        }}>
        <span className="flex items-center justify-center gap-2 font-bold text-white text-base md:text-lg">
          <DoorOpen className="w-5 h-5" style={{ color: '#C8C8D0' }} />
          {isRtl ? 'חזרה ללובי' : 'Back to the lobby'}
        </span>
        <span className="block mt-1 text-xs md:text-sm" style={{ color: 'rgba(200,200,208,0.7)' }}>
          {isRtl ? 'להמשך הסיור במרכז' : 'Continue the tour of the center'}
        </span>
      </motion.button>
    </div>
  );
}

/**
 * An immersive "room" page: the room's photo fills the viewport and content
 * floats inside it as glass objects drifting in space. Clicking an object
 * opens a panel (syllabus / details) over the room.
 */

export function RoomScene({ rooms, fallback, title, subtitle, children }: {
  rooms: string[];
  fallback: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const { dir, lang } = useLanguage();
  const isRtl = lang === 'he';
  const sceneRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const exitToLobby = useLobbyExit();

  // Gentle mouse parallax: the floating layer leans toward the cursor.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = sceneRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={sceneRef} dir={dir} className="relative" style={{ minHeight: '100svh', background: '#08080C' }}>
      {/* Fixed backdrop: the room stays put while the content floats and
          scrolls inside it. */}
      <div className="fixed inset-0 z-0">
        <RoomBackdrop rooms={rooms} fallback={fallback} />
      </div>

      {/* Back to lobby */}
      <div className="absolute top-20 md:top-24 inset-x-0 flex justify-center z-30">
        <button onClick={exitToLobby} type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors hover:bg-white/10"
          style={{ background: 'rgba(8,8,12,0.55)', color: '#C8C8D0', border: '1px solid rgba(200,200,208,0.25)', backdropFilter: 'blur(8px)' }}>
          {isRtl ? '→ חזרה ללובי' : '← Back to the lobby'}
        </button>
      </div>

      {/* Room title */}
      <div className="relative z-20 pt-32 md:pt-40 text-center px-4 pointer-events-none">
        <h1 className="font-bold text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', textShadow: '0 2px 24px rgba(0,0,0,0.8)' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-base md:text-lg" style={{ color: 'rgba(220,220,228,0.95)', textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Floating layer with parallax lean */}
      <div className="relative z-20"
        style={{
          transform: `translate(${tilt.x * -10}px, ${tilt.y * -6}px)`,
          transition: 'transform 300ms ease-out',
        }}>
        {children}
      </div>

      {/* Scrolling to the end of the room reaches the way out. */}
      <LobbyExitSign />
    </div>
  );
}

/** A glass object drifting in the room; click to open its content. */
export function FloatingObject({ children, delay = 0, drift = 10, className = '', onClick }: {
  children: React.ReactNode;
  delay?: number;
  /** Vertical float amplitude in px. */
  drift?: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: [0, -drift, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 5 + delay * 1.7, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      style={{
        background: 'rgba(8,8,12,0.68)',
        border: '1px solid rgba(200,200,208,0.35)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.45), 0 0 24px rgba(200,200,208,0.08)',
        borderRadius: '1.25rem',
      }}
    >
      {children}
    </motion.div>
  );
}

/** Content panel that opens over the room (syllabus, details, forms). */
export function RoomPanel({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const { dir, lang } = useLanguage();
  const isRtl = lang === 'he';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          dir={dir} className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog" aria-modal="true" aria-label={title}>
          <div className="absolute inset-0 cursor-pointer" style={{ background: 'rgba(8,8,12,0.72)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
          <motion.div initial={{ y: 28, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 28, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl max-h-[86vh] overflow-y-auto rounded-3xl p-6 md:p-8"
            style={{ background: 'linear-gradient(165deg, #14141B 0%, #0B0B10 60%, #08080C 100%)', border: '1px solid rgba(200,200,208,0.3)', boxShadow: '0 32px 90px rgba(0,0,0,0.7)' }}>
            <button onClick={onClose} aria-label={isRtl ? 'סגירה' : 'Close'} type="button"
              className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} w-11 h-11 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-white/10`}
              style={{ color: '#C8C8D0' }}>
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4 pe-10">{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
