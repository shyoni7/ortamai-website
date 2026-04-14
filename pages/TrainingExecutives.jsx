import React from 'react';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "../components/LanguageContext";

const TrainingExecutives = () => {
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
          <h1 style={styles.heroH1}>{isEn ? "AI Training for Senior Executives" : "הכשרת AI למנהלים בכירים"}</h1>
          <h2 style={styles.heroH2}>{isEn ? "Strategic AI Training for Senior Management" : "הכשרה אסטרטגית להנהלה בכירה בעידן ה-AI"}</h2>
          <p style={styles.heroSubtitle}>{isEn ? "24 hours | Practical training in strategic management, report analysis, and AI-based decision-making" : "24 שעות | הכשרה מעשית בניהול אסטרטגי, ניתוח דוחות וקבלת החלטות מבוססת AI"}</p>
        </div>
      </div>

      {/* Intro */}
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.introText}>
            <strong>{isEn ? "For senior executives who want to lead their organization in the AI era" : "למנהלים בכירים שרוצים להוביל את הארגון בעידן ה-AI"}</strong> {isEn ? "— understand the strategic potential of AI, make informed data-driven decisions, and lead successful digital transformation." : " - להבין את הפוטנציאל האסטרטגי של AI, לקבל החלטות מושכלות מבוססות נתונים, ולהוביל טרנספורמציה דיגיטלית מוצלחת בארגון."}
          </p>
          <p style={styles.introText}>
            {isEn ? "Designed for C-level, VP, and senior managers seeking " : "ההכשרה מיועדת ל-C-level, VP ומנהלים בכירים שמחפשים "}<strong>{isEn ? "a real strategic advantage" : "יתרון אסטרטגי אמיתי"}</strong>{isEn ? " — understanding technology without becoming technicians, identifying business opportunities, and leading organizational change. " : " - להבין את הטכנולוגיה מבלי להפוך לטכנאים, לזהות הזדמנויות עסקיות, ולהוביל שינוי ארגוני. "}<strong>{isEn ? "No prior technical knowledge required." : "אין צורך בידע טכני מוקדם."}</strong>
          </p>
        </div>
      </section>

      {/* Summary Grid */}
      <section style={styles.sectionGray}>
        <div style={styles.container}>
          <div style={styles.summaryGrid}>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>4</div>
              <div style={styles.summaryLabel}>מודולים</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>24</div>
              <div style={styles.summaryLabel}>שעות לימוד</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>24/7</div>
              <div style={styles.summaryLabel}>ליווי וסיוע</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>100%</div>
              <div style={styles.summaryLabel}>מעשי ואסטרטגי</div>
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
              <h3 style={styles.moduleTitle}>{isEn ? "AI Literacy for Executives — Strategy & Business Potential" : "AI Literacy להנהלה - אסטרטגיה ופוטנציאל עסקי"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "6 hours" : "6 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "A deep understanding of AI at the strategic level — not technology for its own sake, but how AI changes markets, industries, and business models:" : "הבנה מעמיקה של AI ברמה אסטרטגית - לא טכנולוגיה לשם טכנולוגיה, אלא כיצד AI משנה שווקים, תעשיות ומודלים עסקיים:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "What AI is and why it changes the rules of the game — a business perspective" : "מה זה AI ולמה זה משנה את כללי המשחק - בפרספקטיבה עסקית"}</li>
              <li style={styles.li}>{isEn ? "Global case studies — how leading companies use AI" : "מקרי בוחן גלובליים - איך חברות מובילות משתמשות ב-AI"}</li>
              <li style={styles.li}>{isEn ? "Opportunities and risks — how AI affects your business model" : "הזדמנויות וסיכונים - איך AI משפיע על המודל העסקי שלכם"}</li>
              <li style={styles.li}>{isEn ? "Limitations and realistic expectations — what's possible and what isn't" : "מגבלות וציפיות ריאליות - מה אפשרי ומה לא"}</li>
              <li style={styles.li}>{isEn ? "Competition in the AI era — how to stay relevant" : "תחרות בעידן AI - איך להישאר רלוונטיים"}</li>
              <li style={styles.li}>{isEn ? "Building an organizational AI strategy — where to start" : "בניית אסטרטגיית AI ארגונית - מאיפה מתחילים"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "A deep understanding of AI's strategic potential, the ability to identify business opportunities and make informed decisions about AI investments." : "הבנה עמוקה של הפוטנציאל האסטרטגי של AI, יכולת לזהות הזדמנויות עסקיות ולקבל החלטות מושכלות לגבי השקעות ב-AI"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, Gemini, Perplexity, McKinsey AI Reports</span>
            </div>
          </div>

          {/* Module 2 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>2</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Report Analysis & Data-Driven Decision Making" : "ניתוח דוחות וקבלת החלטות מבוססת נתונים"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "7 hours" : "7 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to analyze financial, operational, and strategic reports quickly and make smart decisions:" : "תלמדו לנתח דוחות כספיים, תפעוליים ואסטרטגיים במהירות ולקבל החלטות חכמות:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Financial report analysis — P&L, balance sheet, cash flow" : "ניתוח דוחות כספיים - P&L, מאזן, תזרים מזומנים"}</li>
              <li style={styles.li}>{isEn ? "Operational performance analysis — KPIs, dashboards, trends" : "ניתוח ביצועים תפעוליים - KPIs, דשבורדים, מגמות"}</li>
              <li style={styles.li}>{isEn ? "Business forecasts — Revenue, Growth, Market Trends" : "תחזיות עסקיות - Revenue, Growth, Market Trends"}</li>
              <li style={styles.li}>{isEn ? "Competitor and market analysis — Competitive Intelligence" : "ניתוח מתחרים ושוק - Competitive Intelligence"}</li>
              <li style={styles.li}>{isEn ? "Scenario Planning — simulations and risk assessment" : "Scenario Planning - סימולציות והערכת סיכונים"}</li>
              <li style={styles.li}>{isEn ? "Fast decision-making — insights from complex data" : "קבלת החלטות מהירות - Insights מנתונים מורכבים"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to analyze reports 10x faster, make data-driven decisions, and identify trends and opportunities early." : "יכולת לנתח דוחות במהירות פי 10, לקבל החלטות מבוססות נתונים ולזהות מגמות והזדמנויות מוקדם"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT Advanced Data Analysis, Claude, Perplexity, Tableau AI, Power BI</span>
            </div>
          </div>

          {/* Module 3 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>3</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Strategic Planning & Leading Digital Transformation" : "תכנון אסטרטגי והובלת טרנספורמציה דיגיטלית"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "7 hours" : "7 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to build an AI-driven organizational strategy and lead change successfully:" : "תלמדו לבנות אסטרטגיה ארגונית מונעת AI ולהוביל שינוי בהצלחה:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Building an AI strategy — vision, goals, and roadmap" : "בניית אסטרטגיית AI - חזון, יעדים ומפת דרכים"}</li>
              <li style={styles.li}>{isEn ? "Identifying automation and efficiency opportunities" : "זיהוי הזדמנויות לאוטומציה ויעילות"}</li>
              <li style={styles.li}>{isEn ? "Evaluating project ROI — prioritizing investments" : "הערכת ROI של פרויקטים - תעדוף השקעות"}</li>
              <li style={styles.li}>{isEn ? "Organizational change management — handling resistance" : "ניהול שינוי ארגוני - התמודדות עם התנגדויות"}</li>
              <li style={styles.li}>{isEn ? "Building a culture of innovation and AI adoption" : "בניית תרבות חדשנות ואימוץ AI"}</li>
              <li style={styles.li}>{isEn ? "Risk management — ethics, security, regulation" : "ניהול סיכונים - אתיקה, אבטחה, רגולציה"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "A detailed strategic plan for AI implementation in the organization, including roadmap, project prioritization, and change management plan." : "תוכנית אסטרטגית מפורטת להטמעת AI בארגון, כולל מפת דרכים, תעדוף פרויקטים ותכנית הובלת שינוי"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, Miro AI, Strategy Tools, Change Management AI</span>
            </div>
          </div>

          {/* Module 4 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>4</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Executive Tools & Automated Reports" : "כלים מנהלים ודוחות אוטומטיים"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "4 hours" : "4 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Practical tools for the daily life of a senior executive — communications, reporting and tracking:" : "כלים מעשיים ליום-יום של מנהל בכיר - תקשורת, דיווחים ומעקב:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Executive communications — writing emails, presentations, reports" : "תקשורת מנהלים - כתיבת מיילים, מצגות, דוחות"}</li>
              <li style={styles.li}>{isEn ? "Preparation for board meetings and external stakeholders" : "הכנה לישיבות דירקטוריון וגורמים חיצוניים"}</li>
              <li style={styles.li}>{isEn ? "Automated reporting — executive dashboards" : "דיווחים אוטומטיים - דשבורדים מנהלים"}</li>
              <li style={styles.li}>{isEn ? "Meeting summaries and Action Items" : "סיכום פגישות ו-Action Items"}</li>
              <li style={styles.li}>{isEn ? "Time management and prioritization — AI for executive productivity" : "ניהול זמן ותעדוף - AI לפרודוקטיביות מנהלים"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "Saving 8–12 hours per week on administrative tasks, leaving more time for strategy and leadership." : "חיסכון של 8-12 שעות בשבוע במשימות מנהליות, יותר זמן לאסטרטגיה והובלה"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, Gamma.app, Notion AI, Fireflies.ai</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "What Will You Know by the End?" : "מה תדעו בסיום ההכשרה?"}</h2>
          <div style={styles.capabilities}>
            <div style={styles.capabilityItem}>✓ {isEn ? "Understand the strategic potential of AI" : "להבין את הפוטנציאל האסטרטגי של AI"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Analyze reports and make decisions faster" : "לנתח דוחות ולקבל החלטות מהר יותר"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Build an organizational AI strategy" : "לבנות אסטרטגיית AI ארגונית"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Lead digital transformation" : "להוביל טרנספורמציה דיגיטלית"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Identify business opportunities with AI" : "לזהות הזדמנויות עסקיות עם AI"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Save time on administrative tasks" : "לחסוך זמן במשימות מנהליות"}</div>
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
                <th style={styles.roiTableTh}>{isEn ? "Metric" : "מדד"}</th>
                <th style={styles.roiTableTh}>{isEn ? "Estimated Improvement" : "שיפור משוער"}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{background: '#f5f5f5'}}>
                <td style={styles.roiTableTd}>{isEn ? "Analysis & decision time" : "זמן ניתוח והחלטות"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "60–80% reduction" : "60-80% הפחתה"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>{isEn ? "Decision quality" : "איכות החלטות"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "40–60% improvement" : "40-60% שיפור"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={styles.roiTableTd}>{isEn ? "Administrative task time" : "זמן משימות מנהליות"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "50–70% savings" : "50-70% חיסכון"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>{isEn ? "Opportunity identification" : "זיהוי הזדמנויות"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "3–5x earlier" : "מוקדם פי 3-5"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}>{isEn ? "AI project ROI" : "ROI פרויקטי AI"}</td>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}><strong>{isEn ? "30–50% improvement" : "30-50% שיפור"}</strong></td>
              </tr>
            </tbody>
          </table>

          <div style={styles.roiCalc}>
            <h3 style={{...styles.h3, marginTop: 0, textAlign: 'center'}}>{isEn ? "ROI Calculation for a Senior Executive" : "חישוב ROI למנהל בכיר"}</h3>
            
            <div style={styles.roiItem}>{isEn ? "Average annual salary: " : "שכר שנתי ממוצע: "}<strong>₪800K–1.5M</strong></div>
            <div style={styles.roiItem}>{isEn ? "Hourly cost: " : "עלות שעה: "}<strong>₪400–750/{isEn ? "hour" : "שעה"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Weekly savings: " : "חיסכון שבועי: "}<strong>8–12 {isEn ? "hours" : "שעות"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Time savings value: " : "ערך חיסכון זמן: "}<strong>₪12K–36K/{isEn ? "month" : "חודש"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Project ROI improvement: " : "שיפור ROI פרויקטים: "}<strong>₪50K–200K/{isEn ? "year" : "שנה"}</strong></div>
            
            <div style={styles.roiHighlight}>{isEn ? "Annual value for a senior executive: ₪200K – ₪600K" : "ערך שנתי למנהל בכיר: ₪200K - ₪600K"}</div>
          </div>

          <div style={styles.bonusSection}>
            <h4 style={styles.bonusH4}>{isEn ? "In addition to time and cost savings:" : "בנוסף לחיסכון בזמן וכסף:"}</h4>
            <ul>
              <li>{isEn ? "Faster and more accurate decisions" : "החלטות מהירות ומדויקות יותר"}</li>
              <li>{isEn ? "Organizational-level competitive advantage" : "יתרון תחרותי ברמת הארגון"}</li>
              <li>{isEn ? "Better team leadership" : "הובלה טובה יותר של הצוות"}</li>
              <li>{isEn ? "Ability to identify opportunities early" : "יכולת לזהות הזדמנויות מוקדם"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Who Is This For?" : "למי זה מתאים?"}</h2>
          <div style={styles.audienceList}>
            <div style={styles.audienceItem}>✓<br/>CEO</div>
            <div style={styles.audienceItem}>✓<br/>CFO</div>
            <div style={styles.audienceItem}>✓<br/>COO</div>
            <div style={styles.audienceItem}>✓<br/>CTO</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "VP Sales & Marketing" : "VP מכירות ושיווק"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Senior Managers" : "מנהלים בכירים"}</div>
          </div>
          <div style={styles.teamSize}>{isEn ? "Recommended team size: 5–15 participants" : "גודל צוות מומלץ: 5-15 משתתפים"}</div>
        </div>
      </section>

      {/* Work Model */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Work Model" : "מודל העבודה"}</h2>
          
          <div style={styles.workDetails}>
            <div style={styles.workDetailItem}>
              <span style={styles.workDetailLabel}>{isEn ? "Duration:" : "משך:"}</span> {isEn ? "4–6 weeks (very flexible)" : "4-6 שבועות (גמיש למאוד)"}
            </div>
            <div style={styles.workDetailItem}>
              <span style={styles.workDetailLabel}>{isEn ? "Format:" : "פורמט:"}</span> {isEn ? "In-person / Hybrid / Online / Schedule-adapted" : "פנים-ארגוני / היברידי / מקוון / מותאם לוח זמנים"}
            </div>
            <div style={{...styles.workDetailItem, borderBottom: 'none'}}>
              <span style={styles.workDetailLabel}>{isEn ? "Support:" : "תמיכה:"}</span> {isEn ? "Ongoing mentoring after training ends" : "ליווי מתמשך גם לאחר סיום ההכשרה"}
            </div>
          </div>

          <div style={styles.deliverablesList}>
            <h4 style={{color: '#003366', marginBottom: '15px', fontSize: '1.2em'}}>{isEn ? "Guaranteed Deliverables:" : "תוצרים מובטחים:"}</h4>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Full organizational AI strategy" : "אסטרטגיית AI ארגונית מלאה"}</li>
              <li style={styles.li}>{isEn ? "AI implementation roadmap" : "מפת דרכים להטמעת AI"}</li>
              <li style={styles.li}>{isEn ? "Tools for report analysis and decisions" : "כלים לניתוח דוחות והחלטות"}</li>
              <li style={styles.li}>{isEn ? "Automated reporting systems" : "מערכות דיווח אוטומטיות"}</li>
              <li style={styles.li}>{isEn ? "Organizational change management plan" : "תוכנית הובלת שינוי ארגוני"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={styles.cta}>
        <div style={styles.container}>
          <h2 style={styles.ctaH2}>{isEn ? "Next Step" : "הצעד הבא"}</h2>
          <p style={styles.ctaP}>
            {isEn ? "We'd love to meet, learn about your organization, and build a strategic AI plan tailored for your senior management." : "נשמח להיפגש, להכיר את הארגון ולבנות תוכנית AI אסטרטגית מותאמת להנהלה הבכירה שלכם."}
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
            {isEn ? "* Tools mentioned may be updated in favor of more suitable and advanced tools that appear on the market, while fully maintaining alignment with training objectives and professional skill development." : "* הכלים המוזכרים בהכשרה עשויים להשתנות לטובת כלים מתאימים ומתקדמים יותר שיופיעו בשוק, תוך שמירה על התאמה מלאה ליעדי ההכשרה והקניית היכולות המקצועיות."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TrainingExecutives;