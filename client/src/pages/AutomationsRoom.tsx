import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, ArrowUpLeft, ArrowUpRight, Bot, Zap, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RoomScene } from '@/components/RoomScene';
import SEO from '@/components/SEO';
import { AUTOMATIONS_URL } from '@/data/roomContent';

/**
 * The agents/automations room: one levitating "automation core" — an orbiting
 * body of rings and satellites — that opens the automations platform.
 */
export default function AutomationsRoom() {
  const { lang } = useLanguage();
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const satellites = [
    { icon: Bot, angle: 0 },
    { icon: Zap, angle: 120 },
    { icon: MessageSquare, angle: 240 },
  ];

  return (
    <>
      <SEO
        title={isRtl ? 'חדר הסוכנים | אוטומציות וסוכני AI — ORTAM AI' : 'The Agents Room | Automations & AI Agents — ORTAM AI'}
        description={isRtl
          ? 'אוטומציות וסוכני AI שעובדים בשבילכם — פלטפורמת האוטומציות של ORTAM AI.'
          : 'Automations and AI agents working for you — the ORTAM AI automations platform.'}
        canonical="/automations"
      />
      <RoomScene rooms={['automations']} fallback="automations"
        title={isRtl ? 'חדר הסוכנים' : 'The Agents Room'}
        subtitle={isRtl ? 'געו בליבת האוטומציות כדי להיכנס לפלטפורמה' : 'Touch the automation core to enter the platform'}>

        <div className="flex flex-col items-center pt-10 md:pt-16 pb-24 px-4">
          {/* The levitating automation core */}
          <motion.a href={AUTOMATIONS_URL} target="_blank" rel="noopener noreferrer"
            aria-label={isRtl ? 'לפלטפורמת האוטומציות' : 'To the automations platform'}
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
            className="relative block cursor-pointer"
            style={{ width: 'min(300px, 70vw)', height: 'min(300px, 70vw)' }}>

            {/* Glow */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(200,200,208,0.28) 0%, rgba(200,200,208,0.06) 55%, transparent 75%)', filter: 'blur(6px)' }} />

            {/* Orbit rings */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[6%] rounded-full"
              style={{ border: '1.5px solid rgba(200,200,208,0.4)', transform: 'rotateX(60deg)' }} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[16%] rounded-full"
              style={{ border: '1px dashed rgba(200,200,208,0.35)' }} />

            {/* Core */}
            <div className="absolute inset-[28%] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(150deg, #1A1A22 0%, #0B0B10 70%)',
                border: '1px solid rgba(200,200,208,0.5)',
                boxShadow: '0 0 60px rgba(200,200,208,0.25), inset 0 2px 12px rgba(255,255,255,0.08)',
              }}>
              <Workflow className="w-1/2 h-1/2" style={{ color: '#E8E8F0' }} />
            </div>

            {/* Orbiting satellites */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0">
              {satellites.map(({ icon: Icon, angle }) => (
                <div key={angle} className="absolute w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    top: '50%', left: '50%',
                    transform: `rotate(${angle}deg) translateX(min(150px, 35vw)) rotate(-${angle}deg) translate(-50%, -50%)`,
                    background: 'rgba(8,8,12,0.85)', border: '1px solid rgba(200,200,208,0.4)',
                  }}>
                  <Icon className="w-5 h-5" style={{ color: '#C8C8D0' }} />
                </div>
              ))}
            </motion.div>
          </motion.a>

          <motion.a href={AUTOMATIONS_URL} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm md:text-base cursor-pointer"
            style={{ background: '#FFFFFF', color: '#08080C', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
            {isRtl ? 'כניסה לפלטפורמת האוטומציות' : 'Enter the automations platform'}
            <ArrowIcon className="w-4 h-4" />
          </motion.a>
        </div>
      </RoomScene>
    </>
  );
}
