import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function MagneticButton({ children, className, onClick, href, ...props }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // משיכה מגנטית עדינה
    x.set(distanceX * 0.15);
    y.set(distanceY * 0.15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="relative inline-block"
    >
      <Button
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
        
        {/* מטוס נייר מעופף */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute left-1/2 top-1/2"
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
            animate={isHovered ? {
              x: [0, 60, 80],
              y: [0, -30, -50],
              opacity: [0, 1, 1, 0],
              rotate: [0, -15, -20],
              scale: [0.8, 1, 1.1, 1]
            } : {
              x: 0,
              y: 0,
              opacity: 0,
              rotate: 0
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white drop-shadow-lg"
            >
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </Button>

      {/* Shadow משתנה */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-lg blur-xl opacity-0"
          animate={isHovered ? {
            opacity: 0.3,
            scale: 1.1
          } : {
            opacity: 0,
            scale: 1
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(to right, rgb(6, 182, 212), rgb(59, 130, 246))"
          }}
        />
      )}
    </motion.div>
  );
}