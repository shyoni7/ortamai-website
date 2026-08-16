import React, { useState } from 'react';
import { Target, Lightbulb, Users, Code2, CheckCircle, Send, CheckCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RoomScene, FloatingObject, RoomPanel } from '@/components/RoomScene';
import GradientButton from '@/components/GradientButton';
import SEO from '@/components/SEO';
import { incubatorServiceSchema } from '@/lib/seoSchemas';
import { trpc } from '@/lib/trpc';
import { ACCELERATOR_SERVICES, type AcceleratorService } from '@/data/roomContent';

const ICONS: Record<string, React.ElementType> = {
  discovery: Target,
  training: Lightbulb,
  implementation: Users,
  solutions: Code2,
};

/**
 * The business accelerator floor as an in-room experience: the incubator's
 * services float in the room; a dedicated object opens the consultation form.
 */
export default function IncubatorRoom() {
  const { lang } = useLanguage();
  const isRtl = lang === 'he';
  const [openService, setOpenService] = useState<AcceleratorService | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <SEO
        title={isRtl ? 'קומת האקסלרטור | חממה עסקית ושירותי AI לעסקים — ORTAM AI' : 'The Accelerator Floor | AI Business Incubator — ORTAM AI'}
        description={isRtl
          ? 'החממה העסקית של ORTAM AI לעסקים קטנים: איפיון וייעוץ, הכשרות צוות, הטמעה וליווי ופיתוח פתרונות AI מותאמים.'
          : 'The ORTAM AI business incubator for small businesses: discovery, training, implementation and custom AI solutions.'}
        canonical="/incubator"
        schema={incubatorServiceSchema}
      />
      <RoomScene rooms={['accelerator']} fallback="accelerator"
        title={isRtl ? 'קומת האקסלרטור' : 'The Accelerator Floor'}
        subtitle={isRtl ? 'החממה שלנו לעסקים קטנים — לחצו על שירות כדי לגלות מה הוא כולל' : 'Our incubator for small businesses — click a service to see what it includes'}>

        <div className="max-w-5xl mx-auto px-4 pt-10 md:pt-14 pb-24">
          {/* The incubator promise */}
          <FloatingObject delay={0} drift={6} className="p-5 md:p-6 text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-lg md:text-xl font-bold text-white mb-1.5">
              {isRtl ? 'חממת AI לעסקים קטנים' : 'An AI incubator for small businesses'}
            </h2>
            <p className="text-sm md:text-base" style={{ color: 'rgba(200,200,208,0.85)' }}>
              {isRtl
                ? 'עסק שלא עובד עם AI יישאר מאחור. אנחנו מלווים עסקים קטנים מהאיפיון הראשון ועד שה-AI עובד בשוטף — תהליך מלא תחת קורת גג אחת.'
                : "A business that doesn't work with AI falls behind. We guide small businesses from first discovery until AI runs day-to-day — one complete process under one roof."}
            </p>
          </FloatingObject>

          {/* Floating services */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12">
            {ACCELERATOR_SERVICES.map((service, i) => {
              const Icon = ICONS[service.slug] ?? Target;
              return (
                <FloatingObject key={service.slug} delay={0.15 + i * 0.2} drift={9 + (i % 3) * 4}
                  onClick={() => setOpenService(service)} className="p-4 md:p-5 text-center">
                  <div className="inline-flex p-3 rounded-2xl mb-3"
                    style={{ background: 'rgba(200,200,208,0.1)', border: '1px solid rgba(200,200,208,0.25)' }}>
                    <Icon className="w-6 h-6" style={{ color: '#C8C8D0' }} />
                  </div>
                  <h3 className="font-bold text-white text-sm md:text-base leading-snug mb-1.5">
                    {isRtl ? service.name : service.nameEn}
                  </h3>
                  <p className="text-xs md:text-sm" style={{ color: 'rgba(200,200,208,0.7)' }}>
                    {service.short}
                  </p>
                </FloatingObject>
              );
            })}
          </div>

          {/* Consultation object */}
          <FloatingObject delay={0.9} drift={7} onClick={() => setFormOpen(true)}
            className="p-6 text-center max-w-md mx-auto">
            <h3 className="text-lg font-bold text-white mb-1">
              {isRtl ? 'ספרו לנו על העסק שלכם' : 'Tell us about your business'}
            </h3>
            <p className="text-sm mb-3" style={{ color: 'rgba(200,200,208,0.75)' }}>
              {isRtl ? 'נחזור אליכם תוך 24 שעות לתיאום שיחת איפיון' : "We'll get back within 24 hours to schedule a discovery call"}
            </p>
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm"
              style={{ background: '#FFFFFF', color: '#08080C' }}>
              <Send className="w-4 h-4" />
              {isRtl ? 'תיאום שיחת איפיון' : 'Schedule a discovery call'}
            </span>
          </FloatingObject>
        </div>
      </RoomScene>

      {/* Service detail panel */}
      <RoomPanel open={openService !== null} onClose={() => setOpenService(null)}
        title={openService ? (isRtl ? openService.name : openService.nameEn) : ''}>
        {openService && (
          <div className="space-y-5">
            <p style={{ color: 'rgba(200,200,208,0.85)' }}>{openService.short}</p>
            <ul className="space-y-2">
              {openService.details.map(d => (
                <li key={d} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(200,200,208,0.85)' }}>
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C8C8D0' }} />
                  {d}
                </li>
              ))}
            </ul>
            <GradientButton size="md" className="w-full justify-center"
              onClick={() => { setOpenService(null); setFormOpen(true); }}>
              {isRtl ? 'ספרו לנו על העסק שלכם' : 'Tell us about your business'}
            </GradientButton>
          </div>
        )}
      </RoomPanel>

      {/* Consultation form panel */}
      <RoomPanel open={formOpen} onClose={() => setFormOpen(false)}
        title={isRtl ? 'ספרו לנו על העסק שלכם' : 'Tell us about your business'}>
        <ConsultationForm isRtl={isRtl} />
      </RoomPanel>
    </>
  );
}

function ConsultationForm({ isRtl }: { isRtl: boolean }) {
  const [form, setForm] = useState({ businessName: '', firstName: '', email: '', phone: '', about: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const mutation = trpc.incubator.submitConsultation.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => setError(isRtl ? 'אירעה שגיאה. נסו שוב.' : 'An error occurred. Please try again.'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.businessName || !form.firstName || !form.email || !form.phone) {
      setError(isRtl ? 'אנא מלאו את כל שדות החובה.' : 'Please fill in all required fields.');
      return;
    }
    if (!privacyConsent) {
      setError(isRtl ? 'יש לאשר את מדיניות הפרטיות.' : 'Please accept the privacy policy.');
      return;
    }
    mutation.mutate({ ...form, lang: isRtl ? 'he' : 'en' });
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(74,222,128,0.15)' }}>
          <CheckCheck className="w-8 h-8 text-green-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {isRtl ? 'תודה! קיבלנו את הפנייה שלכם' : 'Thank you! We received your request'}
        </h3>
        <p style={{ color: 'rgba(200,200,208,0.75)' }}>
          {isRtl ? 'נחזור אליכם בהקדם לתיאום שיחת האיפיון.' : "We'll be in touch shortly to schedule your discovery call."}
        </p>
      </div>
    );
  }

  const inputCls = 'w-full rounded-xl px-4 py-3 text-white transition focus:outline-none';
  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(200,200,208,0.25)',
  };
  const labelStyle: React.CSSProperties = { color: '#C8C8D0' };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm" style={{ color: 'rgba(200,200,208,0.7)' }}>
        {isRtl ? 'נחזור אליכם תוך 24 שעות לתיאום שיחת האיפיון' : "We'll get back to you within 24 hours"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={labelStyle}>
            {isRtl ? 'שם העסק' : 'Business name'} <span className="text-red-300">*</span>
          </label>
          <input type="text" value={form.businessName}
            onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
            placeholder={isRtl ? 'שם החברה / העסק' : 'Company name'}
            className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={labelStyle}>
            {isRtl ? 'שם פרטי' : 'First name'} <span className="text-red-300">*</span>
          </label>
          <input type="text" value={form.firstName}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            placeholder={isRtl ? 'שמכם הפרטי' : 'Your first name'}
            className={inputCls} style={inputStyle} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={labelStyle}>
            {isRtl ? 'אימייל' : 'Email'} <span className="text-red-300">*</span>
          </label>
          <input type="email" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="name@company.com" dir="ltr"
            className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={labelStyle}>
            {isRtl ? 'טלפון' : 'Phone'} <span className="text-red-300">*</span>
          </label>
          <input type="tel" value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="05X-XXX-XXXX" dir="ltr"
            className={inputCls} style={inputStyle} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5" style={labelStyle}>
          {isRtl ? 'ספרו לנו קצת על העסק שלכם' : 'Tell us about your business'}
        </label>
        <textarea value={form.about} rows={4}
          onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
          placeholder={isRtl ? 'מה העסק עושה? מה האתגרים שלכם? כיצד AI יכול לעזור?' : 'What does your business do? What are your challenges?'}
          className={`${inputCls} resize-none`} style={inputStyle} />
      </div>
      <div className="flex items-start gap-3">
        <input type="checkbox" id="incubator-room-privacy" checked={privacyConsent}
          onChange={e => setPrivacyConsent(e.target.checked)}
          className="mt-1 w-4 h-4 accent-white cursor-pointer flex-shrink-0" />
        <label htmlFor="incubator-room-privacy" className="text-sm cursor-pointer leading-relaxed"
          style={{ color: 'rgba(200,200,208,0.8)' }}>
          {isRtl ? (
            <>אני מאשר/ת את{' '}<a href="/privacy-policy" className="text-white underline" target="_blank" rel="noopener noreferrer">מדיניות הפרטיות</a>{' '}ומסכים/ה שהמידע שאני מספק/ת יישמר בהתאם לדרישות החוק</>
          ) : (
            <>I accept the{' '}<a href="/privacy-policy" className="text-white underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>{' '}and agree that my information will be stored in accordance with legal requirements</>
          )}
        </label>
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
      <button type="submit" disabled={mutation.isPending || !privacyConsent}
        className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-base transition-opacity disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        style={{ background: '#FFFFFF', color: '#08080C' }}>
        {mutation.isPending ? (
          <span className="animate-spin w-5 h-5 border-2 rounded-full" style={{ borderColor: 'rgba(8,8,12,0.2)', borderTopColor: '#08080C' }} />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {isRtl ? 'תיאום שיחת איפיון' : 'Schedule a discovery call'}
      </button>
    </form>
  );
}
