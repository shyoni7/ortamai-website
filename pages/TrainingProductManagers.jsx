import React from 'react';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "../components/LanguageContext";

const TrainingProductManagers = () => {
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

  return (
    <div style={styles.body}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroH1}>{isEn ? "AI Training for Product & Project Managers" : "הכשרת AI למנהלי מוצר ומנהלי פרויקטים"}</h1>
          <h2 style={styles.heroH2}>{isEn ? "Professional Training for Product & Project Management in the AI Era" : "הכשרה מקצועית לניהול מוצר ופרויקטים בעידן ה-AI"}</h2>
          <p style={styles.heroSubtitle}>{isEn ? "40 hours | Practical training for managers who want to lead in the AI era" : "40 שעות | הכשרה מעשית למנהלים שרוצים להוביל בעידן ה-AI"}</p>
        </div>
      </div>

      {/* Intro */}
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.introText}>
            <strong>מנהלי מוצר ופרויקטים שרוצים להוביל מוצרים ופרויקטים בעידן ה-AI</strong> - לקצר זמני פיתוח ב-40%, לשפר איכות מסירות ב-50%, ולהפוך למנהלים האפקטיביים ביותר בארגון.
          </p>
          <p style={styles.introText}>
            ההכשרה מיועדת למי שרוצה <strong>יכולות AI מעשיות ליומיום</strong> - כלי AI לתכנון, תעדוף, ניהול סיכונים, תקשורת עם צוותים ובעלי עניין, ואוטומציה של משימות חוזרות. <strong>אין צורך בידע טכני מוקדם.</strong>
          </p>
        </div>
      </section>

      {/* Summary Grid */}
      <section style={styles.sectionGray}>
        <div style={styles.container}>
          <div style={styles.summaryGrid}>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>5</div>
              <div style={styles.summaryLabel}>מודולים</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>40</div>
              <div style={styles.summaryLabel}>שעות לימוד</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>24/7</div>
              <div style={styles.summaryLabel}>ליווי וסיוע</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>100%</div>
              <div style={styles.summaryLabel}>מעשי ויישומי</div>
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
              <h3 style={styles.moduleTitle}>{isEn ? "AI for Product Management & Planning" : "AI לניהול ותכנון מוצר"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "8 hours" : "8 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to use AI for product planning and strategy — from market analysis to building a Roadmap:" : "תלמדו להשתמש ב-AI לתכנון ואסטרטגיה של מוצר - מניתוח שוק ועד בניית Roadmap:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Advanced competitor analysis and market research with AI" : "ניתוח מתחרים ומחקר שוק מתקדם עם AI"}</li>
              <li style={styles.li}>{isEn ? "Identifying opportunities and insights from user data" : "זיהוי הזדמנויות ותובנות מנתוני משתמשים"}</li>
              <li style={styles.li}>{isEn ? "Building a smart, data-driven Product Roadmap" : "בניית Product Roadmap חכם ומבוסס נתונים"}</li>
              <li style={styles.li}>{isEn ? "Feature prioritization by business value and resources" : "תעדוף פיצ'רים לפי ערך עסקי ומשאבים"}</li>
              <li style={styles.li}>{isEn ? "Writing detailed PRDs in 80% less time" : "כתיבת PRD מפורטים ב-80% פחות זמן"}</li>
              <li style={styles.li}>{isEn ? "Quick simulations and A/B tests" : "סימולציות ובדיקות A/B מהירות"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to build a data-driven product strategy quickly, with smart feature prioritization." : "היכולת לבנות אסטרטגיית מוצר מבוססת נתונים תוך זמן קצר, עם תעדוף חכם של פיצ'רים"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, Perplexity, Notion AI, Productboard AI</span>
            </div>
          </div>

          {/* Module 2 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>2</div>
              <h3 style={styles.moduleTitle}>{isEn ? "AI for Project Management & Processes" : "AI לניהול פרויקטים ותהליכים"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "8 hours" : "8 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to manage projects efficiently with AI — planning, tracking, risk management, and reporting:" : "תלמדו לנהל פרויקטים בצורה יעילה עם AI - תכנון, מעקב, ניהול סיכונים ודיווח:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Project planning and accurate time estimation" : "תכנון פרויקטים והערכת זמנים מדויקת"}</li>
              <li style={styles.li}>{isEn ? "Proactive risk identification and management" : "זיהוי וניהול סיכונים באופן יזום"}</li>
              <li style={styles.li}>{isEn ? "Progress tracking and early blocker identification" : "מעקב אחר התקדמות וזיהוי חסימות מוקדם"}</li>
              <li style={styles.li}>{isEn ? "Automating status reports and presentations" : "אוטומציה של דיווחי סטטוס ומצגות"}</li>
              <li style={styles.li}>{isEn ? "Smart resource management and optimization" : "ניהול משאבים חכם ואופטימיזציה"}</li>
              <li style={styles.li}>{isEn ? "Building quick Contingency plans" : "בניית תוכניות Contingency מהירות"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to manage complex projects 2x more efficiently, with early problem detection and reporting time savings." : "יכולת לנהל פרויקטים מורכבים בצורה יעילה פי 2, עם זיהוי מוקדם של בעיות וחיסכון בזמן דיווח"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Notion AI, ClickUp AI, Monday.com AI, Asana Intelligence</span>
            </div>
          </div>

          {/* Module 3 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>3</div>
              <h3 style={styles.moduleTitle}>{isEn ? "AI for Stakeholder Communication" : "AI לתקשורת עם צוותים ובעלי עניין"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "6 hours" : "6 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to communicate efficiently with all stakeholders — development teams, management, customers, and partners:" : "תלמדו לתקשר ביעילות עם כל בעלי העניין - צוותי פיתוח, הנהלה, לקוחות ושותפים:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Writing focused and professional emails and updates" : "כתיבת אימיילים ועדכונים ממוקדים ומקצועיים"}</li>
              <li style={styles.li}>{isEn ? "Preparing executive presentations and performance reports" : "הכנת מצגות מנהלים ודוחות ביצועים"}</li>
              <li style={styles.li}>{isEn ? "Technical-business communication between teams" : "תקשורת טכנית-עסקית בין צוותים"}</li>
              <li style={styles.li}>{isEn ? "Smart expectation management and negotiation" : "ניהול ציפיות ומשא ומתן חכם"}</li>
              <li style={styles.li}>{isEn ? "Automatic meeting summaries and decision logs" : "סיכומי פגישות והחלטות אוטומטיים"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "Clear and efficient communication with all stakeholders, saving 60–80% of routine communication time." : "תקשורת ברורה ויעילה עם כל בעלי העניין, חיסכון של 60-80% מזמן התקשורת השגרתית"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, Grammarly AI, Otter.ai, Fireflies.ai</span>
            </div>
          </div>

          {/* Module 4 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>4</div>
              <h3 style={styles.moduleTitle}>{isEn ? "AI for Data Analysis & Decision Making" : "AI לניתוח נתונים וקבלת החלטות"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "8 hours" : "8 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to work with data professionally — analysis, visualization, and informed decision-making:" : "תלמדו לעבוד עם נתונים בצורה מקצועית - ניתוח, ויזואליזציה וקבלת החלטות מושכלות:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Analyzing product metrics — Retention, Churn, Growth" : "ניתוח מטריקות מוצר - Retention, Churn, Growth"}</li>
              <li style={styles.li}>{isEn ? "Creating dashboards and visual reports" : "יצירת דשבורדים ודוחות ויזואליים"}</li>
              <li style={styles.li}>{isEn ? "Identifying trends and insights from raw data" : "זיהוי מגמות ותובנות מנתונים גולמיים"}</li>
              <li style={styles.li}>{isEn ? "Building AI-based business forecasts" : "בניית תחזיות עסקיות מבוססות AI"}</li>
              <li style={styles.li}>{isEn ? "Data-driven decisions, not intuition" : "קבלת החלטות מבוססת נתונים ולא אינטואיציה"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to work with complex data, extract insights, and make informed AI-based decisions." : "יכולת לעבוד עם נתונים מורכבים, להפיק תובנות ולקבל החלטות מושכלות מבוססות AI"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT Advanced Data Analysis, Claude, Mixpanel AI, Amplitude AI</span>
            </div>
          </div>

          {/* Module 5 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>5</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Personal AI Agents for Daily Management" : "סוכני AI אישיים לניהול יומיומי"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "10 hours" : "10 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Build personal AI agents that help you in daily management and save you hours per week:" : "תבנו סוכני AI אישיים שיעזרו לכם בניהול היומיומי ויחסכו לכם שעות בשבוע:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Project tracking agent — monitors and identifies issues early" : "סוכן מעקב פרויקטים - עוקב ומזהה בעיות מוקדם"}</li>
              <li style={styles.li}>{isEn ? "Planning agent — assists with planning and timelines" : "סוכן תכנון - מסייע בתכנון וזמנים"}</li>
              <li style={styles.li}>{isEn ? "Communication agent — prepares summaries and reports" : "סוכן תקשורת - מכין סיכומים ודיווחים"}</li>
              <li style={styles.li}>{isEn ? "Analytics agent — analyzes data and generates insights" : "סוכן ניתוח - מנתח נתונים ומפיק תובנות"}</li>
              <li style={styles.li}>{isEn ? "Customization and deployment of dedicated agents" : "התאמה והטמעה של סוכנים ייעודיים"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "3–4 personal AI agents working for you 24/7 — saving 10–15 hours per week." : "3-4 סוכני AI אישיים שעובדים עבורכם 24/7 - חיסכון של 10-15 שעות בשבוע"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> GPTs, Claude Projects, n8n* AI Agents, Zapier AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "What Will You Know by the End?" : "מה תדעו בסיום ההכשרה?"}</h2>
          <div style={styles.capabilities}>
            <div style={styles.capabilityItem}>✓ {isEn ? "Plan and manage products and projects 2x more efficiently" : "לתכנן ולנהל מוצרים ופרויקטים בצורה יעילה פי 2"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Cut planning and reporting time by 60–80%" : "לקצר זמני תכנון ודיווח ב-60-80%"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Analyze data and make AI-based decisions" : "לנתח נתונים ולקבל החלטות מבוססות AI"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Communicate efficiently with all stakeholders" : "לתקשר ביעילות עם כל בעלי העניין"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Identify risks and issues before they happen" : "לזהות סיכונים ובעיות לפני שהם מתרחשים"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Work with AI agents managing recurring tasks" : "לעבוד עם סוכני AI שמנהלים משימות חוזרות"}</div>
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
                <td style={styles.roiTableTd}>{isEn ? "Planning and prioritization time" : "זמן תכנון ותיעדוף"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "50–70% reduction" : "50-70% הפחתה"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>{isEn ? "Reporting and communication time" : "זמן דיווח ותקשורת"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "60–80% reduction" : "60-80% הפחתה"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={styles.roiTableTd}>{isEn ? "On-time deliveries" : "מסירות בזמן"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "40–60% improvement" : "40-60% שיפור"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>{isEn ? "Early risk identification" : "זיהוי סיכונים מוקדם"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "50–70% improvement" : "50-70% שיפור"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}>{isEn ? "Team satisfaction" : "שביעות רצון צוותים"}</td>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}><strong>{isEn ? "30–50% increase" : "30-50% עלייה"}</strong></td>
              </tr>
            </tbody>
          </table>

          <div style={styles.roiCalc}>
            <h3 style={{...styles.h3, marginTop: 0, textAlign: 'center'}}>{isEn ? "ROI Calculation for One Product/Project Manager" : "חישוב ROI למנהל מוצר/פרויקט אחד"}</h3>
            
            <div style={styles.roiItem}>{isEn ? "Average monthly salary: " : "שכר חודשי ממוצע: "}<strong>₪20,000</strong></div>
            <div style={styles.roiItem}>{isEn ? "Hourly cost (₪120–150/hour): " : "עלות שעתית (₪120-150/שעה): "}<strong>₪135/{isEn ? "hour average" : "שעה ממוצע"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Weekly work time savings: " : "חיסכון שבועי בזמן עבודה: "}<strong>10–15 {isEn ? "hours" : "שעות"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Monthly time savings: " : "חיסכון חודשי בזמן: "}<strong>40–60 {isEn ? "hours" : "שעות"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Monthly savings value: " : "ערך חיסכון חודשי: "}<strong>₪5,400–8,100</strong></div>
            
            <div style={styles.roiHighlight}>{isEn ? "Annual value per manager: ₪65K – ₪97K" : "ערך שנתי למנהל: ₪65K - ₪97K"}</div>
          </div>

          <div style={styles.bonusSection}>
            <h4 style={styles.bonusH4}>{isEn ? "In addition to the financial savings:" : "בנוסף לחיסכון הכספי:"}</h4>
            <ul>
              <li>{isEn ? "Personal AI agents that stay with you permanently" : "סוכני AI אישיים שנשארים איתכם לצמיתות"}</li>
              <li>{isEn ? "Template library and dedicated tools" : "ספריית תבניות וכלים ייעודיים"}</li>
              <li>{isEn ? "Ability to manage 2x more projects simultaneously" : "יכולת לנהל פי 2 יותר פרויקטים בו-זמנית"}</li>
              <li>{isEn ? "Fast, data-driven decision-making" : "קבלת החלטות מהירה ומבוססת נתונים"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Who Is This For?" : "למי זה מתאים?"}</h2>
          <div style={styles.audienceList}>
            <div style={styles.audienceItem}>✓<br/>Product Managers</div>
            <div style={styles.audienceItem}>✓<br/>Project Managers</div>
            <div style={styles.audienceItem}>✓<br/>Product Owners</div>
            <div style={styles.audienceItem}>✓<br/>Program Managers</div>
            <div style={styles.audienceItem}>✓<br/>Scrum Masters</div>
            <div style={styles.audienceItem}>✓<br/>Team Leads</div>
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
              <span style={styles.workDetailLabel}>{isEn ? "Duration:" : "משך:"}</span> {isEn ? "6–10 weeks (tailored to needs)" : "6-10 שבועות (מותאם לצרכים)"}
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
              <li style={styles.li}>{isEn ? "3–4 active personal AI agents" : "3-4 סוכני AI אישיים פועלים"}</li>
              <li style={styles.li}>{isEn ? "Template library for product and project management" : "ספריית תבניות לניהול מוצר ופרויקטים"}</li>
              <li style={styles.li}>{isEn ? "Automation systems for reporting and tracking" : "מערכות אוטומציה לדיווח ומעקב"}</li>
              <li style={styles.li}>{isEn ? "AI-based analytical tools" : "כלים אנליטיים מבוססי AI"}</li>
              <li style={styles.li}>{isEn ? "Measurable improvement in efficiency and performance" : "שיפור מדיד ביעילות וביצועים"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={styles.cta}>
        <div style={styles.container}>
          <h2 style={styles.ctaH2}>{isEn ? "Next Step" : "הצעד הבא"}</h2>
          <p style={styles.ctaP}>
            {isEn ? "We'd love to learn about your management needs and build a personalized AI plan for your organization's product and project managers." : "נשמח להכיר את צרכי הניהול שלכם ולבנות תוכנית AI מותאמת אישית למנהלי המוצר והפרויקטים בארגון."}
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

export default TrainingProductManagers;