import React, { useState } from 'react';
import { Clock, Users, Award, CheckCircle, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RoomScene, FloatingObject, RoomPanel } from '@/components/RoomScene';
import GradientButton from '@/components/GradientButton';
import SEO from '@/components/SEO';
import { academyServiceSchema } from '@/lib/seoSchemas';
import {
  trainingPrograms, publicCourses,
  type TrainingProgram, type PublicCourse,
} from '@/data/academyCatalog';

/**
 * The academy classroom as an in-room experience: every training program and
 * public course floats inside the room; clicking opens its full program.
 */
export default function AcademyRoom() {
  const { lang } = useLanguage();
  const isRtl = lang === 'he';
  const [openProgram, setOpenProgram] = useState<TrainingProgram | null>(null);
  const [openCourse, setOpenCourse] = useState<PublicCourse | null>(null);

  return (
    <>
      <SEO
        title={isRtl ? 'כיתת ההכשרות | קורסי AI לארגונים ועסקים — ORTAM AI' : 'The Academy Classroom | AI Courses — ORTAM AI'}
        description={isRtl
          ? 'כל ההכשרות והקורסים של ORTAM AI בתוך כיתת ההכשרות: הכשרות למנהלים, שיווק, פיננסים, מורים ועוד — וקורסים פתוחים לציבור.'
          : 'All ORTAM AI trainings and courses inside the academy classroom.'}
        canonical="/academy"
        schema={academyServiceSchema}
      />
      <RoomScene rooms={['academy']} fallback="academy"
        title={isRtl ? 'כיתת ההכשרות' : 'The Academy Classroom'}
        subtitle={isRtl ? 'כל הקורסים וההכשרות שלנו מרחפים כאן — לחצו על אחד כדי לפתוח אותו' : 'All our trainings and courses float here — click one to open it'}>

        <div className="max-w-6xl mx-auto px-4 pt-10 md:pt-14 pb-24">
          {/* Organizational trainings */}
          <h2 className="text-center font-bold text-white mb-6 text-lg md:text-2xl"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
            {isRtl ? 'הכשרות לארגונים ולצוותים' : 'Trainings for Organizations & Teams'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-14">
            {trainingPrograms.map((program, i) => (
              <FloatingObject key={program.id} delay={(i % 4) * 0.2} drift={8 + (i % 3) * 4}
                onClick={() => setOpenProgram(program)} className="p-4 text-center">
                <h3 className="font-bold text-white text-sm md:text-base leading-snug mb-2">
                  {isRtl ? program.title : program.titleEn}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-xs" style={{ color: 'rgba(200,200,208,0.7)' }}>
                  <Clock className="w-3.5 h-3.5" />
                  {program.hours}
                </div>
              </FloatingObject>
            ))}
          </div>

          {/* Public courses */}
          <h2 className="text-center font-bold text-white mb-6 text-lg md:text-2xl"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
            {isRtl ? 'קורסים פתוחים לציבור' : 'Public Courses'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {publicCourses.map((course, i) => (
              <FloatingObject key={course.title} delay={(i % 4) * 0.25 + 0.1} drift={7 + (i % 3) * 5}
                onClick={() => setOpenCourse(course)} className="p-4 text-center">
                <h3 className="font-bold text-white text-sm md:text-base leading-snug mb-2">
                  {isRtl ? course.title : course.titleEn}
                </h3>
                <div className="flex items-center justify-center gap-2 text-xs flex-wrap" style={{ color: 'rgba(200,200,208,0.7)' }}>
                  <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{isRtl ? course.duration : course.durationEn}</span>
                  <span>· {isRtl ? course.level : course.levelEn}</span>
                </div>
              </FloatingObject>
            ))}
          </div>
        </div>
      </RoomScene>

      {/* Training program panel */}
      <RoomPanel open={openProgram !== null} onClose={() => setOpenProgram(null)}
        title={openProgram ? (isRtl ? openProgram.title : openProgram.titleEn) : ''}>
        {openProgram && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full inline-flex items-center gap-1" style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0' }}>
                <Users className="w-3.5 h-3.5" />{isRtl ? openProgram.audience : openProgram.audienceEn}
              </span>
              <span className="px-3 py-1 rounded-full inline-flex items-center gap-1" style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0' }}>
                <Clock className="w-3.5 h-3.5" />{openProgram.hours}
              </span>
              <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0' }}>
                {isRtl ? openProgram.level : openProgram.levelEn}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-white mb-3">{isRtl ? 'תוכנית ההכשרה' : 'Program'}</h3>
              <div className="space-y-3">
                {(isRtl ? openProgram.modules : openProgram.modulesEn).map((mod, i) => (
                  <div key={mod.title} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,200,208,0.15)' }}>
                    <p className="font-semibold text-white mb-1.5">
                      <span style={{ color: 'rgba(200,200,208,0.5)' }}>{String(i + 1).padStart(2, '0')} · </span>
                      {mod.title}
                      <span className="text-xs font-normal ms-2" style={{ color: 'rgba(200,200,208,0.55)' }}>({mod.duration})</span>
                    </p>
                    <ul className="space-y-1">
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
              <h3 className="font-bold text-white mb-2">{isRtl ? 'תוצאות ההכשרה' : 'Outcomes'}</h3>
              <ul className="space-y-1.5">
                {(isRtl ? openProgram.outcomes : openProgram.outcomesEn).map(o => (
                  <li key={o} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(200,200,208,0.85)' }}>
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C8C8D0' }} />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {openProgram.tools.length > 0 && (
              <div>
                <h3 className="font-bold text-white mb-2 inline-flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" style={{ color: '#C8C8D0' }} />
                  {isRtl ? 'כלים שנלמד' : 'Tools'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {openProgram.tools.map(tool => (
                    <span key={tool} className="text-xs px-3 py-1 rounded-full" dir="ltr"
                      style={{ background: 'rgba(200,200,208,0.1)', color: 'rgba(200,200,208,0.85)', border: '1px solid rgba(200,200,208,0.2)' }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <GradientButton href="/contact" size="md" className="w-full justify-center">
              {isRtl ? 'תיאום הכשרה לארגון שלכם' : 'Book this training for your organization'}
            </GradientButton>
          </div>
        )}
      </RoomPanel>

      {/* Public course panel */}
      <RoomPanel open={openCourse !== null} onClose={() => setOpenCourse(null)}
        title={openCourse ? (isRtl ? openCourse.title : openCourse.titleEn) : ''}>
        {openCourse && (
          <div className="space-y-5">
            <p style={{ color: 'rgba(200,200,208,0.85)' }}>{isRtl ? openCourse.desc : openCourse.descEn}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full inline-flex items-center gap-1" style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0' }}>
                <Clock className="w-3.5 h-3.5" />{isRtl ? openCourse.duration : openCourse.durationEn}
              </span>
              <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0' }}>
                {isRtl ? openCourse.level : openCourse.levelEn}
              </span>
              {openCourse.ministrySupervised && (
                <span className="px-3 py-1 rounded-full inline-flex items-center gap-1" style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0' }}>
                  <Award className="w-3.5 h-3.5" />{isRtl ? 'בפיקוח משרד העבודה' : 'Ministry supervised'}
                </span>
              )}
            </div>
            {openCourse.externalLink ? (
              <a href={openCourse.externalLink} target="_blank" rel="noopener noreferrer" className="block">
                <GradientButton size="md" className="w-full justify-center">
                  {isRtl ? 'הירשמו לקורס' : 'Enroll now'}
                </GradientButton>
              </a>
            ) : (
              <GradientButton href="/courses" size="md" className="w-full justify-center">
                {isRtl ? 'להזמנת מקום בקורס' : 'Book a spot'}
              </GradientButton>
            )}
          </div>
        )}
      </RoomPanel>
    </>
  );
}
