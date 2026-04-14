import React, { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgress({ color = "cyan" }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const colorClasses = {
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    gradient: "bg-gradient-to-r from-cyan-500 to-purple-500"
  };

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div ref={ref} className="relative">
      <motion.div
        className={`fixed top-20 right-0 left-0 h-1 origin-right z-40 ${colorClasses[color] || colorClasses.gradient}`}
        style={{ scaleX }}
      />
    </div>
  );
}