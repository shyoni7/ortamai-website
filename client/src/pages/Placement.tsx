import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building, CheckCircle, Upload, FileText, X, Send, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import { placementServiceSchema } from '@/lib/seoSchemas';
import '@/styles/placement.css';

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export default function Placement() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  const benefits = [t.placement.benefit1, t.placement.benefit2, t.placement.benefit3, t.placement.benefit4];

  const fields = [
    { value: 'tech', label: t.placement.cv_field_tech },
    { value: 'sales', label: t.placement.cv_field_sales },
    { value: 'hr', label: t.placement.cv_field_hr },
    { value: 'finance', label: t.placement.cv_field_finance },
    { value: 'product', label: t.placement.cv_field_product },
    { value: 'cyber', label: t.placement.cv_field_cyber },
    { value: 'data', label: t.placement.cv_field_data },
    { value: 'other', label: t.placement.cv_field_other },
  ];

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    field: '',
    message: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitCv = trpc.placement.submitCv.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', role: '', field: '', message: '' });
      setCvFile(null);
    },
    onError: () => {
      toast.error(t.placement.cv_error);
    },
  });

  const handleFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(lang === 'he' ? 'סוג קובץ לא נתמך. אנא העלה PDF או Word.' : 'Unsupported file type. Please upload PDF or Word.');
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(lang === 'he' ? `הקובץ גדול מדי. גודל מקסימלי: ${MAX_FILE_SIZE_MB}MB` : `File too large. Max size: ${MAX_FILE_SIZE_MB}MB`);
      return;
    }
    setCvFile(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [lang]);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error(lang === 'he' ? 'אנא מלא שם ואימייל' : 'Please fill in name and email');
      return;
    }
    if (!privacyConsent) {
      toast.error(lang === 'he' ? 'יש לאשר את מדיניות הפרטיות' : 'Please accept the privacy policy');
      return;
    }

    let cvBase64: string | undefined;
    let cvFileName: string | undefined;
    let cvMimeType: string | undefined;

    if (cvFile) {
      const buffer = await cvFile.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      cvBase64 = btoa(binary);
      cvFileName = cvFile.name;
      cvMimeType = cvFile.type;
    }

    submitCv.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      role: form.role || undefined,
      field: form.field || undefined,
      cvBase64,
      cvFileName,
      cvMimeType,
      message: form.message || undefined,
      lang,
    });
  };


  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const inputClass = 'placement-input';

  return (
    <>
    <SEO
      title={isRtl ? 'מרכז השמה מוכוון AI | מציאת עבודה בעידן AI | ORTAM AI' : 'AI-Driven Placement Center | Find AI-Ready Jobs | ORTAM AI'}
      description={isRtl
        ? 'מרכז השמה מוכוון AI: מציאת עבודה למועמדים שעברו הכשרת AI, וחיבור בין ארגונים לעובדים בעידן AI. שלח קורות חיים והתחל את הקריירה שלך בעולם ה-AI.'
        : 'AI-driven placement center connecting AI-trained candidates with forward-thinking organizations. Submit your CV and start your AI career.'}
      canonical="/placement"
      schema={placementServiceSchema}
    />
    <div dir={dir} className="placement-v2">
      {/* Hero */}
      <section aria-labelledby="placement-title" style={{ background: 'var(--h-dark)' }}>
        <div className="placement-hero mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-24">
          <div className="placement-hero-text text-start">
            <h1
              id="placement-title"
              className="h-rise text-white font-extrabold leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
            >
              {isRtl ? 'מרכז השמה מוכוון AI' : 'AI-Driven Placement Center'}
            </h1>
            <p className="h-rise h-rise-2 mt-5 md:mt-7 text-lg md:text-xl leading-relaxed max-w-[56ch]" style={{ color: 'var(--h-on-dark)' }}>
              {isRtl
                ? 'בשוק העבודה המשתנה יש צורך באיפיון משרות מתאימות לעולם ה-AI. אנו מתמחים במציאת עובדים שעברו הכשרת AI מותאמת לתפקידם.'
                : 'In the changing job market, there is a need to define roles suited to the AI era. We specialize in finding employees who have undergone AI training tailored to their role.'}
            </p>
          </div>

          <div className="placement-hero-media h-rise h-rise-2">
            <video
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/mYNIxIlFvGEcEMgl.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="block w-full aspect-video object-cover rounded-[20px]"
            />
          </div>

          <div className="placement-hero-cta h-rise h-rise-3 flex flex-col sm:flex-row gap-3">
            <a href="#cv-form" className="h-btn h-btn-accent">
              {isRtl ? 'שלח קורות חיים' : 'Submit CV'}
              <Arrow size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Candidates / Employers */}
      <section aria-label={isRtl ? 'למועמדים ולמעסיקים' : 'For candidates and employers'} className="py-16 md:py-24" style={{ background: 'var(--h-paper)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Candidates */}
            <article className="placement-card p-6 md:p-10 flex flex-col text-start">
              <div className="placement-icon-tile" aria-hidden="true">
                <User className="w-6 h-6" />
              </div>
              <h2 className="mt-6 text-2xl md:text-3xl font-bold" style={{ color: 'var(--h-ink)' }}>{t.placement.candidate_title}</h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-ink-2)' }}>{t.placement.candidate_desc}</p>
              <ul className="placement-list mt-6">
                {benefits.map((b, i) => (
                  <li key={i}>
                    <CheckCircle className="w-5 h-5 shrink-0" style={{ color: 'var(--h-accent-ink)' }} aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Employers */}
            <article className="placement-card p-6 md:p-10 flex flex-col text-start">
              <div className="placement-icon-tile" aria-hidden="true">
                <Building className="w-6 h-6" />
              </div>
              <h2 className="mt-6 text-2xl md:text-3xl font-bold" style={{ color: 'var(--h-ink)' }}>{t.placement.employer_title}</h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-ink-2)' }}>{t.placement.employer_desc}</p>
              <ul className="placement-list mt-6">
                {benefits.map((b, i) => (
                  <li key={i}>
                    <CheckCircle className="w-5 h-5 shrink-0" style={{ color: 'var(--h-accent-ink)' }} aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link href="/contact" className="h-btn placement-btn-dark w-full sm:w-auto">
                  {t.placement.cta}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CV Submission Form */}
      <section id="cv-form" aria-labelledby="cv-form-title" className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-start mb-8 md:mb-10">
            <h2 id="cv-form-title" className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--h-ink)' }}>{t.placement.cv_form_title}</h2>
            <p className="mt-3 text-base md:text-lg max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>{t.placement.cv_form_sub}</p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="placement-card p-8 md:p-12 text-center"
                role="status"
              >
                <div className="placement-success-icon mx-auto mb-6" aria-hidden="true">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--h-ink)' }}>{t.placement.cv_success}</h3>
                <p className="mb-7" style={{ color: 'var(--h-ink-2)' }}>{lang === 'he' ? 'נחזור אליך בהקדם האפשרי' : "We'll be in touch soon"}</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="h-btn h-btn-accent"
                >
                  {lang === 'he' ? 'שלח קורות חיים נוספים' : 'Submit Another CV'}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="placement-card p-5 sm:p-8 md:p-10 space-y-6 text-start"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cv-name" className="placement-label">{t.placement.cv_name}</label>
                    <input
                      id="cv-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder={lang === 'he' ? 'ישראל ישראלי' : 'John Doe'}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cv-email" className="placement-label">{t.placement.cv_email}</label>
                    <input
                      id="cv-email"
                      type="email"
                      autoComplete="email"
                      dir="ltr"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="email@example.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Phone + Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cv-phone" className="placement-label">{t.placement.cv_phone}</label>
                    <input
                      id="cv-phone"
                      type="tel"
                      autoComplete="tel"
                      dir="ltr"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="050-0000000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cv-role" className="placement-label">{t.placement.cv_role}</label>
                    <input
                      id="cv-role"
                      type="text"
                      value={form.role}
                      onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                      placeholder={lang === 'he' ? 'למשל: מנהל מוצר AI' : 'e.g. AI Product Manager'}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Field of Work */}
                <div>
                  <label htmlFor="cv-field" className="placement-label">{t.placement.cv_field}</label>
                  <div className="relative">
                    <select
                      id="cv-field"
                      value={form.field}
                      onChange={e => setForm(f => ({ ...f, field: e.target.value }))}
                      className={`${inputClass} appearance-none cursor-pointer`}
                      style={{ paddingInlineEnd: '2.75rem' }}
                    >
                      <option value="">{lang === 'he' ? 'בחר תחום...' : 'Select field...'}</option>
                      {fields.map(f => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="placement-select-chevron w-5 h-5 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                {/* CV File Upload */}
                <div>
                  <span id="cv-file-label" className="placement-label">{t.placement.cv_file}</span>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-labelledby="cv-file-label"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
                    className={`placement-drop ${isDragging ? 'is-dragging' : cvFile ? 'has-file' : ''}`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                    />
                    {cvFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="w-8 h-8 shrink-0" style={{ color: 'var(--h-accent-ink)' }} aria-hidden="true" />
                        <div className="text-start min-w-0">
                          <p className="font-medium text-sm break-all" style={{ color: 'var(--h-ink)' }}>{cvFile.name}</p>
                          <p className="text-xs" style={{ color: 'var(--h-ink-2)' }}>{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                          type="button"
                          aria-label={lang === 'he' ? 'הסרת קובץ' : 'Remove file'}
                          onClick={e => { e.stopPropagation(); setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                          className="placement-icon-btn shrink-0"
                        >
                          <X className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-9 h-9 mx-auto mb-3" style={{ color: isDragging ? 'var(--h-ink)' : 'var(--h-ink-2)' }} aria-hidden="true" />
                        <p className="font-medium" style={{ color: 'var(--h-ink)' }}>{t.placement.cv_file_hint}</p>
                        <p className="text-sm mt-1" style={{ color: 'var(--h-ink-2)' }}>PDF, DOC, DOCX · {lang === 'he' ? 'עד' : 'up to'} {MAX_FILE_SIZE_MB}MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="cv-message" className="placement-label">{t.placement.cv_message}</label>
                  <textarea
                    id="cv-message"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={4}
                    placeholder={lang === 'he' ? 'ספר לנו קצת על עצמך, ניסיונך, ומה אתה מחפש...' : 'Tell us a bit about yourself, your experience, and what you are looking for...'}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Privacy consent */}
                <div className="placement-consent" dir={lang === 'he' ? 'rtl' : 'ltr'}>
                  <input
                    type="checkbox"
                    id="placement-privacy"
                    checked={privacyConsent}
                    onChange={e => setPrivacyConsent(e.target.checked)}
                    className="placement-checkbox"
                  />
                  <label htmlFor="placement-privacy" className="text-sm md:text-base cursor-pointer leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>
                    {lang === 'he' ? (
                      <>אני מאשר/ת את{' '}<a href="/privacy-policy" className="placement-inline-link" target="_blank" rel="noopener noreferrer">מדיניות הפרטיות</a>{' '}ומסכים/ה שהמידע שאני מספק/ת ישמר בהתאם לדרישות החוק</>
                    ) : (
                      <>I accept the{' '}<a href="/privacy-policy" className="placement-inline-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>{' '}and agree that my information will be stored in accordance with legal requirements</>
                    )}
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitCv.isPending || !privacyConsent}
                  className="h-btn h-btn-accent placement-submit w-full"
                >
                  {submitCv.isPending ? (
                    <>
                      <span className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(31, 16, 41,0.25)', borderTopColor: 'var(--h-ink)' }} aria-hidden="true" />
                      {lang === 'he' ? 'שולח...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      {t.placement.cv_submit}
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
    </>
  );
}
