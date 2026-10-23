import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import { contactPageSchema } from '@/lib/seoSchemas';
import '@/styles/contact.css';

export default function Contact() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

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
    <>
    <SEO
      title={isRtl ? 'צור קשר | ORTAM AI' : 'Contact Us | ORTAM AI'}
      description={isRtl
        ? 'צור קשר עם ORTAM AI. אימייל: info@ortamai.com | טלפון: 052-338-1822. נשמח לעזור בהטמעת AI, הכשרות והשמה לארגונך.'
        : 'Contact ORTAM AI. Email: info@ortamai.com | Phone: 052-338-1822. We are happy to help with AI integration, training, and placement for your organization.'}
      canonical="/contact"
      schema={contactPageSchema}
    />
    <div dir={dir} className="contact-v2">
      {/* Hero */}
      <section aria-labelledby="contact-title" style={{ background: 'var(--h-dark)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-14 pb-14 md:pt-24 md:pb-20 text-start">
          <h1
            id="contact-title"
            className="h-rise text-white font-extrabold leading-[1.05] max-w-4xl"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            {t.contact.hero_title}
          </h1>
          <p className="h-rise h-rise-2 mt-6 md:mt-8 text-lg md:text-xl leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>
            {t.contact.hero_sub}
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="contact-card p-5 sm:p-8 md:p-10 space-y-5 text-start">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="contact-label">
                      {t.contact.form_name}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      aria-required="true"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="contact-field"
                      placeholder={isRtl ? 'ישראל ישראלי' : 'John Doe'}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="contact-label">
                      {t.contact.form_email}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      dir="ltr"
                      aria-required="true"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="contact-field contact-field-ltr"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="contact-label">{t.contact.form_phone}</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      dir="ltr"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="contact-field contact-field-ltr"
                      placeholder="050-000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="contact-label">{t.contact.form_company}</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                      className="contact-field"
                      placeholder={isRtl ? 'שם החברה' : 'Company name'}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="contact-label">
                    {t.contact.form_message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    aria-required="true"
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="contact-field contact-textarea"
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
                    className="contact-check"
                  />
                  <label htmlFor="contact-privacy" className="text-sm md:text-base cursor-pointer leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>
                    {isRtl ? (
                      <>אני מאשר/ת את <a href="/privacy-policy" className="contact-inline-link" target="_blank" rel="noopener noreferrer">מדיניות הפרטיות</a> ומסכים/ה שהמידע שאני מספק/ת ישמר בהתאם לדרישות החוק</>
                    ) : (
                      <>I accept the <a href="/privacy-policy" className="contact-inline-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and agree that my information will be stored in accordance with legal requirements</>
                    )}
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={submitContact.isPending || !privacyConsent}
                  className="h-btn h-btn-orange contact-submit w-full"
                >
                  {submitContact.isPending ? (isRtl ? 'שולח...' : 'Sending...') : (
                    <>
                      <Send size={18} aria-hidden="true" className="contact-send-icon" />
                      {t.contact.form_submit}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 text-start">
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--h-ink)' }}>{t.contact.info_title}</h2>
              <ul className="mt-6 border-t" style={{ borderColor: 'var(--h-line)' }}>
                <li className="flex items-center gap-4 py-4 border-b" style={{ borderColor: 'var(--h-line)' }}>
                  <span className="contact-icon" aria-hidden="true"><Mail className="w-5 h-5" /></span>
                  <div className="min-w-0">
                    <p className="text-sm" style={{ color: 'var(--h-ink-2)' }}>{t.contact.email_label}</p>
                    <a href="mailto:info@ortamai.com" className="contact-value-link" dir="ltr">info@ortamai.com</a>
                  </div>
                </li>
                <li className="flex items-center gap-4 py-4 border-b" style={{ borderColor: 'var(--h-line)' }}>
                  <span className="contact-icon" aria-hidden="true"><Phone className="w-5 h-5" /></span>
                  <div className="min-w-0">
                    <p className="text-sm" style={{ color: 'var(--h-ink-2)' }}>{t.contact.phone_label}</p>
                    <a href="tel:+972523381822" className="contact-value-link" dir="ltr">052-338-1822</a>
                  </div>
                </li>
                <li className="flex items-center gap-4 py-4 border-b" style={{ borderColor: 'var(--h-line)' }}>
                  <span className="contact-icon" aria-hidden="true"><MapPin className="w-5 h-5" /></span>
                  <div className="min-w-0">
                    <p className="text-sm" style={{ color: 'var(--h-ink-2)' }}>{isRtl ? 'מיקום' : 'Location'}</p>
                    <p className="text-lg font-medium" style={{ color: 'var(--h-ink)' }}>{t.contact.address}</p>
                  </div>
                </li>
              </ul>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/972523381822"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card contact-wa mt-8 flex items-center gap-4 p-5 md:p-6"
              >
                <span className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-lg font-bold" style={{ color: 'var(--h-ink)' }}>{t.contact.whatsapp}</span>
                  <span className="block text-base" style={{ color: 'var(--h-ink-2)' }}><span dir="ltr">052-338-1822</span></span>
                </span>
                <Arrow size={20} className="h-link-arrow flex-shrink-0" style={{ color: 'var(--h-blue)' }} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
