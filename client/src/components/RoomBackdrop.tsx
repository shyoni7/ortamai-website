import React from 'react';

/**
 * Full-bleed backdrop for pages that are "rooms" of the ORTAM center.
 * Shows the still of the room the visitor just entered (kept by
 * RoomTransitionContext in sessionStorage) so the entry animation lands
 * directly inside the page; falls back to the page's default room.
 */
export default function RoomBackdrop({ rooms, fallback }: {
  /** Room slugs this page can represent (must have /seq/enter/<slug>/still.jpg). */
  rooms: string[];
  fallback: string;
}) {
  let slug = fallback;
  try {
    const entered = sessionStorage.getItem('ortam-entered-room');
    if (entered && rooms.includes(entered)) slug = entered;
  } catch { /* private mode */ }

  return (
    <>
      <img src={`/seq/enter/${slug}/still.jpg`} alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.85 }} />
      {/* Legibility gradient — keeps the room visible, anchors the text */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(8,8,12,0.45) 0%, rgba(8,8,12,0.25) 40%, rgba(8,8,12,0.7) 80%, #08080C 100%)',
      }} />
    </>
  );
}
