import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * ScrollDownArrow — mobile-only animated scroll hint shown at the bottom of hero sections.
 * Hidden on md+ screens (desktop has enough visual cues).
 *
 * Usage:
 *   <ScrollDownArrow />          — plain chevron, scrolls to next section
 *   <ScrollDownArrow targetId="features" />  — scrolls to element with that id
 */
interface ScrollDownArrowProps {
  targetId?: string;
  className?: string;
}

export default function ScrollDownArrow({ targetId, className = '' }: ScrollDownArrowProps) {
  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Fallback: scroll one viewport height down
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div
      className={`flex md:hidden justify-center pb-6 pt-2 ${className}`}
      aria-hidden="true"
    >
      <motion.button
        onClick={handleClick}
        aria-label="גלול למטה"
        className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-none p-0 outline-none"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {/* Label */}
        <motion.span
          className="text-xs font-medium tracking-widest uppercase select-none"
          style={{ color: 'rgba(200,200,208,0.6)', letterSpacing: '0.15em' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          גלול
        </motion.span>

        {/* Animated double-chevron */}
        <div className="flex flex-col items-center -space-y-3">
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          >
            <ChevronDown
              style={{ color: 'rgba(200,200,208,0.7)', filter: 'drop-shadow(0 0 4px rgba(200,200,208,0.5))' }}
              className="w-6 h-6"
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            <ChevronDown
              style={{ color: 'rgba(200,200,208,0.4)', filter: 'drop-shadow(0 0 4px rgba(200,200,208,0.3))' }}
              className="w-6 h-6"
            />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}
