import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Shield, Target, Users, Award, Phone, Mail, ChevronDown, Star, Cpu } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function CyberGoAI() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.ContactSubmission.create({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: "הרשמה לקורס סייבר - CyberGo AI",
      status: "new"
    });
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const syllabusUnits = [
    { num: 1, title: "יסודות מחשבים ורשתות", hours: 50, goal: "בניית בסיס טכני מוצק – הכרת רכיבי המחשב, מערכות הפעלה, ורשתות תקשורת.", topics: [{ name: "מבנה המחשב", hours: 12, items: ["CPU, RAM, Storage – מה עושה כל חלק", "מערכת הפעלה – Windows ו-Linux בסיס", "ניהול קבצים, תיקיות, הרשאות", "שורת פקודה – CMD ו-Bash בסיס"] }, { name: "רשתות – בסיס", hours: 14, items: ["מהי רשת? LAN, WAN, Internet", "TCP/IP – הסבר מעשי", "מודל OSI – 7 שכבות בפרקטיקה", "כתובות IP, Subnet, CIDR בסיסי"] }, { name: "פרוטוקולים נפוצים", hours: 12, items: ["HTTP/S, DNS, DHCP, ARP", "SMTP, FTP, SSH", "ניתוח פורטים נפוצים", "מה זה Packet ואיך נראה תעבורה"] }, { name: "לינוקס למתחיל", hours: 12, items: ["התקנת VM והגדרת סביבת Lab", "פקודות בסיס: ls, grep, cat, netstat", "ניהול משתמשים וקבצים", "מבוא ל-Bash scripting"] }] },
    { num: 2, title: "יסודות עולם הסייבר", hours: 40, goal: "הכרת עולם הסייבר, סוגי התוקפים, וקטורי תקיפה נפוצים, ומסגרות עבודה מקצועיות.", topics: [{ name: "מבוא לסייבר", hours: 10, items: ["מהו סייבר? Offense vs Defense", "סוגי תוקפים: Script Kiddie, APT, Insider", "CIA Triad", "מושגים: Vulnerability, Exploit, Payload"] }, { name: "וקטורי תקיפה", hours: 12, items: ["Phishing, Spear Phishing, BEC", "Malware: Virus, Trojan, Ransomware, Worm", "Social Engineering", "OWASP Top 10"] }, { name: "מסגרות עבודה", hours: 10, items: ["MITRE ATT&CK", "Cyber Kill Chain", "NIST Cybersecurity Framework", "הכרת ה-SOC: Tier 1/2/3"] }, { name: "רגולציה ותקנים", hours: 8, items: ["ISO 27001 סקירה", "GDPR ופרטיות נתונים", "חוק הגנת הפרטיות בישראל", "SLA ו-SLO ב-SOC"] }] },
    { num: 3, title: "ניתוח תעבורת רשת", hours: 35, goal: "הבנת תעבורת רשת, זיהוי דפוסים חשודים, ופענוח פרוטוקולים בזמן אמת.", topics: [{ name: "עקרונות ניתוח רשת", hours: 8, items: ["כלי Packet Capture", "ממשק ניתוח – filters, views", "Display filters עיקריים", "Capture בזמן אמת vs. ניתוח PCAP"] }, { name: "ניתוח פרוטוקולים", hours: 10, items: ["TCP Handshake", "DNS Queries", "HTTP/S Traffic", "ARP Poisoning"] }, { name: "זיהוי אנומליות ברשת", hours: 10, items: ["Port Scanning", "Large data transfers", "Beaconing – תקשורת C2", "Encrypted traffic"] }, { name: "תרגול מעשי", hours: 7, items: ["ניתוח PCAP files אמיתיים", "תרחישי CTF בסיסיים", "כתיבת דוח ממצאים", "שיתוף ממצאים עם SIEM"] }] },
    { num: 4, title: "SIEM: ניטור ותחקור", hours: 45, goal: "שליטה בעקרונות SIEM לניטור, חקירה ובניית התראות.", topics: [{ name: "ארכיטקטורת SIEM", hours: 12, items: ["כיצד SIEM עובד", "מקורות נתונים: Endpoints, Network, Cloud", "Log Forwarding", "Indexes, Sourcetypes, Events"] }, { name: "שפת חיפוש ותחקור", hours: 15, items: ["עקרונות שפת חיפוש", "Piping, Subsearches, Lookups", "Time-based searches", "ניתוח לוגים: Windows, Linux, Firewall"] }, { name: "Dashboards והתראות", hours: 10, items: ["בניית Dashboards לניטור SOC", "הגדרת Alerts ו-Scheduled Reports", "Correlation Searches", "Notable Events"] }, { name: "Lab מעשי", hours: 8, items: ["חקירת תרחיש פישינג מ-A ל-Z", "Lateral Movement Detection", "Privilege Escalation", "כתיבת דוח חקירה"] }] },
    { num: 5, title: "SIEM מתקדם: ענן ואוטומציה", hours: 45, goal: "SIEM בסביבות ענן, שאילתות מתקדמות, ואוטומציה של תגובה לאירועים.", topics: [{ name: "SIEM בענן", hours: 12, items: ["ארכיטקטורת Cloud SIEM", "חיבור מקורות ענן: Azure AD, AWS, Office 365", "Log Analytics", "Cloud-specific Detections"] }, { name: "שאילתות מתקדמות", hours: 13, items: ["Joins, Unions, Aggregations", "Parameterized Searches", "Threat Intelligence Integration", "Risk-Based Alerting"] }, { name: "Playbooks ו-SOAR", hours: 10, items: ["מהו SOAR", "Logic/Workflow Automation", "Playbook לבידוד מכונה אוטומטי", "Playbook לשליחת עדכון אוטומטי"] }, { name: "Asset & Identity", hours: 10, items: ["Asset Management ב-SIEM", "Identity Framework", "User Behavior Baseline", "Anomalous Login Detection"] }] },
    { num: 6, title: "Incident Response", hours: 35, goal: "ניהול מלא של אירוע סייבר – מזיהוי ועד סגירה ותיעוד.", topics: [{ name: "מחזור חיי האירוע", hours: 10, items: ["NIST IR: Preparation, Detection, Containment", "Triage – סיווג חומרת אירועים", "Escalation", "War Room – ניהול אירוע בצוות"] }, { name: "כלי IR ו-Forensics", hours: 10, items: ["Case Management Systems", "Forensics בסיסי", "Timeline Reconstruction", "MITRE ATT&CK Navigator"] }, { name: "Playbooks ל-SOC", hours: 10, items: ["Playbook לפישינג", "Playbook ל-Ransomware", "Playbook ל-Unauthorized Access", "Playbook ל-Data Exfiltration"] }, { name: "תיעוד ודיווח", hours: 5, items: ["כתיבת Incident Report מקצועי", "Lessons Learned", "מדדי SOC: MTTD, MTTR", "תקשורת מול הנהלה ולקוחות"] }] },
    { num: 7, title: "Threat Intelligence", hours: 30, goal: "הבנה ושימוש ב-Threat Intelligence לזיהוי מוקדם של איומים.", topics: [{ name: "מבוא ל-CTI", hours: 8, items: ["מהי Threat Intelligence?", "Strategic vs Tactical vs Operational", "IOC – Indicators of Compromise", "TTP – Tactics, Techniques, Procedures"] }, { name: "פלטפורמות ומקורות", hours: 10, items: ["Threat Intelligence Platforms", "VirusTotal, Shodan, AbuseIPDB", "MISP", "Dark Web Feeds"] }, { name: "שילוב ב-SIEM", hours: 8, items: ["ייבוא IOC ל-SIEM", "Automated Enrichment", "False Positive Handling", "Threat Intel Workbooks"] }, { name: "מעשי", hours: 4, items: ["ניתוח קמפיין תקיפה אמיתי", "בניית IOC List", "Threat Hunting בסיסי", "כתיבת Intelligence Report"] }] },
    { num: 8, title: "ניתוח נוזקות: Malware Analysis", hours: 30, goal: "הבנה מעשית של נוזקות – ניתוח, זיהוי IOC, ויצירת חוקי זיהוי.", topics: [{ name: "Static Analysis", hours: 8, items: ["ניתוח קבצים: PE, Office, Scripts", "Hashing ו-Fingerprinting", "Strings Analysis", "VirusTotal ו-Hybrid Analysis"] }, { name: "Dynamic Analysis / Sandboxing", hours: 10, items: ["הגדרת Sandbox מבודד", "התנהגות רשתית של נוזקה", "Registry ו-File System changes", "פלטפורמות Sandbox"] }, { name: "IOC Extraction", hours: 7, items: ["חילוץ IPs, Domains, Hashes", "בניית IOC List", "YARA-X – כתיבת חוקים", "Sigma Rules"] }, { name: "מעשי", hours: 5, items: ["ניתוח נוזקה אמיתית", "תיעוד ממצאים", "שיתוף ב-MISP", "כתיבת Malware Report"] }] },
    { num: 9, title: "Detection Engineering", hours: 25, goal: "בניית חוקי זיהוי איכותיים, הפחתת False Positives, ושיפור יכולת הזיהוי.", topics: [{ name: "עקרונות Detection", hours: 6, items: ["מה זה Detection Engineering?", "Use Case Development", "Detection Lifecycle", "Metrics: Detection Rate, FP Rate"] }, { name: "כתיבת חוקי זיהוי", hours: 10, items: ["Sigma Rules", "YARA-X Rules מתקדמות", "KQL / SPL Detection Queries", "Testing ו-Validation"] }, { name: "False Positive Reduction", hours: 5, items: ["Tuning קיים", "Whitelist vs Blacklist", "Risk Scoring", "Contextual Enrichment"] }, { name: "OPSEC לאנליסט", hours: 4, items: ["מניעת Attacker Awareness", "Canary Tokens", "Deception Technologies", "Analyst Visibility Control"] }] },
    { num: 10, title: "הכשרה ב-AI לאנליסט", hours: 50, goal: "שימוש מעשי בכלי AI לייעול עבודת האנליסט ואוטומציה של תהליכים.", topics: [{ name: "מבוא לכלי AI", hours: 10, items: ["ChatGPT, Claude, Gemini – שימוש ב-SOC", "AI לניתוח לוגים ואירועים", "AI לכתיבת דוחות", "מגבלות AI ואחריות מקצועית"] }, { name: "Prompt Engineering", hours: 15, items: ["עקרונות כתיבת Prompts", "Chain of Thought לניתוח אירועים", "Prompts לחקירת לוגים", "Few-Shot Learning לסייבר"] }, { name: "Microsoft Copilot for Security", hours: 15, items: ["הגדרה ושימוש", "Natural Language Queries ב-SIEM", "Incident Summarization אוטומטי", "Threat Intel Enrichment"] }, { name: "אוטומציה ו-AI Agents", hours: 10, items: ["AI Agents לניטור אוטומטי", "שילוב AI ב-SOAR Playbooks", "Automated Report Generation", "עתיד ה-SOC עם AI"] }] },
    { num: 11, title: "Cyber AI – AI בסייבר", hours: 30, goal: "הבנת השפעת ה-AI על עולם הסייבר – הן כנשק תקיפה והן ככלי הגנה.", topics: [{ name: "AI-Powered Attacks", hours: 10, items: ["Deepfake Phishing", "AI-generated Malware", "LLM-based Social Engineering", "Automated Vulnerability Discovery"] }, { name: "AI לזיהוי ומניעה", hours: 10, items: ["Behavioral AI ב-EDR/XDR", "ML-based Anomaly Detection", "AI ב-Email Security", "AI ב-WAF ו-DDoS Protection"] }, { name: "מגמות עתיד", hours: 10, items: ["Autonomous SOC", "AI vs AI – מלחמת הסייבר", "רגולציה על AI בסייבר", "הכנה לעולם עתידי"] }] },
    { num: 12, title: "פרויקט גמר ומוכנות תעסוקתית", hours: 15, goal: "שילוב כל הנלמד בסימולציה מלאה, הכנה לראיונות עבודה, ובניית Portfolio מקצועי.", topics: [{ name: "פרויקט גמר", hours: 8, items: ["סימולציית תקיפה מלאה – A to Z", "CTF – תחרות סיום", "הצגת ממצאים לפני מועצת שופטים", "Portfolio – GitHub ו-LinkedIn"] }, { name: "מוכנות תעסוקתית", hours: 7, items: ["הכנה לראיונות טכניים", "עדכון קורות חיים ו-LinkedIn", "Burnout Prevention לאנליסט SOC", "ליווי השמה עם תכנית לוחמים להייטק"] }] }
  ];

  const faqs = [
    { q: "האם צריך רקע בתכנות?", a: "לא! הקורס מתחיל מאפס ומותאם לאנשים ללא ניסיון בתחום. הרקע הצבאי שלכם מספיק כנקודת פתיחה." },
    { q: "כמה שעות לימוד בשבוע?", a: "4 ימים בשבוע, 10:00-17:00. סה\"כ 430 שעות ב-3.5 חודשים." },
    { q: "מה השכר בתחום הסייבר?", a: "מתחילים בתחום מרוויחים בין 15,000-25,000 ₪ לחודש. עם ניסיון של 2-3 שנים - 30,000-50,000 ₪ ויותר." },
    { q: "האם יש מלגות לחיילים משוחררים?", a: "כן! בשיתוף עם עמותת בוגרי ממרם ותכנית תכנית לוחמים להייטק ישנן מלגות משמעותיות. צרו קשר לפרטים." },
    { q: "לאיזה תפקידים הקורס מכשיר?", a: "SOC Analyst Tier 1/2, Incident Responder ג'וניור, Cyber Threat Intelligence Analyst, ו-Detection Engineer." }
  ];

  const testimonials = [
    { name: "אורי כ.", role: "סיים יחידת קרבית — אנליסט SOC ב-CyberArk", text: "לא האמנתי שתוך חצי שנה אקבל עבודה בחברה כמו CyberArk. הקורס נתן לי בסיס חזק ואת הביטחון שצריך." },
    { name: "ליאור מ.", role: "לוחם שריון — Pen Tester בסטארטאפ", text: "החשיבה הטקטית מהצבא עזרה לי להצטיין בסייבר. הרגשתי שהקורס בנוי בדיוק עבורי." },
    { name: "שקד א.", role: "מסיים פיקוד — Security Engineer", text: "ההשמה של תכנית לוחמים להייטק היתה מדהימה. קיבלתי 3 הצעות עבודה לפני שסיימתי את הקורס." }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900" dir="rtl" style={{ fontFamily: "'Heebo', 'Assistant', sans-serif" }}>

      {/* TOP BAR */}
      <div className="bg-blue-900 text-white text-center text-sm py-2.5 px-4 font-medium tracking-wide">
        קורס בחסות עמותת בוגרי ממרם | תכנית תכנית לוחמים להייטק | מיועד ללוחמים קרביים בלבד
      </div>

      {/* NAVBAR – Z-pattern: Logo right, CTA left */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e574c17d6cef9aeff80637/c6e9d27b9_image.png"
            alt="CyberGo AI Logo"
            className="h-14 w-auto"
          />
          <div className="flex items-center gap-4">
            <a href="https://app.ortamai.com/" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold text-sm hover:text-blue-900 transition-colors">
              אוטומציות
            </a>
            <a href="#register">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-2.5 text-base shadow-md shadow-blue-200">
                הרשמה עכשיו — חינם
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          HERO – Z-pattern, benefit-driven headline
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 px-6">
        {/* subtle background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: Text */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                <Shield className="w-4 h-4" />
                מיועד ללוחמים קרביים בלבד
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5">
                <span className="text-gray-900">3 שנים תרמתם למדינה,</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 to-blue-700">
                  תנו לנו עכשיו לתרום לכם חזרה
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-3 leading-relaxed">
                430 שעות הכשרה מקצועית ל-<strong className="text-gray-900">SOC Analyst</strong> —
                מאפס לקריירה עם שכר של <strong className="text-blue-700">15,000–25,000 ₪</strong> בתוך 3.5 חודשים בלבד.
              </p>
              <p className="text-base text-gray-500 mb-8">
                באר שבע | 4 ימים בשבוע | 10:00–17:00
              </p>

              {/* Social proof micro — below headline, above CTA */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <span className="text-sm text-gray-500">מעל 50 בוגרים השתלבו בתעשיית הסייבר</span>
              </div>

              {/* CTA – primary prominent, secondary muted */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#register" className="flex-1 sm:flex-initial">
                  <Button size="lg" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black text-lg px-10 py-6 shadow-xl shadow-blue-200">
                    קבל שיחת ייעוץ חינמית
                  </Button>
                </a>
                <a href="#syllabus" className="flex-1 sm:flex-initial">
                  <Button size="lg" variant="outline" className="w-full border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-700 text-lg px-10 py-6">
                    לסילבוס המלא
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* RIGHT: Hero Visual Placeholder */}
            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {/* ▼ PLACEHOLDER: החלף בתמונה/וידאו של הקורס */}
              <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-50 border-2 border-dashed border-blue-300 flex flex-col items-center justify-center text-center p-8 shadow-lg">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-blue-600 font-bold text-lg mb-1">[ Placeholder – וידאו / תמונת הקורס ]</p>
                <p className="text-blue-400 text-sm">החלף בוידאו הסבר, תמונת כיתה, או תמונת מגייסים</p>
              </div>
              {/* ▲ END PLACEHOLDER */}
            </motion.div>
          </div>

          {/* Stats row – Z-pattern endpoint */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { n: "400+", u: "שעות הכשרה" },
              { n: "4", u: "חודשים בלבד" },
              { n: "15K", u: "שכר כניסה ₪" },
              { n: "100%", u: "ליווי השמה" }
            ].map((s) => (
              <div key={s.u} className="bg-white border border-blue-100 shadow-sm rounded-xl p-5 text-center">
                <div className="text-3xl font-black text-blue-700">{s.n}</div>
                <div className="text-gray-500 text-sm mt-1">{s.u}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LOGOS / PARTNERS TRUST BAR
      ═══════════════════════════════════════ */}
      <section className="py-10 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-400 text-sm mb-6 font-medium uppercase tracking-widest">בשיתוף פעולה עם</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* ▼ PLACEHOLDER: החלף בלוגואים של שותפים */}
            {["עמותת בוגרי ממרם", "תכנית לוחמים להייטק", "ORTAM AI"].map((p) => (
              <div key={p} className="bg-white border border-gray-200 rounded-lg px-8 py-3 shadow-sm">
                <span className="text-gray-700 font-bold text-base">{p}</span>
              </div>
            ))}
            {/* ▲ END PLACEHOLDER */}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHO IS THIS FOR
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-3">בנוי בדיוק בשבילך</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">אם שירתת בתפקיד קרבי — יש לך כבר את ה-DNA של מומחה סייבר</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-9 h-9 text-blue-600" />, title: "לוחמים קרביים", desc: "חיילים ומפקדים מיחידות קרביות — החשיבה הטקטית שלכם היא יתרון ענק בסייבר" },
              { icon: <Target className="w-9 h-9 text-cyan-600" />, title: "חוזרים מהצבא", desc: "מחפשים כיוון מקצועי ברור עם פוטנציאל שכר גבוה ושוק עבודה רותח" },
              { icon: <Cpu className="w-9 h-9 text-indigo-500" />, title: "ללא ניסיון קודם", desc: "לא צריך רקע בתכנות — הכשרה מאפס. רמת כניסה: אפס רקע טכני" }
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow p-8 text-center h-full">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VIDEO / SOCIAL PROOF SECTION
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-blue-700">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video placeholder */}
            <div>
              {/* ▼ PLACEHOLDER: החלף בוידאו עדות בוגר */}
              <div className="w-full aspect-video rounded-2xl bg-blue-800/60 border-2 border-dashed border-blue-400 flex flex-col items-center justify-center text-center p-8 cursor-pointer hover:bg-blue-800/80 transition-colors">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[0px] border-l-[18px] border-l-white mr-[-4px]" />
                </div>
                <p className="text-white font-bold text-lg mb-1">[ Placeholder – וידאו עדות בוגר ]</p>
                <p className="text-blue-300 text-sm">עדות וידאו של בוגר הקורס — עד 60 שניות</p>
              </div>
              {/* ▲ END PLACEHOLDER */}
            </div>
            {/* Quote */}
            <div>
              <div className="text-5xl text-cyan-400 font-black mb-4 leading-none">"</div>
              <p className="text-white text-xl leading-relaxed mb-6 font-medium">
                לא האמנתי שתוך חצי שנה אקבל עבודה בחברה כמו CyberArk.
                הקורס נתן לי בסיס חזק ואת הביטחון שצריך.
              </p>
              <div className="flex items-center gap-4">
                {/* ▼ PLACEHOLDER: תמונת בוגר */}
                <div className="w-14 h-14 rounded-full bg-blue-500/60 border-2 border-blue-300 flex items-center justify-center text-white font-bold text-lg">
                  א"כ
                </div>
                {/* ▲ END PLACEHOLDER */}
                <div>
                  <div className="text-white font-bold">אורי כ.</div>
                  <div className="text-blue-300 text-sm">SOC Analyst ב-CyberArk | בוגר יחידה קרבית</div>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CYBERGO
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-3">למה CyberGo AI?</h2>
            <p className="text-gray-500 text-lg">4 סיבות שעושות את ההבדל</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <Award className="w-8 h-8 text-yellow-500" />, bg: "bg-yellow-50", title: "מסלול ייחודי ללוחמים", desc: "סבסוד של 95% בעלויות הקורס ליוצאי יחידות קרביות" },
              { icon: <Users className="w-8 h-8 text-cyan-600" />, bg: "bg-cyan-50", title: "קהילת בוגרים חזקה", desc: "הצטרפו לרשת של עשרות בוגרים שעובדים היום בחברות הסייבר המובילות בישראל" },
              { icon: <Target className="w-8 h-8 text-green-600" />, bg: "bg-green-50", title: "השמה ייעודית", desc: "חברת CLI ועוד חברות הייטק בדרום הקצו תקנים ייעודים לעבודה לבוגרי הקורס" },
              { icon: <Shield className="w-8 h-8 text-indigo-600" />, bg: "bg-indigo-50", title: "תכנית ייעודית לקידום הפריפריה", desc: "ליצור גשר של הזדמנויות לצעירי הדרום אל עולם ההייטק" }
            ].map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex gap-5 items-start h-full">
                  <div className={`w-14 h-14 rounded-xl ${b.bg} flex items-center justify-center flex-shrink-0`}>{b.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CAREER PATHS
      ═══════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-3">תפקידים שתוכלו לצאת אליהם</h2>
            <p className="text-gray-500">שוק הסייבר הישראלי רותח — ואלה התפקידים שמחכים לכם</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "SOC Analyst – Tier 1 / Tier 2",
              "Security Operations Center – ניטור ואיתור איומים",
              "Incident Responder ג'וניור",
              "Cyber Threat Intelligence Analyst",
              "Detection Engineer"
            ].map((role) => (
              <div key={role} className="bg-white border border-blue-100 rounded-xl px-5 py-4 flex items-center gap-3 shadow-sm">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-800 text-sm font-medium">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SYLLABUS
      ═══════════════════════════════════════ */}
      <section id="syllabus" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-3">סילבוס הקורס</h2>
            <p className="text-gray-500 mb-1">SOC Analyst – כולל הכשרה ב-AI ו-Cyber AI | גרסה 2.0</p>
            <p className="text-blue-600 text-sm font-semibold">סה"כ 430 שעות | 3.5 חודשים | 4 ימים בשבוע | 10:00–17:00</p>
          </motion.div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <button onClick={() => setActiveTab("overview")} className={`px-5 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${activeTab === "overview" ? "bg-blue-700 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              סקירה כללית
            </button>
            {syllabusUnits.map((u) => (
              <button key={u.num} onClick={() => setActiveTab(`unit-${u.num}`)} className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${activeTab === `unit-${u.num}` ? "bg-blue-700 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                יחידה {u.num}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white border-gray-200 shadow-sm overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-700">
                      <th className="text-right px-6 py-3.5 text-white font-bold">#</th>
                      <th className="text-right px-6 py-3.5 text-white font-bold">יחידת לימוד</th>
                      <th className="text-right px-6 py-3.5 text-white font-bold">שעות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syllabusUnits.map((row, i) => (
                      <tr key={row.num} className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`} onClick={() => setActiveTab(`unit-${row.num}`)}>
                        <td className="px-6 py-3 text-blue-700 font-bold">{row.num}</td>
                        <td className="px-6 py-3 text-gray-800">{row.title}</td>
                        <td className="px-6 py-3 text-gray-600">{row.hours}</td>
                      </tr>
                    ))}
                    <tr className="bg-blue-50">
                      <td colSpan={2} className="px-6 py-3 text-gray-900 font-black">סה"כ שעות</td>
                      <td className="px-6 py-3 text-blue-700 font-black">430</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
              <p className="text-gray-400 text-xs text-center">הקורס אינו מחויב לכלי ספציפי אחד. הלומד יחשף לעקרונות ומתודולוגיות הניתנות ליישום בכל פלטפורמת SIEM, EDR, או XDR.</p>
            </motion.div>
          )}

          {syllabusUnits.map((unit) =>
            activeTab === `unit-${unit.num}` ? (
              <motion.div key={unit.num} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="text-blue-600 text-sm font-semibold mb-1">יחידה {unit.num}</div>
                      <h3 className="text-2xl font-black text-gray-900">{unit.title}</h3>
                    </div>
                    <div className="bg-blue-700 rounded-lg px-4 py-2 text-white font-bold">{unit.hours} שעות</div>
                  </div>
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed">מטרה: {unit.goal}</p>
                </div>
                <div className="space-y-4">
                  {unit.topics.map((topic) => (
                    <Card key={topic.name} className="bg-white border-gray-200 shadow-sm overflow-hidden">
                      <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex justify-between items-center">
                        <span className="text-gray-900 font-bold">{topic.name}</span>
                        <span className="text-gray-500 text-sm">{topic.hours} שעות</span>
                      </div>
                      <ul className="p-6 space-y-2">
                        {topic.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                            <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  {unit.num > 1 && <button onClick={() => setActiveTab(`unit-${unit.num - 1}`)} className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors font-semibold">← יחידה {unit.num - 1}</button>}
                  {unit.num < syllabusUnits.length && <button onClick={() => setActiveTab(`unit-${unit.num + 1}`)} className="px-5 py-2.5 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800 transition-colors font-semibold">יחידה {unit.num + 1} →</button>}
                </div>
              </motion.div>
            ) : null
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS – humanized with avatar placeholders
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-3">מה אומרים הבוגרים?</h2>
            <div className="flex justify-center items-center gap-2 mt-4">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}</div>
              <span className="text-gray-600 font-semibold">4.9 מתוך 5</span>
              <span className="text-gray-400 text-sm">(52 ביקורות)</span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5 flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    {/* ▼ PLACEHOLDER: תמונת בוגר */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    {/* ▲ END PLACEHOLDER */}
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-blue-600 text-xs mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-3">שאלות נפוצות</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className="bg-white border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:border-blue-200 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="px-6 py-5 flex justify-between items-center">
                    <h3 className="text-gray-900 font-semibold">{faq.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform flex-shrink-0 mr-4 ${openFaq === i ? "rotate-180" : ""}`} />
                  </div>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 text-sm">
                      {faq.a}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          REGISTER FORM – CTA section (Z-pattern endpoint)
      ═══════════════════════════════════════ */}
      <section id="register" className="py-24 px-6 bg-gradient-to-br from-blue-700 to-blue-900">
        <div className="max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-white mb-3">קבל שיחת ייעוץ חינמית</h2>
              <p className="text-blue-200 text-lg">נחזור אליכם תוך 24 שעות עם כל הפרטים על הקורס, מלגות ותאריכי פתיחה</p>
            </div>

            <Card className="bg-white border-0 shadow-2xl p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">פרטיך התקבלו!</h3>
                  <p className="text-gray-500">ניצור איתך קשר בהקדם לשיחת ייעוץ חינמית</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">שם מלא *</Label>
                    <Input id="name" required value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="border-gray-300 h-12 text-base" placeholder="הכנס שמך המלא" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">מספר טלפון *</Label>
                    <Input id="phone" required value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} className="border-gray-300 h-12 text-base" placeholder="050-XXX-XXXX" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">אימייל</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className="border-gray-300 h-12 text-base" placeholder="your@email.com" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black text-lg py-6 shadow-lg shadow-blue-200 mt-2">
                    {isSubmitting ? "שולח..." : "קבל שיחת ייעוץ חינמית →"}
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                    <Shield className="w-3.5 h-3.5" />
                    הפרטים שלכם מאובטחים ולא יועברו לגורמים שלישיים
                  </div>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 bg-gray-950 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white">CyberGo AI</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">קורס סייבר ובינה מלאכותית ללוחמים קרביים | באר שבע</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400 mb-6 flex-wrap">
            <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> 052-338-1822</span>
            <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> yoni.ortam@gmail.com</span>
          </div>
          <p className="text-gray-600 text-xs">© 2025 CyberGo AI | ORTAM AI LTD — כל הזכויות שמורות</p>
        </div>
      </footer>
    </div>
  );
}