import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import ScrollProgress from "../components/ui/ScrollProgress";
import { useLanguage } from "../components/LanguageContext";
import { t } from "../components/translations";

export default function Contact() {
  const { lang } = useLanguage();
  const tr = t[lang].contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    acceptPrivacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.acceptPrivacy) {
      alert(lang === "he" ? 'יש לאשר את מדיניות הפרטיות לפני השליחה' : 'Please accept the privacy policy before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    await base44.entities.ContactSubmission.create({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
      status: "new"
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", company: "", message: "", acceptPrivacy: false });
    }, 3000);
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <ScrollProgress color="gradient" />

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">{tr.hero_title}</h1>
            <p className="text-xl text-gray-300 mb-8">{tr.hero_sub}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <Card className="p-6 bg-slate-900/50 border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{tr.email_label}</h3>
                    <p className="text-gray-400">yoni.ortam@gmail.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-slate-900/50 border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{tr.phone_label}</h3>
                    <p className="text-gray-400" dir="ltr">052-338-1822</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-slate-900/50 border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{lang === "he" ? "כתובת" : "Address"}</h3>
                    <p className="text-gray-400">{tr.address}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2">
              <Card className="p-8 bg-slate-900/50 border-white/10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{tr.success_title}</h3>
                    <p className="text-gray-400">{tr.success_sub}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-white mb-2 block">{tr.name_label}</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-slate-800/50 border-white/10 text-white" placeholder={tr.name_placeholder} />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">{tr.email_label}</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-slate-800/50 border-white/10 text-white" placeholder="your@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-white mb-2 block">{tr.phone_label}</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="bg-slate-800/50 border-white/10 text-white" placeholder="050-XXX-XXXX" />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-white mb-2 block">{tr.company_label}</Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleChange} className="bg-slate-800/50 border-white/10 text-white" placeholder={tr.company_placeholder} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white mb-2 block">{tr.message_label}</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="bg-slate-800/50 border-white/10 text-white resize-none" placeholder={tr.message_placeholder} />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="acceptPrivacy"
                        checked={formData.acceptPrivacy}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptPrivacy: checked }))}
                        className="border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 mt-1"
                      />
                      <label htmlFor="acceptPrivacy" className="text-sm text-gray-300 leading-relaxed">
                        {tr.privacy_text}{" "}
                        <Link to={createPageUrl("PrivacyPolicy")} className="text-cyan-400 hover:text-cyan-300 underline" target="_blank">
                          {tr.privacy_link}
                        </Link>
                        {" "}{tr.privacy_rest}
                      </label>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-lg py-6">
                      {isSubmitting ? tr.submitting : tr.submit}
                      <Send className="mr-2 h-5 w-5" />
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}