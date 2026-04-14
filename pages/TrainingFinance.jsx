import React from 'react';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "../components/LanguageContext";

const TrainingFinance = () => {
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
          <h1 style={styles.heroH1}>{isEn ? "AI Training for Finance & Accounting" : "הכשרת AI למחלקת כספים והנהלת חשבונות"}</h1>
          <h2 style={styles.heroH2}>{isEn ? "Professional Training for Finance Professionals in the AI Era" : "הכשרה מקצועית לאנשי כספים בעידן ה-AI"}</h2>
          <p style={styles.heroSubtitle}>{isEn ? "18 hours | Practical training for maximum financial automation and efficiency" : "18 שעות | הכשרה מעשית לאוטומציה ויעילות פיננסית מקסימלית"}</p>
        </div>
      </div>

      {/* Intro */}
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.introText}>
            {isEn
              ? <><strong>Finance departments that want to lead the financial field into the AI era</strong> — cut monthly closing times by 60%, reduce human errors by 80%, and become a strategic partner to management with real-time insights.</>
              : <><strong>מחלקות כספים שרוצות להוביל את התחום הפיננסי לעידן ה-AI</strong> - לקצר זמני סגירה חודשיים ב-60%, להפחית טעויות אנוש ב-80%, ולהפוך לשותף אסטרטגי של ההנהלה עם תובנות בזמן אמת.</>
            }
          </p>
          <p style={styles.introText}>
            {isEn
              ? <>This training is designed for those seeking <strong>immediate automation and measurable results</strong> — AI tools for invoice processing, automatic reporting, advanced financial analysis, and generating business insights. <strong>No prior technical knowledge required.</strong></>
              : <>ההכשרה מיועדת למי שמחפש <strong>אוטומציה מיידית ותוצאות מדידות</strong> - כלי AI לעיבוד חשבוניות, דיווחים אוטומטיים, ניתוח פיננסי מתקדם, והפקת תובנות עסקיות. <strong>אין צורך בידע טכני מוקדם.</strong></>
            }
          </p>
        </div>
      </section>

      {/* Summary Grid */}
      <section style={styles.sectionGray}>
        <div style={styles.container}>
          <div style={styles.summaryGrid}>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>3</div>
              <div style={styles.summaryLabel}>{isEn ? "Modules" : "מודולים"}</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>18</div>
              <div style={styles.summaryLabel}>{isEn ? "Study Hours" : "שעות לימוד"}</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>24/7</div>
              <div style={styles.summaryLabel}>{isEn ? "Support" : "ליווי וסיוע"}</div>
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
              <h3 style={styles.moduleTitle}>{isEn ? "Automating Financial Processes" : "אוטומציה של תהליכים פיננסיים"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "8 hours" : "8 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to automate manual processes — from invoice processing to monthly closings:" : "תלמדו להפוך תהליכים ידניים לאוטומטיים - מעיבוד חשבוניות ועד סגירות חודשיות:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Automatic invoice processing — scanning and system entry" : "עיבוד חשבוניות אוטומטי - סריקה וקליטה למערכת"}</li>
              <li style={styles.li}>{isEn ? "Automatic bank reconciliations and anomaly detection" : "התאמות בנק אוטומטיות וזיהוי חריגות"}</li>
              <li style={styles.li}>{isEn ? "Automating monthly and quarterly reports" : "אוטומציה של דיווחים חודשיים ורבעוניים"}</li>
              <li style={styles.li}>{isEn ? "Cash flow management and Cash Flow forecasting" : "ניהול תזרים מזומנים וחיזוי Cash Flow"}</li>
              <li style={styles.li}>{isEn ? "Identifying and flagging suspicious or anomalous expenses" : "זיהוי וסימון הוצאות חשודות וחריגות"}</li>
              <li style={styles.li}>{isEn ? "Automatically generating management reports" : "יצירת דוחות ניהוליים אוטומטיים"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "Automations that cut monthly closing time by 50–70%, with 95%+ accuracy." : "אוטומציות שמקצרות את זמן הסגירה החודשית ב-50-70%, עם דיוק של 95%+"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, n8n*, Zapier, QuickBooks AI, Xero AI</span>
            </div>
          </div>

          {/* Module 2 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>2</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Advanced Financial Analysis with AI" : "ניתוח פיננסי מתקדם עם AI"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "6 hours" : "6 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to work with financial data professionally — analysis, forecasts, and business insights:" : "תלמדו לעבוד עם נתונים פיננסיים בצורה מקצועית - ניתוח, תחזיות ותובנות עסקיות:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Financial report analysis and generating insights" : "ניתוח דוחות כספיים והפקת תובנות"}</li>
              <li style={styles.li}>{isEn ? "Smart financial forecasts — revenues, expenses, profitability" : "תחזיות פיננסיות חכמות - הכנסות, הוצאות, רווחיות"}</li>
              <li style={styles.li}>{isEn ? "Cash flow analysis and financing planning" : "ניתוח תזרים מזומנים ותכנון מימון"}</li>
              <li style={styles.li}>{isEn ? "Identifying trends and savings opportunities" : "זיהוי מגמות והזדמנויות לחיסכון"}</li>
              <li style={styles.li}>{isEn ? "Building interactive financial dashboards" : "בניית דשבורדים פיננסיים אינטראקטיביים"}</li>
              <li style={styles.li}>{isEn ? "Comparative analysis — industry benchmarking" : "ניתוח השוואתי - Benchmarking מול תעשייה"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to provide data-driven business insights, accurate forecasts, and high-level management reporting." : "יכולת לספק תובנות עסקיות מבוססות נתונים, תחזיות מדויקות ודיווח מנהלים ברמה גבוהה"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT Advanced Data Analysis, Claude, Excel AI, Power BI AI, Tableau AI</span>
            </div>
          </div>

          {/* Module 3 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>3</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Autonomous AI Financial Agents" : "סוכני AI פיננסיים אוטונומיים"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "4 hours" : "4 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Build dedicated AI agents that work for you 24/7 — from data processing to real-time alerts:" : "תבנו סוכני AI ייעודיים שיעבדו עבורכם 24/7 - מעיבוד נתונים ועד התראות בזמן אמת:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Invoice processing agent — automatic intake and classification" : "סוכן עיבוד חשבוניות - קליטה וסיווג אוטומטי"}</li>
              <li style={styles.li}>{isEn ? "Reporting agent — automatically generates periodic reports" : "סוכן דיווח - יוצר דוחות תקופתיים אוטומטית"}</li>
              <li style={styles.li}>{isEn ? "Alert agent — warns of anomalies and problems" : "סוכן התראות - מתריע על חריגות ובעיות"}</li>
              <li style={styles.li}>{isEn ? "Forecasting agent — produces updated forecasts" : "סוכן תחזיות - מפיק תחזיות מעודכנות"}</li>
              <li style={styles.li}>{isEn ? "Customization and deployment of department-specific agents" : "התאמה והטמעה של סוכנים ייעודיים למחלקה"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "3–4 AI financial agents working for you, fully owned — saving 15–20 hours per week." : "3-4 סוכני AI פיננסיים שעובדים עבורכם בבעלות מלאה - חיסכון של 15-20 שעות בשבוע"}</span>
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
          <h2 style={styles.h2}>{isEn ? "What Will the Team Learn?" : "מה הצוות ילמד?"}</h2>
          <div style={styles.capabilities}>
            <div style={styles.capabilityItem}>✓ {isEn ? "Process invoices automatically, cutting processing time by 80%" : "לעבד חשבוניות אוטומטית ולקצר זמן עיבוד ב-80%"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Close months in half the time with higher accuracy" : "לסגור חודשים במחצית הזמן עם דיוק גבוה יותר"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Analyze financial data and generate business insights" : "לנתח נתונים פיננסיים ולהפיק תובנות עסקיות"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Build accurate financial forecasts" : "לבנות תחזיות פיננסיות מדויקות"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Automatically generate professional management reports" : "לייצר דוחות ניהוליים מקצועיים אוטומטית"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Work with AI agents managing routine processes" : "לעבוד עם סוכני AI שמנהלים תהליכים רוטיניים"}</div>
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
                <th style={styles.roiTableTh}>{isEn ? "Estimated Improvement" : "שיפור משוער"}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{background: '#f5f5f5'}}>
                <td style={styles.roiTableTd}>{isEn ? "Invoice processing time" : "זמן עיבוד חשבוניות"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "70–85% reduction" : "70-85% הפחתה"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>{isEn ? "Monthly closing time" : "זמן סגירה חודשית"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "50–70% reduction" : "50-70% הפחתה"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={styles.roiTableTd}>{isEn ? "Human errors" : "טעויות אנוש"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "80–90% reduction" : "80-90% הפחתה"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>{isEn ? "Report preparation time" : "זמן הכנת דוחות"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "60–80% reduction" : "60-80% הפחתה"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}>{isEn ? "Quality of business insights" : "איכות תובנות עסקיות"}</td>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}><strong>{isEn ? "40–60% improvement" : "40-60% שיפור"}</strong></td>
              </tr>
            </tbody>
          </table>

          <div style={styles.roiCalc}>
            <h3 style={{...styles.h3, marginTop: 0, textAlign: 'center'}}>{isEn ? "ROI Calculation for a 4-Person Finance Department" : "חישוב ROI למחלקת כספים של 4 אנשים"}</h3>
            
            <div style={styles.roiItem}>{isEn ? "Average monthly salary per employee: " : "שכר חודשי ממוצע לעובד/ת: "}<strong>₪10,000–12,000</strong></div>
            <div style={styles.roiItem}>{isEn ? "Monthly team cost (4 employees): " : "עלות צוות חודשית (4 עובדים): "}<strong>₪40,000–48,000</strong></div>
            <div style={styles.roiItem}>{isEn ? "Work time savings: " : "חיסכון בזמן עבודה: "}<strong>50–70 {isEn ? "hours/month for the team" : "שעות/חודש לצוות"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Monthly time savings value: " : "ערך חיסכון חודשי בזמן: "}<strong>₪3,000–4,500</strong></div>
            <div style={styles.roiItem}>{isEn ? "Error and correction reduction: " : "הפחתת טעויות ותיקונים: "}<strong>₪2,000–4,000/{isEn ? "month" : "חודש"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Savings from automation and efficiency: " : "חיסכון מאוטומציה ויעילות: "}<strong>₪8,000–12,000/{isEn ? "month" : "חודש"}</strong></div>
            
            <div style={styles.roiHighlight}>{isEn ? "Annual savings: ₪156K – ₪246K" : "חיסכון שנתי: ₪156K - ₪246K"}</div>
          </div>

          <div style={styles.bonusSection}>
            <h4 style={styles.bonusH4}>{isEn ? "In addition to the financial savings:" : "בנוסף לחיסכון הכספי:"}</h4>
            <ul>
              <li>{isEn ? "AI financial agents that stay in the company permanently" : "סוכני AI פיננסיים שנשארים בחברה לצמיתות"}</li>
              <li>{isEn ? "Significant improvement in reporting quality and insights" : "שיפור ניכר באיכות הדיווח והתובנות"}</li>
              <li>{isEn ? "Ability to provide strategic support to management" : "יכולת לספק תמיכה אסטרטגית למנהלים"}</li>
              <li>{isEn ? "Dramatic reduction in errors and inaccuracies" : "הפחתה דרמטית בטעויות ואי דיוקים"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Who Is This For?" : "למי זה מתאים?"}</h2>
          <div style={styles.audienceList}>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Finance Managers (CFO)" : "מנהלי כספים (CFO)"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Accountants" : "רואי חשבון"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Payroll Accountants" : "חשבי שכר"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Bookkeeping Managers" : "מנהלי הנהלת חשבונות"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Budget Controllers" : "בקרי תקציב"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Financial Analysts" : "אנליסטים פיננסיים"}</div>
          </div>
          <div style={styles.teamSize}>{isEn ? "Recommended team size: 3–10 participants" : "גודל צוות מומלץ: 3-10 משתתפים"}</div>
        </div>
      </section>

      {/* Work Model */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Work Model" : "מודל העבודה"}</h2>
          
          <div style={styles.workDetails}>
            <div style={styles.workDetailItem}>
              <span style={styles.workDetailLabel}>{isEn ? "Duration:" : "משך:"}</span> {isEn ? "4–6 weeks (tailored to needs)" : "4-6 שבועות (מותאם לצרכים)"}
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
              <li style={styles.li}>{isEn ? "3–4 active AI financial agents" : "3-4 סוכני AI פיננסיים פועלים"}</li>
              <li style={styles.li}>{isEn ? "Automations for invoice processing and reporting" : "אוטומציות לעיבוד חשבוניות ודיווחים"}</li>
              <li style={styles.li}>{isEn ? "Interactive financial dashboards" : "דשבורדים פיננסיים אינטראקטיביים"}</li>
              <li style={styles.li}>{isEn ? "Template library for analyses and forecasts" : "ספריית תבניות לניתוחים ותחזיות"}</li>
              <li style={styles.li}>{isEn ? "Measurable improvement in work times and accuracy" : "שיפור מדיד בזמני עבודה ודיוק"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={styles.cta}>
        <div style={styles.container}>
          <h2 style={styles.ctaH2}>{isEn ? "Next Step" : "הצעד הבא"}</h2>
          <p style={styles.ctaP}>
            {isEn ? "We'd love to learn about your financial processes and build a personalized AI plan for your finance department." : "נשמח להכיר את התהליכים הפיננסיים שלכם ולבנות תוכנית AI מותאמת אישית למחלקת הכספים."}
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

export default TrainingFinance;