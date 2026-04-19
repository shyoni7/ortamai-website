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

  const inputClass = `w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/8 transition-all`;

  return (
    <div dir={dir}>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0d1235] to-[#0a0e27]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">{t.nav.placement}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gradient-cyan mb-6"
          >
            {t.placement.hero_title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            {t.placement.hero_sub}
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Candidates */}
            <motion.div variants={fadeUp} className="glass rounded-2xl p-10 hover:border-cyan-400/40 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-6">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t.placement.candidate_title}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{t.placement.candidate_desc}</p>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Employers */}
            <motion.div variants={fadeUp} className="glass rounded-2xl p-10 hover:border-purple-400/40 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-6">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t.placement.employer_title}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{t.placement.employer_desc}</p>
              <div className="space-y-3 mb-8">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <button className="w-full py-3 rounded-xl border border-purple-400/50 text-purple-400 hover:bg-purple-400/10 transition-colors font-semibold">{t.placement.cta}</button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CV Submission Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">{t.placement.cv_form_title}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t.placement.cv_form_title}</h2>
              <p className="text-gray-400">{t.placement.cv_form_sub}</p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{t.placement.cv_success}</h3>
                  <p className="text-gray-400 mb-6">{lang === 'he' ? 'נחזור אליך בהקדם האפשרי' : "We'll be in touch soon"}</p>
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
                  className="glass rounded-2xl p-8 md:p-10 space-y-6"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t.placement.cv_name}</label>
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
                      <label className="block text-sm text-gray-400 mb-2">{t.placement.cv_email}</label>
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
                      <label className="block text-sm text-gray-400 mb-2">{t.placement.cv_phone}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="050-0000000"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t.placement.cv_role}</label>
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
                    <label className="block text-sm text-gray-400 mb-2">{t.placement.cv_field}</label>
                    <div className="relative">
                      <select
                        value={form.field}
                        onChange={e => setForm(f => ({ ...f, field: e.target.value }))}
                        className={`${inputClass} appearance-none cursor-pointer`}
                        style={{ paddingInlineEnd: '2.5rem' }}
                      >
                        <option value="" className="bg-[#0d1235]">{lang === 'he' ? 'בחר תחום...' : 'Select field...'}</option>
                        {fields.map(f => (
                          <option key={f.value} value={f.value} className="bg-[#0d1235]">{f.label}</option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none ${isRtl ? 'left-3' : 'right-3'}`} />
                    </div>
                  </div>

                  {/* CV File Upload */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.placement.cv_file}</label>
                    <div
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : cvFile
                          ? 'border-emerald-400/60 bg-emerald-400/5'
                          : 'border-white/20 hover:border-cyan-400/50 hover:bg-white/5'
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
                            <p className="text-white font-medium text-sm">{cvFile.name}</p>
                            <p className="text-gray-400 text-xs">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-cyan-400' : 'text-gray-500'}`} />
                          <p className="text-gray-300 font-medium">{t.placement.cv_file_hint}</p>
                          <p className="text-gray-500 text-sm mt-1">PDF, DOC, DOCX · {lang === 'he' ? 'עד' : 'up to'} {MAX_FILE_SIZE_MB}MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.placement.cv_message}</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={4}
                      placeholder={lang === 'he' ? 'ספר לנו קצת על עצמך, ניסיונך, ומה אתה מחפש...' : 'Tell us a bit about yourself, your experience, and what you are looking for...'}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitCv.isPending}
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
