import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ProcessTimeline({ steps }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Connection Line */}
      <div className="absolute top-0 bottom-0 right-8 w-0.5 bg-gradient-to-b from-cyan-400/50 via-purple-400/50 to-cyan-400/50" />

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start gap-6"
          >
            {/* Checkpoint */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              className="relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg">
                {step.icon ? (
                  <step.icon className="w-8 h-8 text-white" />
                ) : (
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                )}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>
              {step.details && (
                <ul className="mt-4 space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}