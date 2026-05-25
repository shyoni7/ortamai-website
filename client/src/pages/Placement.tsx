import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building, CheckCircle, Upload, FileText, X, Send, Briefcase, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

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

  const inputClass = `w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-300 focus:bg-white transition-all`;

  return (
    <div dir={dir}>
      {/* Hero */}
      <section
        dir="rtl"
        style={{
          background: 'linear-gradient(135deg, #0d1228 0%, #1a2240 40%, #2D3A6B 70%, #1a2240 100%)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Subtle glow blobs */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '10%', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text — right side in RTL */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full text-center md:text-right"
          >
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.25rem' }}>
              <Briefcase style={{ width: '14px', height: '14px', color: '#F59E0B' }} />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                {isRtl ? 'מרכז השמה' : 'Placement Center'}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '1rem' }}>
              {isRtl ? 'מרכז השמה מוכוון AI' : 'AI-Driven Placement Center'}
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '480px' }}>
              {isRtl
                ? 'בשוק העבודה המשתנה יש צורך באיפיון משרות מתאימות לעולם ה-AI. אנו מתמחים במציאת עובדים שעברו הכשרת AI מותאמת לתפקידם.'
                : 'In the changing job market, there is a need to define roles suited to the AI era. We specialize in finding employees who have undergone AI training tailored to their role.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center' }} className="md:justify-start">
            <motion.a
              href="#cv-form"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#ffffff', color: '#2d1b8e',
                fontWeight: 700, fontSize: '1rem',
                padding: '12px 28px', borderRadius: '12px',
                textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              }}
            >
              {isRtl ? 'שלח קורות חיים' : 'Submit CV'}
              <span style={{ fontSize: '1.1rem' }}>←</span>
            </motion.a>
            </div>
          </motion.div>

          {/* Video — left side in RTL */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex-1 w-full max-w-lg relative hidden sm:block"
          >
            {/* Glow ring behind video */}
            <div style={{
              position: 'absolute', inset: '-12px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(245,158,11,0.2))',
              filter: 'blur(18px)',
              zIndex: 0,
            }} />
            <video
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/mYNIxIlFvGEcEMgl.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                borderRadius: '16px',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                display: 'block',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Candidates */}
            <div
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 hover:border-blue-300 transition-all"
            >
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 mb-6">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.placement.candidate_title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{t.placement.candidate_desc}</p>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: i % 2 === 0 ? '#F59E0B' : '#3A5298' }} />
                    <span className="text-gray-600 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Employers */}
            <div
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 hover:border-blue-900/30 transition-all"
            >
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-700 to-slate-500 mb-6">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.placement.employer_title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{t.placement.employer_desc}</p>
              <div className="space-y-3 mb-8">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: i % 2 === 0 ? '#3A5298' : '#F59E0B' }} />
                    <span className="text-gray-600 text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <button className="w-full py-3 rounded-xl border border-blue-900/30 text-blue-700 hover:bg-blue-100/30 transition-colors font-semibold">{t.placement.cta}</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CV Submission Form */}
      <section id="cv-form" className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div>
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full mb-4">
                <FileText className="w-4 h-4 text-blue-700" />
                <span className="text-sm text-blue-700 font-medium">{t.placement.cv_form_title}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t.placement.cv_form_title}</h2>
              <p className="text-gray-500">{t.placement.cv_form_sub}</p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.placement.cv_success}</h3>
                  <p className="text-gray-500 mb-6">{lang === 'he' ? 'נחזור אליך בהקדם האפשרי' : "We'll be in touch soon"}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary px-8 py-3"
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
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10 space-y-6"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">{t.placement.cv_name}</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder={lang === 'he' ? 'ישראל ישראלי' : 'John Doe'}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">{t.placement.cv_email}</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="email@example.com"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone + Role */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">{t.placement.cv_phone}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="050-0000000"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">{t.placement.cv_role}</label>
                      <input
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
                    <label className="block text-sm text-gray-500 mb-2">{t.placement.cv_field}</label>
                    <div className="relative">
                      <select
                        value={form.field}
                        onChange={e => setForm(f => ({ ...f, field: e.target.value }))}
                        className={`${inputClass} appearance-none cursor-pointer`}
                        style={{ paddingInlineEnd: '2.5rem' }}
                      >
                        <option value="" className="bg-white">{lang === 'he' ? 'בחר תחום...' : 'Select field...'}</option>
                        {fields.map(f => (
                          <option key={f.value} value={f.value} className="bg-white">{f.label}</option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none ${isRtl ? 'left-3' : 'right-3'}`} />
                    </div>
                  </div>

                  {/* CV File Upload */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">{t.placement.cv_file}</label>
                    <div
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-5 md:p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-orange-400 bg-orange-400/10'
                          : cvFile
                          ? 'border-emerald-400/60 bg-emerald-400/5'
                          : 'border-gray-200 hover:border-orange-400/50 hover:bg-gray-50'
                      }`}
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
                          <FileText className="w-8 h-8 text-emerald-400" />
                          <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
                            <p className="text-gray-900 font-medium text-sm">{cvFile.name}</p>
                            <p className="text-gray-500 text-xs">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="p-1 rounded-full hover:bg-white/10 text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-blue-700' : 'text-gray-500'}`} />
                          <p className="text-gray-600 font-medium">{t.placement.cv_file_hint}</p>
                          <p className="text-gray-500 text-sm mt-1">PDF, DOC, DOCX · {lang === 'he' ? 'עד' : 'up to'} {MAX_FILE_SIZE_MB}MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">{t.placement.cv_message}</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={4}
                      placeholder={lang === 'he' ? 'ספר לנו קצת על עצמך, ניסיונך, ומה אתה מחפש...' : 'Tell us a bit about yourself, your experience, and what you are looking for...'}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Privacy consent */}
                  <div className="flex items-start gap-3" dir={lang === 'he' ? 'rtl' : 'ltr'}>
                    <input
                      type="checkbox"
                      id="placement-privacy"
                      checked={privacyConsent}
                      onChange={e => setPrivacyConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor="placement-privacy" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                      {lang === 'he' ? (
                        <>אני מאשר/ת את{' '}<a href="/privacy-policy" className="text-blue-700 underline hover:text-blue-900" target="_blank" rel="noopener noreferrer">מדיניות הפרטיות</a>{' '}ומסכים/ה שהמידע שאני מספק/ת ישמר בהתאם לדרישות החוק</>
                      ) : (
                        <>I accept the{' '}<a href="/privacy-policy" className="text-blue-700 underline hover:text-blue-900" target="_blank" rel="noopener noreferrer">Privacy Policy</a>{' '}and agree that my information will be stored in accordance with legal requirements</>
                      )}
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitCv.isPending || !privacyConsent}
                    className="btn-primary w-full py-4 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitCv.isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {lang === 'he' ? 'שולח...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t.placement.cv_submit}
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
