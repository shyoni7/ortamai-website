import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';



export default function Contact() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success(t.contact.form_success);
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
    },
    onError: () => {
      toast.error(t.contact.form_error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(isRtl ? 'אנא מלא את כל השדות הנדרשים' : 'Please fill all required fields');
      return;
    }
    if (!privacyConsent) {
      toast.error(isRtl ? 'יש לאשר את מדיניות הפרטיות' : 'Please accept the privacy policy');
      return;
    }
    submitContact.mutate({ ...form, lang });
  };

  return (
    <div dir={dir}>
      {/* Hero */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {t.contact.hero_title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-600">
            {t.contact.hero_sub}
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: isRtl ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">{t.contact.form_name}</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors"
                      placeholder={isRtl ? 'ישראל ישראלי' : 'John Doe'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">{t.contact.form_email}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">{t.contact.form_phone}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors"
                      placeholder="050-000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">{t.contact.form_company}</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors"
                      placeholder={isRtl ? 'שם החברה' : 'Company name'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{t.contact.form_message}</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors resize-none"
                    placeholder={isRtl ? 'ספר לנו כיצד נוכל לעזור...' : 'Tell us how we can help...'}
                  />
                </div>
                {/* Privacy consent */}
                <div className="flex items-start gap-3" dir={isRtl ? 'rtl' : 'ltr'}>
                  <input
                    type="checkbox"
                    id="contact-privacy"
                    checked={privacyConsent}
                    onChange={e => setPrivacyConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-purple-600 cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="contact-privacy" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                    {isRtl ? (
                      <>אני מאשר/ת את <a href="/privacy-policy" className="text-purple-600 underline hover:text-purple-800" target="_blank" rel="noopener noreferrer">מדיניות הפרטיות</a> ומסכים/ה שהמידע שאני מספק/ת ישמר בהתאם לדרישות החוק</>
                    ) : (
                      <>I accept the <a href="/privacy-policy" className="text-purple-600 underline hover:text-purple-800" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and agree that my information will be stored in accordance with legal requirements</>
                    )}
                  </label>
                </div>
                <motion.button
                  type="submit"
                  disabled={submitContact.isPending || !privacyConsent}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitContact.isPending ? (isRtl ? 'שולח...' : 'Sending...') : (
                    <>
                      <Send size={18} />
                      {t.contact.form_submit}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: isRtl ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.contact.info_title}</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-orange-400/10">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{t.contact.email_label}</p>
                      <a href="mailto:info@ortamai.com" className="text-gray-900 hover:text-purple-600 transition-colors">info@ortamai.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-orange-400/10">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{t.contact.phone_label}</p>
                      <a href="tel:+972523381822" className="text-gray-900 hover:text-purple-600 transition-colors">052-338-1822</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-orange-400/10">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{isRtl ? 'מיקום' : 'Location'}</p>
                      <p className="text-gray-900">{t.contact.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/972523381822"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:border-green-400/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold group-hover:text-green-400 transition-colors">{t.contact.whatsapp}</p>
                  <p className="text-gray-500 text-sm">052-338-1822</p>
                </div>
              </a>

              {/* 3D Animated Envelope */}
              <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100">
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-purple-400/30" style={{
                      width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
                      left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%`,
                      animation: `envelope-float ${2.5 + i * 0.4}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`
                    }} />
                  ))}
                </div>

                {/* Envelope 3D */}
                <div className="relative" style={{ perspective: '800px' }}>
                  <div className="envelope-3d" style={{
                    width: '200px', height: '136px', position: 'relative',
                    transformStyle: 'preserve-3d',
                    animation: 'envelope-fly 4s ease-in-out infinite',
                  }}>
                    {/* Envelope body */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
                      borderRadius: '8px',
                      boxShadow: '0 20px 60px rgba(124,58,237,0.45), 0 4px 20px rgba(124,58,237,0.3)',
                    }} />

                    {/* Envelope flap (top triangle) */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0,
                      height: '68px', overflow: 'hidden',
                      animation: 'flap-open 4s ease-in-out infinite',
                      transformOrigin: 'top center',
                      transformStyle: 'preserve-3d',
                    }}>
                      <div style={{
                        width: 0, height: 0,
                        borderLeft: '100px solid transparent',
                        borderRight: '100px solid transparent',
                        borderTop: '68px solid #6d28d9',
                        filter: 'drop-shadow(0 4px 8px rgba(109,40,217,0.4))',
                      }} />
                    </div>

                    {/* V-fold lines */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0,
                      width: 0, height: 0,
                      borderLeft: '100px solid #8b5cf6',
                      borderBottom: '68px solid transparent',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 0, height: 0,
                      borderRight: '100px solid #8b5cf6',
                      borderBottom: '68px solid transparent',
                    }} />

                    {/* Letter peeking out */}
                    <div style={{
                      position: 'absolute', left: '20px', right: '20px',
                      top: '10px', height: '60px',
                      background: 'white',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      animation: 'letter-peek 4s ease-in-out infinite',
                      transformOrigin: 'bottom center',
                    }}>
                      <div style={{ padding: '8px 10px' }}>
                        <div style={{ height: '4px', background: '#e9d5ff', borderRadius: '2px', marginBottom: '5px' }} />
                        <div style={{ height: '4px', background: '#e9d5ff', borderRadius: '2px', marginBottom: '5px', width: '70%' }} />
                        <div style={{ height: '4px', background: '#e9d5ff', borderRadius: '2px', width: '85%' }} />
                      </div>
                    </div>

                    {/* Shine overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                      borderRadius: '8px',
                      pointerEvents: 'none',
                    }} />
                  </div>
                </div>

                {/* Dotted trail */}
                <div className="absolute" style={{ right: '15%', top: '30%', animation: 'trail-fade 4s ease-in-out infinite' }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400/60 mx-0.5"
                      style={{ animationDelay: `${i * 0.15}s`, animation: `trail-dot 4s ease-in-out infinite ${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
