import React from 'react';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "../components/LanguageContext";

const AIMarketingTraining = () => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const styles = {
    body: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.8,
      color: '#003366',
      backgroundColor: '#f8f9fa',
      margin: 0,
      padding: 0,
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: 0,
    },
    hero: {
      background: 'linear-gradient(to bottom, #ffffff 0%, #f0f9f8 100%)',
      color: '#003366',
      padding: '80px 40px',
      textAlign: 'center',
      borderBottom: '3px solid #009688',
    },
    heroH1: {
      fontSize: '3em',
      marginBottom: '20px',
      fontWeight: 700,
      color: '#003366',
    },
    heroH2: {
      fontSize: '1.8em',
      fontWeight: 400,
      color: '#009688',
      marginTop: '10px',
    },
    heroSubtitle: {
      fontSize: '1.2em',
      marginTop: '30px',
      fontWeight: 400,
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#555',
      lineHeight: 1.6,
    },
    section: {
      padding: '60px 40px',
      background: 'white',
    },
    sectionAlt: {
      padding: '60px 40px',
      background: '#f8f9fa',
    },
    sectionGray: {
      background: '#f8f9fa',
      padding: '40px',
    },
    h2: {
      color: '#003366',
      fontSize: '2.2em',
      marginBottom: '30px',
      textAlign: 'center',
      fontWeight: 700,
    },
    h3: {
      color: '#009688',
      fontSize: '1.6em',
      margin: '40px 0 20px 0',
      fontWeight: 600,
    },
    introText: {
      fontSize: '1.15em',
      color: '#4a4a4a',
      lineHeight: 1.8,
      marginBottom: '20px',
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      maxWidth: '900px',
      margin: '0 auto',
    },
    summaryItem: {
      background: 'white',
      padding: '30px 20px',
      textAlign: 'center',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    summaryNumber: {
      fontSize: '2em',
      fontWeight: 700,
      color: '#009688',
      marginBottom: '8px',
    },
    summaryLabel: {
      color: '#666',
      fontSize: '0.95em',
    },
    processStep: {
      background: 'white',
      padding: '30px',
      marginBottom: '25px',
      borderRight: '5px solid #009688',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    },
    moduleHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '20px',
    },
    moduleNumber: {
      background: '#009688',
      color: 'white',
      width: '45px',
      height: '45px',
      lineHeight: '45px',
      textAlign: 'center',
      borderRadius: '6px',
      fontWeight: 700,
      fontSize: '1.3em',
      flexShrink: 0,
    },
    moduleTitle: {
      margin: 0,
      flex: 1,
      fontSize: '1.5em',
      fontWeight: 700,
    },
    moduleDuration: {
      color: '#999',
      fontSize: '0.95em',
    },
    moduleDescription: {
      color: '#4a4a4a',
      lineHeight: 1.8,
      marginBottom: '20px',
    },
    ul: {
      marginRight: '25px',
      marginTop: '15px',
    },
    li: {
      marginBottom: '10px',
      fontSize: '1.05em',
    },
    deliverable: {
      background: '#e8f5f3',
      padding: '15px 20px',
      marginTop: '20px',
      borderRadius: '6px',
      fontWeight: 600,
      color: '#00695c',
    },
    toolsBox: {
      background: '#f8f9fa',
      padding: '12px 18px',
      marginTop: '15px',
      borderRadius: '6px',
      fontSize: '0.95em',
      border: '1px solid #e0e0e0',
    },
    toolsLabel: {
      fontWeight: 600,
      color: '#003366',
    },
    toolsList: {
      color: '#666',
    },
    capabilities: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '30px',
    },
    capabilityItem: {
      background: 'white',
      padding: '25px',
      borderRadius: '8px',
      borderRight: '4px solid #009688',
      fontWeight: 600,
      fontSize: '1.1em',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    roiTable: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '30px 0',
      boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    roiTableTh: {
      background: '#009688',
      color: 'white',
      padding: '20px',
      textAlign: 'right',
      fontSize: '1.2em',
    },
    roiTableTd: {
      padding: '18px 20px',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '1.05em',
    },
    roiCalc: {
      background: 'linear-gradient(135deg, #e8f5f3 0%, #f0f9f8 100%)',
      padding: '35px',
      borderRadius: '10px',
      margin: '30px 0',
      border: '2px solid #009688',
    },
    roiItem: {
      background: 'white',
      padding: '15px 25px',
      margin: '12px 0',
      borderRadius: '6px',
      fontSize: '1.1em',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    },
    roiHighlight: {
      fontSize: '1.8em',
      fontWeight: 700,
      color: '#009688',
      textAlign: 'center',
      margin: '25px 0',
      padding: '20px',
      background: 'white',
      borderRadius: '8px',
    },
    bonusSection: {
      background: '#fff9e6',
      padding: '25px',
      borderRadius: '8px',
      marginTop: '25px',
      borderRight: '4px solid #ffa726',
    },
    bonusH4: {
      color: '#f57c00',
      marginBottom: '15px',
    },
    audienceList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '15px',
      marginTop: '30px',
    },
    audienceItem: {
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      fontWeight: 600,
      fontSize: '1.05em',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      borderBottom: '3px solid #009688',
    },
    teamSize: {
      background: '#009688',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      fontSize: '1.2em',
      fontWeight: 600,
      margin: '30px 0',
    },
    workDetails: {
      background: 'white',
      padding: '30px',
      borderRadius: '10px',
      margin: '20px 0',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    },
    workDetailItem: {
      padding: '15px 0',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '1.1em',
    },
    workDetailLabel: {
      fontWeight: 700,
      color: '#009688',
      marginLeft: '10px',
    },
    deliverablesList: {
      marginTop: '20px',
      background: '#f8f9fa',
      padding: '25px',
      borderRadius: '8px',
    },
    cta: {
      background: 'linear-gradient(135deg, #003366 0%, #00695c 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '80px 40px',
    },
    ctaH2: {
      color: 'white',
      fontSize: '2.5em',
      marginBottom: '20px',
    },
    ctaP: {
      fontSize: '1.3em',
      maxWidth: '700px',
      margin: '0 auto 40px auto',
      opacity: 0.95,
    },
    ctaButton: {
      display: 'inline-block',
      background: '#009688',
      color: 'white',
      padding: '18px 50px',
      fontSize: '1.3em',
      fontWeight: 600,
      borderRadius: '6px',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      cursor: 'pointer',
    },
    footer: {
      background: '#003366',
      color: 'white',
      textAlign: 'center',
      padding: '40px 20px',
    },
    footerH3: {
      color: '#009688',
      marginBottom: '10px',
    },
    footerP: {
      opacity: 0.9,
      fontSize: '1em',
    },
    footerNote: {
      fontSize: '0.85em',
      marginTop: '30px',
      opacity: 0.7,
      lineHeight: 1.6,
    },
  };

  const checkIcon = "✓";

  return (
    <div style={styles.body}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroH1}>{isEn ? "AI Training for Marketing Teams" : "הכשרת AI למחלקת שיווק"}</h1>
          <h2 style={styles.heroH2}>{isEn ? "Professional Training for Marketing Professionals & Managers" : "הכשרה מקצועית לאנשי ומנהלי שיווק"}</h2>
          <p style={styles.heroSubtitle}>{isEn ? "44 hours | Practical training in AI for advanced marketing" : "44 שעות | הכשרה מעשית בבינה מלאכותית לשיווק מתקדם"}</p>
        </div>
      </div>

      {/* Intro */}
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.introText}>
            <strong>{isEn ? "Marketing teams that want to lead their marketing into the AI era" : "מחלקות שיווק שרוצים להוביל את הפעילות השיווקית שלהם לעידן ה-AI"}</strong> {isEn ? "— produce 5x more quality content, reduce vendor costs by 70%, and improve marketing ROI by 30–50%." : "- לייצר פי 5 יותר תוכן איכותי, להפחית עלויות ספקים ב-70%, ולשפר ROI שיווקי ב-30%-50%."}
          </p>
          <p style={styles.introText}>
            {isEn ? "This training is for those seeking " : "ההכשרה מיועדת למי שמחפש "}<strong>{isEn ? "immediate implementation and measurable results" : "יישום מיידי ותוצאות מדידות"}</strong>{isEn ? " — AI marketing tools that work from day one and stay in the company permanently. " : " - כלי AI שיווקיים שעובדים מהשבוע הראשון ונשארים בחברה לצמיתות. "}<strong>{isEn ? "No prior technical knowledge required." : "אין צורך בידע טכני מוקדם."}</strong>
          </p>
        </div>
      </section>

      {/* Summary Grid */}
      <section style={styles.sectionGray}>
        <div style={styles.container}>
          <div style={styles.summaryGrid}>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>5</div>
              <div style={styles.summaryLabel}>{isEn ? "Modules" : "מודולים"}</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>44</div>
              <div style={styles.summaryLabel}>{isEn ? "Study Hours" : "שעות לימוד"}</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>24/7</div>
              <div style={styles.summaryLabel}>{isEn ? "Support & Assistance" : "ליווי וסיוע"}</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>100%</div>
              <div style={styles.summaryLabel}>{isEn ? "Practical" : "מעשי ויישומי"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={{...styles.h2, marginBottom: '50px'}}>{isEn ? "Training Modules" : "מודולי ההכשרה"}</h2>

          {/* Module 1 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>1</div>
              <h3 style={styles.moduleTitle}>{isEn ? "AI Marketing Strategy & Content" : "אסטרטגיה ותוכן שיווקי עם AI"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "6 hours" : "6 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to build winning marketing strategies and produce quality content 5x faster — from competitor analysis to creating multi-channel campaigns:" : "תלמדו לבנות אסטרטגיות שיווק מנצחות ולייצר תוכן איכותי במהירות פי 5 - מניתוח מתחרים ועד ליצירת קמפיינים רב-ערוציים:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Building marketing strategies with deep competitor analysis" : "בניית אסטרטגיות שיווק עם ניתוח מעמיק של מתחרים"}</li>
              <li style={styles.li}>{isEn ? "Creating professional marketing content — posts, articles, scripts" : "יצירת תוכן שיווקי מקצועי - פוסטים, מאמרים, סקריפטים"}</li>
              <li style={styles.li}>{isEn ? "Writing converting copy for ads and landing pages" : "כתיבת קופי ממיר למודעות ודפי נחיתה"}</li>
              <li style={styles.li}>{isEn ? "Adapting marketing messages to different target audiences" : "התאמת מסרים שיווקיים לקהלי יעד שונים"}</li>
              <li style={styles.li}>{isEn ? "Planning integrated campaigns across all channels" : "תכנון קמפיינים משולבים בכל הערוצים"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to produce quality marketing content 5x faster, with messages personalized for each target audience." : "היכולת לייצר תוכן שיווקי איכותי פי 5 מהר יותר, עם מסרים מותאמים אישית לכל קהל יעד"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, Gemini, Perplexity, Jasper, Copy.ai</span>
            </div>
          </div>

          {/* Module 2 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>2</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Visual Creation — Images & Design" : "יצירה ויזואלית - תמונות ועיצוב"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "8 hours" : "8 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Create professional visual materials without designers — from marketing images to full branding materials, all in-house:" : "תייצרו חומרים ויזואליים מקצועיים ללא מעצבים - מתמונות שיווקיות ועד חומרי מיתוג מלאים, כל זה בעצמכם:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Creating marketing images with Midjourney, DALL-E 3, Flux 1.1 Pro" : "יצירת תמונות שיווקיות עם Midjourney, DALL-E 3, Flux 1.1 Pro"}</li>
              <li style={styles.li}>{isEn ? "Designing professional marketing materials with Canva AI and Recraft V3" : "עיצוב חומרי שיווק מקצועיים עם Canva AI ו-Recraft V3"}</li>
              <li style={styles.li}>{isEn ? "Creating logos, banners and branding materials" : "יצירת לוגואים, באנרים וחומרי מיתוג"}</li>
              <li style={styles.li}>{isEn ? "Advanced image editing with Photoshop AI" : "עריכה מתקדמת של תמונות עם Photoshop AI"}</li>
              <li style={styles.li}>{isEn ? "Adapting materials for different platforms (Instagram, Facebook, LinkedIn)" : "התאמת חומרים לפלטפורמות שונות (Instagram, Facebook, LinkedIn)"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to create professional visual materials independently, saving ₪15K–30K/month in design costs." : "היכולת ליצור חומרים ויזואליים מקצועיים בעצמכם, חיסכון של ₪15K-30K בחודש בעלויות עיצוב"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> Midjourney, DALL-E 3, Flux, Ideogram, Canva AI, Recraft V3, Adobe Firefly</span>
            </div>
          </div>

          {/* Module 3 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>3</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Creating Marketing Videos" : "יצירת סרטונים שיווקיים"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "12 hours" : "12 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Produce professional marketing videos without a production team — from social media reels to full ad videos:" : "תייצרו סרטונים שיווקיים מקצועיים ללא צוות הפקה - מרילס לרשתות החברתיות ועד סרטוני פרסום מלאים:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Creating videos from text with Sora 2, VEO 3, KLING" : "יצירת סרטונים מטקסט עם Sora 2, VEO 3, KLING"}</li>
              <li style={styles.li}>{isEn ? "Smart video editing with CapCut AI and Runway" : "עריכת סרטונים חכמה עם CapCut AI ו-Runway"}</li>
              <li style={styles.li}>{isEn ? "Adding voiceover and automatic translation with ElevenLabs" : "הוספת דיבוב ותרגום אוטומטי עם ElevenLabs"}</li>
              <li style={styles.li}>{isEn ? "Creating talking avatars with HeyGen and Synthesia" : "יצירת אווטרים מדברים עם HeyGen ו-Synthesia"}</li>
              <li style={styles.li}>{isEn ? "Producing Reels and Shorts for social media" : "הפקת רילס ו-Shorts לרשתות חברתיות"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to produce professional marketing videos independently, saving tens of thousands of shekels in production." : "היכולת לייצר סרטונים שיווקיים מקצועיים באופן עצמאי, חיסכון בעשרות אלפי שקלים בהפקות"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> Sora 2, VEO 3, KLING, Runway, CapCut, HeyGen, Synthesia, ElevenLabs</span>
            </div>
          </div>

          {/* Module 4 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>4</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Marketing Automations" : "אוטומציות שיווקיות"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "8 hours" : "8 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Build automated processes that save time and improve performance — from smart email to data analytics:" : "תבנו תהליכים אוטומטיים שחוסכים זמן ומשפרים ביצועים - מדוא\"ל חכם ועד ניתוח נתונים:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Building email automations with full personalization" : "בניית אוטומציות דוא\"ל עם התאמה אישית מלאה"}</li>
              <li style={styles.li}>{isEn ? "Lead management and automatic scoring systems" : "מערכות ניהול לידים ודירוג אוטומטי"}</li>
              <li style={styles.li}>{isEn ? "Campaign performance analysis and automatic reporting" : "ניתוח ביצועי קמפיינים ודיווח אוטומטי"}</li>
              <li style={styles.li}>{isEn ? "Marketing chatbots for customer accompaniment" : "צ'אטבוטים שיווקיים לליווי לקוחות"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "Automated marketing processes saving 80–120 hours/month and improving conversions." : "תהליכים שיווקיים אוטומטיים שחוסכים 80-120 שעות בחודש ומשפרים המרות"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> n8n*, HubSpot AI, ActiveCampaign, Tidio, ManyChat</span>
            </div>
          </div>

          {/* Module 5 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>5</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Autonomous AI Marketing Agents" : "סוכני AI שיווקיים אוטונומיים"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "10 hours" : "10 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Build an AI marketing team that works independently — smart agents managing content, analytics, SEO and social media:" : "תבנו צוות AI שיווקי שעובד עבורכם באופן עצמאי - סוכנים חכמים שמנהלים תוכן, ניתוח, SEO ומדיה חברתית:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Content agent — automatically creates and publishes posts" : "בניית סוכן תוכן - יוצר ומפרסם פוסטים באופן אוטומטי"}</li>
              <li style={styles.li}>{isEn ? "Analytics agent — analyzes campaigns and suggests improvements" : "סוכן ניתוח - מנתח קמפיינים ומציע שיפורים"}</li>
              <li style={styles.li}>{isEn ? "SEO agent — automatic content optimization" : "סוכן SEO - אופטימיזציה אוטומטית של תוכן"}</li>
              <li style={styles.li}>{isEn ? "Social media agent — full management of all channels" : "סוכן מדיה חברתית - ניהול מלא של כל הערוצים"}</li>
              <li style={styles.li}>{isEn ? "Customization and deployment of dedicated agents for the company" : "התאמה והטמעה של סוכנים ייעודיים לחברה"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "3–5 AI marketing agents working 24/7, fully owned by the company — ability to manage 3x more marketing activity." : "3-5 סוכני AI שיווקיים שעובדים 24/7 בבעלות מלאה של החברה - יכולת לנהל פי 3 יותר פעילות שיווקית"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> GPTs, Claude Projects, LangChain, CrewAI, AutoGen, n8n* AI Agents</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "What Will Your Team Know by the End?" : "מה הצוות שלכם יידע בסיום?"}</h2>
          <div style={styles.capabilities}>
            <div style={styles.capabilityItem}>✓ {isEn ? "Produce quality marketing content 5x faster" : "לייצר תוכן שיווקי איכותי במהירות פי 5"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Build complex multi-channel campaigns" : "לבנות קמפיינים רב-ערוציים מורכבים"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Create professional visuals without designers" : "ליצור חומרים ויזואליים מקצועיים ללא מעצבים"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Run advanced marketing automations" : "להפעיל אוטומציות שיווק מתקדמות"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Measure and improve ROI continuously with AI" : "למדוד ולשפר ROI באופן שוטף עם AI"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Work with AI agents managing full processes" : "לעבוד עם סוכני AI שמנהלים תהליכים מלאים"}</div>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Measurable Business Results (ROI)" : "תוצאות עסקיות מדידות (ROI)"}</h2>
          
          <table style={styles.roiTable}>
            <thead>
              <tr>
                <th style={styles.roiTableTh}>{isEn ? "Area" : "תחום"}</th>
                <th style={styles.roiTableTh}>{isEn ? "Measurable Improvement" : "שיפור מדיד"}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{background: '#f5f5f5'}}>
                <td style={styles.roiTableTd}>{isEn ? "Content creation time" : "זמן יצירת תוכן"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "60–80% reduction" : "60-80% הפחתה"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>{isEn ? "Design & production costs" : "עלויות עיצוב וייצור"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "50–70% savings" : "50-70% חיסכון"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={styles.roiTableTd}>{isEn ? "Campaign management" : "ניהול קמפיינים"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "40–60% efficiency gain" : "40-60% ייעול"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>Conversion Rate</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "20–40% improvement" : "20-40% שיפור"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}>Cost Per Lead</td>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}><strong>{isEn ? "30–50% reduction" : "30-50% הפחתה"}</strong></td>
              </tr>
            </tbody>
          </table>

          <div style={styles.roiCalc}>
            <h3 style={{...styles.h3, marginTop: 0, textAlign: 'center'}}>{isEn ? "Sample ROI Calculation" : "חישוב ROI לדוגמה"}</h3>
            <p style={{textAlign: 'center', fontWeight: 600, fontSize: '1.2em', marginBottom: '25px'}}>
              {isEn ? "Marketing department with 6 employees:" : "מחלקת שיווק עם 6 עובדים:"}
            </p>
            
            <div style={styles.roiItem}>{isEn ? "Savings on external vendors: " : "חיסכון בספקים חיצוניים: "}<strong>₪15K–30K/{isEn ? "month" : "חודש"}</strong> {isEn ? "(designers, writers, editors)" : "(מעצבים, כותבים, עורכים)"}</div>
            <div style={styles.roiItem}>{isEn ? "Team time savings: " : "חיסכון בזמן צוות: "}<strong>120–180 {isEn ? "hours/month" : "שעות/חודש"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Conversion improvement: " : "שיפור ב-Conversion: "}<strong>{isEn ? "30% increase in marketing ROI" : "30% עלייה ב-ROI שיווקי"}</strong></div>
            
            <div style={styles.roiHighlight}>{isEn ? "Estimated annual savings: ₪250K – ₪500K" : "חיסכון שנתי מוערך: ₪250K - ₪500K"}</div>
          </div>

          <div style={styles.bonusSection}>
            <h4 style={styles.bonusH4}>{isEn ? "In addition to the financial savings:" : "בנוסף לחיסכון הכספי:"}</h4>
            <ul>
              <li>{isEn ? "AI marketing agents that stay in the company permanently" : "סוכני AI שיווקיים שנשארים בחברה לצמיתות"}</li>
              <li>{isEn ? "Template library and digital assets fully owned by the company" : "ספריית תבניות ונכסים דיגיטליים בבעלות מלאה"}</li>
              <li>{isEn ? "Ability to produce 3–5x more content in the same time" : "יכולת להפיק פי 3-5 יותר תוכן באותו זמן"}</li>
              <li>{isEn ? "Independence from external vendors — in-house creation" : "עצמאות מספקים חיצוניים - יצירה פנימית"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Who Is This For?" : "למי זה מתאים?"}</h2>
          <div style={styles.audienceList}>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Marketing Managers" : "מנהלי שיווק"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Content Managers" : "מנהלי תוכן"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Social Media Managers" : "מנהלי מדיה חברתית"}</div>
            <div style={styles.audienceItem}>✓<br/>Copywriters</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Digital Campaign Managers" : "מנהלי קמפיינים דיגיטליים"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Product & Growth Managers" : "מנהלי מוצר ו-Growth"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Designers & Content Creators" : "מעצבים ויוצרי תוכן"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "SEO & Performance Managers" : "מנהלי SEO ו-Performance"}</div>
          </div>
          <div style={styles.teamSize}>{isEn ? "Recommended team size: 6–20 participants" : "גודל צוות מומלץ: 6-20 משתתפים"}</div>
        </div>
      </section>

      {/* Work Model */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Work Model" : "מודל העבודה"}</h2>
          
          <div style={styles.workDetails}>
            <div style={styles.workDetailItem}>
              <span style={styles.workDetailLabel}>{isEn ? "Duration:" : "משך:"}</span> {isEn ? "8–12 weeks (tailored to needs)" : "8-12 שבועות (מותאם לצרכים)"}
            </div>
            <div style={styles.workDetailItem}>
              <span style={styles.workDetailLabel}>{isEn ? "Format:" : "פורמט:"}</span> {isEn ? "In-person / Hybrid / Online" : "פנים-ארגוני / היברידי / מקוון"}
            </div>
            <div style={{...styles.workDetailItem, borderBottom: 'none'}}>
              <span style={styles.workDetailLabel}>{isEn ? "Support:" : "תמיכה:"}</span> {isEn ? "Ongoing mentoring after training ends" : "ליווי מתמשך גם לאחר סיום ההכשרה"}
            </div>
          </div>

          <div style={styles.deliverablesList}>
            <h4 style={{color: '#003366', marginBottom: '15px', fontSize: '1.2em'}}>{isEn ? "Guaranteed Deliverables:" : "תוצרים מובטחים:"}</h4>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "3–5 active AI marketing agents" : "3-5 סוכני AI שיווקיים פועלים"}</li>
              <li style={styles.li}>{isEn ? "Template & prompt library for all marketing tasks" : "ספריית תבניות ופרומפטים לכל משימות השיווק"}</li>
              <li style={styles.li}>{isEn ? "Full automation systems for campaigns" : "מערכות אוטומציה מלאות לקמפיינים"}</li>
              <li style={styles.li}>{isEn ? "Digital assets owned by the company" : "נכסים דיגיטליים בבעלות החברה"}</li>
              <li style={styles.li}>{isEn ? "Measurable improvement in marketing KPIs" : "שיפור מדיד במדדי ביצוע שיווקיים"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={styles.cta}>
        <div style={styles.container}>
          <h2 style={styles.ctaH2}>{isEn ? "Next Step" : "הצעד הבא"}</h2>
          <p style={styles.ctaP}>
            {isEn ? "I'd be happy to meet, learn about your marketing activity, and build a personalized AI plan for your marketing department." : "אשמח להגיע לפגישת היכרות, להכיר את הפעילות השיווקית שלכם ולבנות תוכנית AI למחלקת השיווק מותאמת אישית."}
          </p>
          <Link to={createPageUrl("Contact")} style={styles.ctaButton}>{isEn ? "Let's Talk" : "בואו נדבר"}</Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <h3 style={styles.footerH3}>ORTAM AI LTD</h3>
          <p style={styles.footerP}>Making AI Accessible & Practical</p>
          <p style={styles.footerNote}>
            {isEn ? "* Tools mentioned in the training may be updated in favor of more suitable and advanced tools that appear on the market, while fully maintaining alignment with training objectives and professional skill development." : "* הכלים המוזכרים בהכשרה עשויים להשתנות לטובת כלים מתאימים ומתקדמים יותר שיופיעו בשוק, תוך שמירה על התאמה מלאה ליעדי ההכשרה והקניית היכולות המקצועיות."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIMarketingTraining;