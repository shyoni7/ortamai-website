import React, { useState } from 'react';
import { Shield, Crosshair, Search, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RoomScene, FloatingObject, RoomPanel } from '@/components/RoomScene';
import GradientButton from '@/components/GradientButton';
import SEO from '@/components/SEO';
import { CYBER_COURSES, type CyberCourse } from '@/data/roomContent';

const ICONS: Record<string, React.ElementType> = {
  'soc-analyst': Shield,
  'threat-hunting': Crosshair,
  'digital-forensics': Search,
};

export default function CyberRoom() {
  const { lang } = useLanguage();
  const isRtl = lang === 'he';
  const [open, setOpen] = useState<CyberCourse | null>(null);

  return (
    <>
      <SEO
        title={isRtl ? 'חדר הסייבר | קורסי אבטחת סייבר — ORTAM AI' : 'The Cyber Room | Cyber Security Courses — ORTAM AI'}
        description={isRtl
          ? 'קורסי סייבר מקצועיים: SOC Analyst, Threat Hunting ו-Digital Forensics. הכשרות מעשיות בעולם ה-AI.'
          : 'Professional cyber security courses: SOC Analyst, Threat Hunting and Digital Forensics.'}
        canonical="/cyber"
      />
      <RoomScene rooms={['cyber']} fallback="cyber"
        title={isRtl ? 'חדר הסייבר' : 'The Cyber Room'}
        subtitle={isRtl ? 'בחרו מסלול — כל קורס פותח את תוכנית הלימודים המלאה' : 'Pick a track — each course opens its full syllabus'}>
        <div className="max-w-5xl mx-auto px-4 pt-10 md:pt-16 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CYBER_COURSES.map((course, i) => {
            const Icon = ICONS[course.slug] ?? Shield;
            return (
              <FloatingObject key={course.slug} delay={i * 0.25} drift={12 + i * 3}
                onClick={() => setOpen(course)} className="p-6 text-center">
                <div className="inline-flex p-3.5 rounded-2xl mb-4"
                  style={{ background: 'rgba(200,200,208,0.1)', border: '1px solid rgba(200,200,208,0.25)' }}>
                  <Icon className="w-7 h-7" style={{ color: '#C8C8D0' }} />
                </div>
                <h2 className="text-xl font-bold text-white mb-1.5" dir="ltr">{course.name}</h2>
                <p className="text-sm mb-4" style={{ color: 'rgba(200,200,208,0.8)' }}>{course.tagline}</p>
                <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(200,200,208,0.6)' }}>
                  <Clock className="w-3.5 h-3.5" />
                  {course.duration}
                </div>
                <p className="mt-4 text-sm font-semibold underline underline-offset-4" style={{ color: '#E8E8F0' }}>
                  {isRtl ? 'לתוכנית הלימודים' : 'View syllabus'}
                </p>
              </FloatingObject>
            );
          })}
        </div>
      </RoomScene>

      <RoomPanel open={open !== null} onClose={() => setOpen(null)} title={open?.name ?? ''}>
        {open && (
          <div className="space-y-5">
            <p style={{ color: 'rgba(200,200,208,0.85)' }}>{open.tagline}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0' }}>{open.duration}</span>
              <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0' }}>{open.level}</span>
            </div>

            <div>
              <h3 className="font-bold text-white mb-3">{isRtl ? 'תוכנית הלימודים' : 'Syllabus'}</h3>
              <div className="space-y-4">
                {open.syllabus.map((mod, i) => (
                  <div key={mod.title} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,200,208,0.15)' }}>
                    <p className="font-semibold text-white mb-2">
                      <span style={{ color: 'rgba(200,200,208,0.5)' }}>{String(i + 1).padStart(2, '0')} · </span>
                      {mod.title}
                    </p>
                    <ul className="space-y-1.5">
                      {mod.topics.map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(200,200,208,0.75)' }}>
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'rgba(200,200,208,0.6)' }} />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">{isRtl ? 'מה יוצאים עם זה' : 'Outcomes'}</h3>
              <ul className="space-y-1.5">
                {open.outcomes.map(o => (
                  <li key={o} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(200,200,208,0.85)' }}>
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C8C8D0' }} />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <GradientButton href="/contact" size="md" className="w-full justify-center">
              {isRtl ? 'דברו איתנו על הקורס' : 'Talk to us about this course'}
            </GradientButton>
          </div>
        )}
      </RoomPanel>
    </>
  );
}
