import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import type { Room } from '@/components/LobbyHub';

/**
 * Plays a room's dolly-in sequence on a viewport overlay that OUTLIVES the
 * route change: frames play, navigation happens near the end, the last frame
 * holds while the destination page (whose hero is that same room) mounts, and
 * only then the overlay fades away — so entering a room lands you inside it.
 */

interface RoomTransitionValue {
  enterRoom: (room: Room) => void;
  active: boolean;
}

const RoomTransitionContext = createContext<RoomTransitionValue>({
  enterRoom: () => {},
  active: false,
});

export function useRoomTransition() {
  return useContext(RoomTransitionContext);
}

function frameUrl(slug: string, index: number): string {
  return `/seq/enter/${slug}/${String(index + 1).padStart(4, '0')}.webp`;
}

export function RoomTransitionProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, navigate] = useLocation();

  const enterRoom = useCallback((r: Room) => {
    // Lets the destination page pick the matching room backdrop.
    try { sessionStorage.setItem('ortam-entered-room', r.slug); } catch { /* private mode */ }
    setFadingOut(false);
    setRoom(r);
  }, []);

  useEffect(() => {
    if (!room) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    for (let i = 0; i < room.frames; i++) {
      const img = new Image();
      img.src = frameUrl(room.slug, i);
      img.onload = img.onerror = () => { loaded += 1; };
      images.push(img);
    }

    const draw = (img: HTMLImageElement) => {
      if (!ctx) return;
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
    };

    let index = 0;
    let navigated = false;
    const fps = 18;
    const tick = () => {
      if (cancelled) return;
      const img = images[index];
      if (img?.complete && img.naturalWidth > 0) {
        draw(img);
        index += 1;
      } else if (loaded >= room.frames) {
        index += 1; // failed frame — skip rather than stall
      }
      // Navigate while the last frames still play, so the page mounts
      // underneath the overlay and the reveal is seamless.
      if (!navigated && index >= room.frames - 4) {
        navigated = true;
        window.scrollTo(0, 0);
        navigate(room.href);
      }
      if (index >= room.frames) {
        // Hold the final frame while the destination hero settles, then reveal.
        window.setTimeout(() => {
          if (cancelled) return;
          setFadingOut(true);
          window.setTimeout(() => { if (!cancelled) { setRoom(null); setFadingOut(false); } }, 650);
        }, 450);
        return;
      }
      window.setTimeout(tick, 1000 / fps);
    };
    tick();
    return () => { cancelled = true; };
  }, [room, navigate]);

  return (
    <RoomTransitionContext.Provider value={{ enterRoom, active: room !== null }}>
      {children}
      {room && (
        <div className="fixed inset-0 z-[95]"
          style={{
            background: '#08080C',
            opacity: fadingOut ? 0 : 1,
            transition: 'opacity 650ms ease',
            pointerEvents: fadingOut ? 'none' : 'auto',
          }}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
      )}
    </RoomTransitionContext.Provider>
  );
}
