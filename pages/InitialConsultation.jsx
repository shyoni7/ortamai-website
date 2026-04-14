
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Added Checkbox import
import { ArrowRight, Send, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function InitialConsultation() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false); // New state for privacy checkbox

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if privacy policy is accepted
    if (!acceptPrivacy) {
      alert('יש לאשר את מדיניות הפרטיות לפני השליחה');
      return;
    }
    
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    try {
      // שמירה בטבלה במקום שליחת מייל
      await base44.entities.ConsultationRequest.create({
        business_name: formData.get('business_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        business_field: formData.get('business_field'),
        employees_count: formData.get('employees_count'),
        resource_consuming_tasks: formData.get('resource_consuming_tasks'),
        external_vendors: formData.get('external_vendors'),
        competitors: formData.get('competitors'),
        business_links: formData.get('business_links'),
        status: "new"
      });

      setSubmitted(true);
      
      // חזרה לדף הבית אחרי 3 שניות
      setTimeout(() => {
        navigate(createPageUrl("Home"));
      }, 3000);
    } catch (error) {
      console.error('Error sending consultation request:', error);
      alert('אירעה שגיאה בשליחת הטופס. אנא נסה שוב או צור קשר טלפונית.');
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
            תודה שפנית אלינו!
          </h2>
          <p className="text-gray-300 text-lg mb-2">
            קיבלנו את הפרטים ונחזור אליך בהקדם האפשרי לתיאום שיחת ייעוץ ראשונית.
          </p>
          <p className="text-gray-400 text-sm">
            מעביר אותך חזרה לדף הבית...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" dir="rtl">
      {/* Hero Section with Image */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              הזמנת שיחה ראשונית
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              ספרו לנו על העסק שלכם ונחזור אליכם עם המלצות מותאמות אישית
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80"
                alt="AI Training & Consultation"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-2xl font-bold text-white">
                  הדרכת AI מקצועית ומותאמת אישית
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white border-gray-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900 text-3xl text-center">
                  ספרו לנו על העסק שלכם
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* פרטי העסק הבסיסיים */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                      פרטי העסק
                    </h3>
                    
                    <div>
                      <Label htmlFor="business_name" className="text-gray-900 text-base">
                        שם העסק <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="business_name"
                        name="business_name"
                        required
                        className="bg-gray-50 border-gray-300 text-gray-900 h-12 mt-2"
                        placeholder="שם העסק שלך"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-gray-900 text-base">
                          אימייל העסק <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="bg-gray-50 border-gray-300 text-gray-900 h-12 mt-2"
                          placeholder="email@business.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-900 text-base">
                          טלפון העסק <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          className="bg-gray-50 border-gray-300 text-gray-900 h-12 mt-2"
                          placeholder="050-XXX-XXXX"
                        />
                      </div>
                    </div>
                  </div>

                  {/* מידע על העסק */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                      מידע נוסף
                    </h3>

                    <div>
                      <Label htmlFor="business_field" className="text-gray-900 text-base">
                        באיזה תחום העסק שלך? <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="business_field"
                        name="business_field"
                        required
                        className="bg-gray-50 border-gray-300 text-gray-900 h-12 mt-2"
                        placeholder="לדוגמה: שיווק דיגיטלי, סטודיו לעיצוב, ייעוץ עסקי..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="employees_count" className="text-gray-900 text-base">
                        כמה עובדים יש בעסק? <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="employees_count"
                        name="employees_count"
                        required
                        className="bg-gray-50 border-gray-300 text-gray-900 h-12 mt-2"
                        placeholder="לדוגמה: 5, 10-20, 50+"
                      />
                    </div>

                    <div>
                      <Label htmlFor="resource_consuming_tasks" className="text-gray-900 text-base">
                        מה המשימות שגוזלות הכי הרבה משאבים מהעסק? <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="resource_consuming_tasks"
                        name="resource_consuming_tasks"
                        required
                        rows={4}
                        className="bg-gray-50 border-gray-300 text-gray-900 mt-2 resize-none"
                        placeholder="לדוגמה: ניהול תוכן ברשתות חברתיות, כתיבת הצעות מחיר, ניהול פניות לקוחות..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="external_vendors" className="text-gray-900 text-base">
                        באילו ספקים אתה משתמש?
                      </Label>
                      <Textarea
                        id="external_vendors"
                        name="external_vendors"
                        rows={3}
                        className="bg-gray-50 border-gray-300 text-gray-900 mt-2 resize-none"
                        placeholder="לדוגמה: סטודיו לגרפיקה, משרד פרסום, קופירייטר..."
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        לא חובה - אבל יעזור לנו להבין טוב יותר
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="competitors" className="text-gray-900 text-base">
                        מי המתחרים הכי משמעותיים של העסק?
                      </Label>
                      <Textarea
                        id="competitors"
                        name="competitors"
                        rows={3}
                        className="bg-gray-50 border-gray-300 text-gray-900 mt-2 resize-none"
                        placeholder="שמות המתחרים או סוג העסקים המתחרים..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="business_links" className="text-gray-900 text-base">
                        קישור לאתר / פייסבוק / אינסטגרם של העסק
                      </Label>
                      <Input
                        id="business_links"
                        name="business_links"
                        type="url"
                        className="bg-gray-50 border-gray-300 text-gray-900 h-12 mt-2"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Checkbox
                      id="acceptPrivacy"
                      checked={acceptPrivacy}
                      onCheckedChange={setAcceptPrivacy}
                      className="border-gray-400 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600 mt-1"
                    />
                    <label htmlFor="acceptPrivacy" className="text-sm text-gray-700 leading-relaxed">
                      אני מאשר/ת את{" "}
                      <Link to={createPageUrl("PrivacyPolicy")} className="text-cyan-600 hover:text-cyan-700 underline" target="_blank">
                        מדיניות הפרטיות
                      </Link>
                      {" "}ומסכים/ה לכך שהמידע שאני מספק/ת ישמר בענן של גוגל בהתאם לדרישות החוק
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold h-14 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                          שולח...
                        </>
                      ) : (
                        <>
                          <Send className="ml-2 h-5 w-5" />
                          שלח בקשה לשיחה
                        </>
                      )}
                    </Button>
                    <Link to={createPageUrl("Incubator")} className="flex-1">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-14"
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                        חזרה
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
