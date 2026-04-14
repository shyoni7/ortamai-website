import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Upload, Briefcase, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SubmitJob() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFileUrl(file_url);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('שגיאה בהעלאת הקובץ. אנא נסה שוב.');
      setFileName(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptPrivacy) {
      alert('יש לאשר את מדיניות הפרטיות לפני השליחה');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      await base44.entities.JobListing.create({
        company_name: formData.get('company_name'),
        contact_person: formData.get('contact_person'),
        contact_email: formData.get('contact_email'),
        contact_phone: formData.get('contact_phone'),
        position_title: formData.get('position_title'),
        position_requirements: formData.get('position_requirements'),
        profile_file_url: fileUrl || '',
        status: 'pending'
      });

      setSubmitted(true);

      setTimeout(() => {
        navigate(createPageUrl("Placement"));
      }, 3000);
    } catch (error) {
      console.error('Error submitting job:', error);
      alert('שגיאה בשליחת המשרה. אנא נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            המשרה נשלחה בהצלחה!
          </h2>
          <p className="text-gray-300 text-lg mb-2">
            תודה על פנייתך. נחזור אליך בהקדם לתיאום ציפיות.
          </p>
          <p className="text-gray-400 text-sm">
            מעביר אותך בחזרה לדף ההשמה...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-20 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-6">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            העלאת משרה חדשה
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            הגש לנו פרטים על המשרה אליה אתה מחפש מועמדים, ואנו נתקשר אליך לתאם ציפיות ולהגיש לך מועמדים מתאימים ומוכשרים
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-slate-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl">פרטי המשרה</CardTitle>
              <CardDescription className="text-gray-400">
                מלא את כל השדות הנדרשים ונחזור אליך בהקדם
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div>
                  <Label htmlFor="company_name" className="text-white text-base mb-2 block">
                    1. שם החברה <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="company_name"
                    name="company_name"
                    required
                    className="bg-slate-800/50 border-white/10 text-white h-12"
                    placeholder="שם החברה או הארגון"
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <Label htmlFor="contact_person" className="text-white text-base mb-2 block">
                    2. איש קשר בחברה <span className="text-red-400">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      id="contact_person"
                      name="contact_person"
                      required
                      className="bg-slate-800/50 border-white/10 text-white h-12"
                      placeholder="שם מלא"
                    />
                    <Input
                      id="contact_email"
                      name="contact_email"
                      type="email"
                      required
                      className="bg-slate-800/50 border-white/10 text-white h-12"
                      placeholder="אימייל"
                    />
                    <Input
                      id="contact_phone"
                      name="contact_phone"
                      required
                      className="bg-slate-800/50 border-white/10 text-white h-12"
                      placeholder="טלפון"
                    />
                  </div>
                </div>

                {/* Position Title */}
                <div>
                  <Label htmlFor="position_title" className="text-white text-base mb-2 block">
                    3. התפקיד אליו מגייסים עובד <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="position_title"
                    name="position_title"
                    required
                    className="bg-slate-800/50 border-white/10 text-white h-12"
                    placeholder="לדוגמה: מהנדס AI, איש שיווק דיגיטלי..."
                  />
                </div>

                {/* Position Requirements */}
                <div>
                  <Label htmlFor="position_requirements" className="text-white text-base mb-2 block">
                    4. דרישות התפקיד <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    id="position_requirements"
                    name="position_requirements"
                    required
                    rows={10}
                    className="bg-slate-800/50 border-white/10 text-white resize-none"
                    placeholder="פרט את כל הדרישות של התפקיד:&#10;- השכלה נדרשת&#10;- ניסיון קודם&#10;- כישורים טכניים&#10;- כישורים רכים&#10;- היקף משרה&#10;- תנאים..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <Label htmlFor="profile_file" className="text-white text-base mb-2 block">
                    5. פרופיל משרה (אופציונלי)
                  </Label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-orange-400/50 transition-colors">
                    <input
                      type="file"
                      id="profile_file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="profile_file" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-3">
                        {uploading ? (
                          <>
                            <Loader2 className="w-10 h-10 text-orange-400 animate-spin" />
                            <p className="text-gray-400">מעלה קובץ...</p>
                          </>
                        ) : fileName ? (
                          <>
                            <CheckCircle className="w-10 h-10 text-green-400" />
                            <p className="text-green-400 font-medium">{fileName}</p>
                            <p className="text-gray-500 text-sm">לחץ להעלות קובץ אחר</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 text-gray-400" />
                            <p className="text-gray-300 font-medium">העלה פרופיל משרה</p>
                            <p className="text-gray-500 text-sm">PDF, DOC, תמונה - עד 10MB</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg">
                  <Checkbox
                    id="acceptPrivacy"
                    checked={acceptPrivacy}
                    onCheckedChange={setAcceptPrivacy}
                    className="border-white/30 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-1"
                  />
                  <label htmlFor="acceptPrivacy" className="text-sm text-gray-300 leading-relaxed">
                    אני מאשר/ת את{" "}
                    <Link to={createPageUrl("PrivacyPolicy")} className="text-orange-400 hover:text-orange-300 underline" target="_blank">
                      מדיניות הפרטיות
                    </Link>
                    {" "}ומסכים/ה לכך שהמידע והקבצים שאני מעלה ישמרו בענן של גוגל בהתאם לדרישות החוק
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                        שולח...
                      </>
                    ) : (
                      <>
                        <Briefcase className="ml-2 h-5 w-5" />
                        שלח משרה
                      </>
                    )}
                  </Button>
                  <Link to={createPageUrl("Placement")} className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/5 h-12"
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                      ביטול וחזרה
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}