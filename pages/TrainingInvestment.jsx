import React from 'react';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "../components/LanguageContext";

const TrainingInvestment = () => {
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
          <h1 style={styles.heroH1}>{isEn ? "AI Training for Investment Advisors & Bankers" : "הכשרת AI ליועצי השקעות ובנקאים"}</h1>
          <h2 style={styles.heroH2}>{isEn ? "Professional Training for Finance & Investment Professionals in the AI Era" : "הכשרה מקצועית לאנשי פיננסים והשקעות בעידן ה-AI"}</h2>
          <p style={styles.heroSubtitle}>{isEn ? "24 hours | Practical training for smart investment analysis and advanced portfolio management" : "24 שעות | הכשרה מעשית לניתוח השקעות חכם וניהול תיקים מתקדם"}</p>
        </div>
      </div>

      {/* Intro */}
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.introText}>
            {isEn
              ? <><strong>Investment advisors and bankers who want to lead the financial field into the AI era</strong> — analyze markets 10x faster, manage investment portfolios optimally, and deliver a new level of service to clients with AI-based recommendations.</>
              : <><strong>יועצי השקעות ובנקאים שרוצים להוביל את התחום הפיננסי לעידן ה-AI</strong> - לנתח שווקים במהירות פי 10, לנהל תיקי השקעות בצורה אופטימלית, ולהעניק ללקוחות שירות ברמה חדשה עם המלצות מבוססות AI.</>
            }
          </p>
          <p style={styles.introText}>
            {isEn
              ? <>This training is designed for those seeking a <strong>real competitive advantage</strong> — AI tools for advanced market analysis, smart risk management, automated reporting, and personalized investment recommendations. <strong>No prior technical knowledge required.</strong></>
              : <>ההכשרה מיועדת למי שמחפש <strong>יתרון תחרותי אמיתי</strong> - כלי AI לניתוח שוק מתקדם, ניהול סיכונים חכם, אוטומציה של דיווחים, והמלצות השקעה מותאמות אישית. <strong>אין צורך בידע טכני מוקדם.</strong></>
            }
          </p>
        </div>
      </section>

      {/* Summary Grid */}
      <section style={styles.sectionGray}>
        <div style={styles.container}>
          <div style={styles.summaryGrid}>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>4</div>
              <div style={styles.summaryLabel}>{isEn ? "Modules" : "מודולים"}</div>
            </div>
            <div style={styles.summaryItem}>
              <div style={styles.summaryNumber}>24</div>
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
              <h3 style={styles.moduleTitle}>{isEn ? "Advanced Market & Investment Analysis with AI" : "ניתוח שוק והשקעות מתקדם עם AI"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "8 hours" : "8 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to analyze markets and stocks professionally and quickly — technical, fundamental analysis, and forecasts:" : "תלמדו לנתח שווקים ומניות בצורה מקצועית ומהירה - ניתוח טכני, פונדמנטלי ותחזיות:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Advanced technical analysis — pattern recognition, indicators, entry/exit points" : "ניתוח טכני מתקדם - זיהוי דפוסים, אינדיקטורים ונקודות כניסה/יציאה"}</li>
              <li style={styles.li}>{isEn ? "Fundamental analysis — financial reports, multiples, fair value" : "ניתוח פונדמנטלי - דוחות כספיים, מכפילים ושווי הוגן"}</li>
              <li style={styles.li}>{isEn ? "Market sentiment analysis — news, social media, and trends" : "ניתוח סנטימנט שוק - חדשות, מדיה חברתית ומגמות"}</li>
              <li style={styles.li}>{isEn ? "Price forecasts and investment opportunity identification" : "תחזיות מחירים וזיהוי הזדמנויות השקעה"}</li>
              <li style={styles.li}>{isEn ? "Macroeconomic analysis — interest rates, inflation, monetary policy" : "ניתוח מאקרו כלכלי - ריבית, אינפלציה, מדיניות מוניטרית"}</li>
              <li style={styles.li}>{isEn ? "Smart stock and sector comparison — Screening" : "השוואת מניות ומגזרים - Screening חכם"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to analyze markets and stocks 10x faster, with deep insights and data-driven recommendations." : "יכולת לנתח שווקים ומניות פי 10 מהר יותר, עם תובנות מעמיקות והמלצות מבוססות נתונים"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, Perplexity, Bloomberg GPT, FinBERT</span>
            </div>
          </div>

          {/* Module 2 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>2</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Smart Portfolio Management" : "ניהול תיקי השקעות חכם"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "6 hours" : "6 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to manage investment portfolios optimally — balancing, risk management, and performance:" : "תלמדו לנהל תיקי השקעות בצורה אופטימלית - איזון, ניהול סיכונים וביצועים:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Portfolio optimization — Modern Portfolio Theory" : "אופטימיזציה של תיקי השקעות - Modern Portfolio Theory"}</li>
              <li style={styles.li}>{isEn ? "Advanced risk management — VaR, Stress Testing, Diversification" : "ניהול סיכונים מתקדם - VaR, Stress Testing, Diversification"}</li>
              <li style={styles.li}>{isEn ? "Automatic rebalancing and allocation adjustment" : "Rebalancing אוטומטי והתאמת אלוקציות"}</li>
              <li style={styles.li}>{isEn ? "Performance analysis — Alpha, Beta, Sharpe Ratio" : "ניתוח ביצועים - Alpha, Beta, Sharpe Ratio"}</li>
              <li style={styles.li}>{isEn ? "Smart asset selection — stocks, bonds, crypto, commodities" : "בחירת נכסים חכמה - מניות, אג\"ח, קריפטו, סחורות"}</li>
              <li style={styles.li}>{isEn ? "Adapting portfolios to client risk profiles" : "התאמת תיקים לפרופיל סיכון לקוח"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to build and manage optimal investment portfolios with advanced risk management and better results." : "יכולת לבנות ולנהל תיקי השקעות אופטימליים עם ניהול סיכונים מתקדם ותוצאות טובות יותר"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT Advanced Data Analysis, Claude, Portfolio Optimizer AI</span>
            </div>
          </div>

          {/* Module 3 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>3</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Customer Service & Personalized Recommendations" : "שירות לקוחות והמלצות אישיות"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "6 hours" : "6 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to provide excellent customer service with personalized real-time recommendations:" : "תלמדו לספק שירות לקוחות מעולה עם המלצות מותאמות אישית בזמן אמת:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Building a client profile — risk tolerance, goals, time horizon" : "בניית פרופיל לקוח - סובלנות סיכון, יעדים, אופק זמן"}</li>
              <li style={styles.li}>{isEn ? "Personalized investment recommendations" : "המלצות השקעה מותאמות אישית"}</li>
              <li style={styles.li}>{isEn ? "Financial chatbots — fast responses and 24/7 service" : "צ'אטבוטים פיננסיים - מענה מהיר ושירות 24/7"}</li>
              <li style={styles.li}>{isEn ? "Automatic reports and client updates" : "דוחות ועדכונים אוטומטיים ללקוחות"}</li>
              <li style={styles.li}>{isEn ? "Expectation management and effective communication" : "ניהול ציפיות ותקשורת יעילה"}</li>
              <li style={styles.li}>{isEn ? "Educational content — financial education for clients" : "Educational Content - חינוך פיננסי ללקוחות"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "The ability to provide excellent customer service with accurate, personalized recommendations, and manage 2x more clients." : "יכולת לספק שירות לקוחות מעולה עם המלצות מדויקות ומותאמות, ולנהל פי 2 יותר לקוחות"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, Customer Service AI Bots, Robo-Advisors</span>
            </div>
          </div>

          {/* Module 4 */}
          <div style={styles.processStep}>
            <div style={styles.moduleHeader}>
              <div style={styles.moduleNumber}>4</div>
              <h3 style={styles.moduleTitle}>{isEn ? "Financial Automations & Reporting" : "אוטומציות ודיווחים פיננסיים"}</h3>
              <div style={styles.moduleDuration}>{isEn ? "4 hours" : "4 שעות"}</div>
            </div>
            <p style={styles.moduleDescription}>
              {isEn ? "Learn to automate manual processes — reporting, tracking, and control:" : "תלמדו להפוך תהליכים ידניים לאוטומטיים - דיווחים, מעקב ובקרה:"}
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>{isEn ? "Automatic performance reports to clients" : "דיווחי ביצועים אוטומטיים ללקוחות"}</li>
              <li style={styles.li}>{isEn ? "Automatic tracking of portfolio changes" : "מעקב אוטומטי אחר שינויים בתיקים"}</li>
              <li style={styles.li}>{isEn ? "Smart alerts — opportunities, risks, events" : "התראות חכמות - הזדמנויות, סיכונים, אירועים"}</li>
              <li style={styles.li}>{isEn ? "Automating compliance and regulation" : "אוטומציה של Compliance ורגולציה"}</li>
              <li style={styles.li}>{isEn ? "Creating presentations and management reports" : "יצירת מצגות ודוחות מנהלים"}</li>
            </ul>
            <div style={styles.deliverable}>
              <strong>{isEn ? "What you'll get by the end:" : "מה תקבלו בסוף:"}</strong>
              <span> {isEn ? "Automated processes saving 10–15 hours per week and improving service quality." : "תהליכים אוטומטיים שחוסכים 10-15 שעות בשבוע ומשפרים את איכות השירות"}</span>
            </div>
            <div style={styles.toolsBox}>
              <span style={styles.toolsLabel}>{isEn ? "Example tools:" : "דוגמאות לכלים:"}</span>
              <span style={styles.toolsList}> ChatGPT, Claude, n8n*, Zapier, Tableau AI, Power BI AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "What Will You Know by the End?" : "מה תדעו בסיום ההכשרה?"}</h2>
          <div style={styles.capabilities}>
            <div style={styles.capabilityItem}>✓ {isEn ? "Analyze markets and stocks 10x faster" : "לנתח שווקים ומניות במהירות פי 10"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Build optimal investment portfolios" : "לבנות תיקי השקעות אופטימליים"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Provide personalized investment recommendations" : "לספק המלצות השקעה מותאמות אישית"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Manage risks professionally" : "לנהל סיכונים בצורה מקצועית"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Serve 2x more clients in the same time" : "לשרת פי 2 יותר לקוחות באותו זמן"}</div>
            <div style={styles.capabilityItem}>✓ {isEn ? "Automate manual processes" : "להפוך תהליכים ידניים לאוטומטיים"}</div>
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
                <td style={styles.roiTableTd}>{isEn ? "Analysis and recommendation time" : "זמן ניתוח והמלצות"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "70–85% reduction" : "70-85% הפחתה"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>{isEn ? "Number of active clients" : "מספר לקוחות פעילים"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "50–100% increase" : "50-100% עלייה"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={styles.roiTableTd}>{isEn ? "Reporting and communication time" : "זמן דיווח ותקשורת"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "60–80% reduction" : "60-80% הפחתה"}</strong></td>
              </tr>
              <tr>
                <td style={styles.roiTableTd}>{isEn ? "Recommendation quality" : "איכות המלצות"}</td>
                <td style={styles.roiTableTd}><strong>{isEn ? "30–50% improvement" : "30-50% שיפור"}</strong></td>
              </tr>
              <tr style={{background: '#f5f5f5'}}>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}>{isEn ? "Client satisfaction" : "שביעות רצון לקוחות"}</td>
                <td style={{...styles.roiTableTd, borderBottom: 'none'}}><strong>{isEn ? "40–60% increase" : "40-60% עלייה"}</strong></td>
              </tr>
            </tbody>
          </table>

          <div style={styles.roiCalc}>
            <h3 style={{...styles.h3, marginTop: 0, textAlign: 'center'}}>{isEn ? "ROI Calculation for One Investment Advisor" : "חישוב ROI ליועץ השקעות אחד"}</h3>
            
            <div style={styles.roiItem}>{isEn ? "Average advisor income: " : "הכנסה ממוצעת ליועץ: "}<strong>₪50,000–80,000/{isEn ? "month" : "חודש"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Current client count: " : "מספר לקוחות נוכחי: "}<strong>30–50 {isEn ? "clients" : "לקוחות"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Time savings: " : "חיסכון בזמן: "}<strong>15–20 {isEn ? "hours/week" : "שעות/שבוע"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Capacity to manage: " : "יכולת לנהל: "}<strong>{isEn ? "15–25 more clients" : "עוד 15-25 לקוחות"}</strong></div>
            <div style={styles.roiItem}>{isEn ? "Revenue increase: " : "עלייה בהכנסות: "}<strong>₪15,000–30,000/{isEn ? "month" : "חודש"}</strong></div>
            
            <div style={styles.roiHighlight}>{isEn ? "Annual revenue potential: +₪180K – ₪360K" : "פוטנציאל הכנסה שנתי: +₪180K - ₪360K"}</div>
          </div>

          <div style={styles.bonusSection}>
            <h4 style={styles.bonusH4}>{isEn ? "In addition to the revenue increase:" : "בנוסף לעלייה בהכנסות:"}</h4>
            <ul>
              <li>{isEn ? "Advanced analysis tools fully owned by you" : "כלי ניתוח מתקדמים בבעלות מלאה"}</li>
              <li>{isEn ? "Significant competitive advantage in the market" : "יתרון תחרותי משמעותי בשוק"}</li>
              <li>{isEn ? "Improved quality of recommendations and client results" : "שיפור איכות ההמלצות והתוצאות ללקוחות"}</li>
              <li>{isEn ? "Ability to provide service at a new level" : "יכולת לספק שירות ברמה חדשה"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Who Is This For?" : "למי זה מתאים?"}</h2>
          <div style={styles.audienceList}>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Investment Advisors" : "יועצי השקעות"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Portfolio Managers" : "מנהלי תיקים"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Private Bankers" : "בנקאים פרטיים"}</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Financial Analysts" : "אנליסטים פיננסיים"}</div>
            <div style={styles.audienceItem}>✓<br/>Traders</div>
            <div style={styles.audienceItem}>✓<br/>{isEn ? "Investment Managers" : "מנהלי השקעות"}</div>
          </div>
          <div style={styles.teamSize}>{isEn ? "Recommended team size: 3–15 participants" : "גודל צוות מומלץ: 3-15 משתתפים"}</div>
        </div>
      </section>

      {/* Work Model */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>{isEn ? "Work Model" : "מודל העבודה"}</h2>
          
          <div style={styles.workDetails}>
            <div style={styles.workDetailItem}>
              <span style={styles.workDetailLabel}>{isEn ? "Duration:" : "משך:"}</span> {isEn ? "5–8 weeks (tailored to needs)" : "5-8 שבועות (מותאם לצרכים)"}
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
              <li style={styles.li}>{isEn ? "Advanced market analysis tools" : "כלי ניתוח שווקים מתקדמים"}</li>
              <li style={styles.li}>{isEn ? "Automated systems for reporting and tracking" : "מערכות אוטומטיות לדיווח ומעקב"}</li>
              <li style={styles.li}>{isEn ? "Template library for recommendations and proposals" : "ספריית תבניות להמלצות והצעות"}</li>
              <li style={styles.li}>{isEn ? "Models for portfolio and risk management" : "מודלים לניהול תיקים וסיכונים"}</li>
              <li style={styles.li}>{isEn ? "Measurable improvement in performance and revenues" : "שיפור מדיד בביצועים והכנסות"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={styles.cta}>
        <div style={styles.container}>
          <h2 style={styles.ctaH2}>{isEn ? "Next Step" : "הצעד הבא"}</h2>
          <p style={styles.ctaP}>
            {isEn ? "We'd love to learn about your field of activity and build a personalized AI plan for your investment advisors and bankers." : "נשמח להכיר את תחום הפעילות שלכם ולבנות תוכנית AI מותאמת אישית ליועצי ההשקעות והבנקאים."}
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

export default TrainingInvestment;