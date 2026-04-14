import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "../components/LanguageContext";

export default function TrainingDevelopers() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <style>{`
        .training-dev-container * {
          box-sizing: border-box;
        }

        .training-dev-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.8;
          color: #003366;
          background-color: #f8f9fa;
        }

        .training-dev-container .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0;
        }

        .training-dev-container .hero {
          background: linear-gradient(to bottom, #ffffff 0%, #f0f9f8 100%);
          color: #003366;
          padding: 80px 40px;
          text-align: center;
          border-bottom: 3px solid #009688;
        }

        .training-dev-container .hero h1 {
          font-size: 3em;
          margin-bottom: 20px;
          font-weight: 700;
          color: #003366;
        }

        .training-dev-container .hero h2 {
          font-size: 1.8em;
          font-weight: 400;
          color: #009688;
          margin-top: 10px;
        }

        .training-dev-container .hero-subtitle {
          font-size: 1.2em;
          margin-top: 30px;
          font-weight: 400;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          color: #555;
          line-height: 1.6;
        }

        .training-dev-container section {
          padding: 60px 40px;
          background: white;
        }

        .training-dev-container section:nth-child(even) {
          background: #f8f9fa;
        }

        .training-dev-container h2 {
          color: #003366;
          font-size: 2.2em;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 700;
        }

        .training-dev-container h3 {
          color: #009688;
          font-size: 1.6em;
          margin: 40px 0 20px 0;
          font-weight: 600;
        }

        .training-dev-container p {
          margin-bottom: 20px;
          font-size: 1.1em;
        }

        .training-dev-container .highlight {
          font-weight: 700;
          color: #009688;
          font-size: 1.2em;
        }

        .training-dev-container .process-step {
          background: white;
          padding: 30px;
          margin-bottom: 25px;
          border-right: 5px solid #009688;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .training-dev-container .process-step h3 {
          margin-top: 0;
        }

        .training-dev-container .process-step ul {
          margin-right: 25px;
          margin-top: 15px;
        }

        .training-dev-container .process-step li {
          margin-bottom: 10px;
          font-size: 1.05em;
        }

        .training-dev-container .deliverable {
          background: #e8f5f3;
          padding: 15px 20px;
          margin-top: 20px;
          border-radius: 6px;
          font-weight: 600;
          color: #00695c;
        }

        .training-dev-container .capabilities {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .training-dev-container .capability-item {
          background: white;
          padding: 25px;
          border-radius: 8px;
          border-right: 4px solid #009688;
          font-weight: 600;
          font-size: 1.1em;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .training-dev-container .capability-item::before {
          content: "✓";
          color: #009688;
          font-size: 1.4em;
          margin-left: 10px;
          font-weight: bold;
        }

        .training-dev-container .roi-table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .training-dev-container .roi-table th {
          background: #009688;
          color: white;
          padding: 20px;
          text-align: right;
          font-size: 1.2em;
        }

        .training-dev-container .roi-table td {
          padding: 18px 20px;
          border-bottom: 1px solid #e0e0e0;
          font-size: 1.05em;
        }

        .training-dev-container .roi-table tr:last-child td {
          border-bottom: none;
        }

        .training-dev-container .roi-table tr:nth-child(even) {
          background: #f5f5f5;
        }

        .training-dev-container .roi-calc {
          background: linear-gradient(135deg, #e8f5f3 0%, #f0f9f8 100%);
          padding: 35px;
          border-radius: 10px;
          margin: 30px 0;
          border: 2px solid #009688;
        }

        .training-dev-container .roi-calc h3 {
          margin-top: 0;
          text-align: center;
        }

        .training-dev-container .roi-item {
          background: white;
          padding: 15px 25px;
          margin: 12px 0;
          border-radius: 6px;
          font-size: 1.1em;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }

        .training-dev-container .roi-highlight {
          font-size: 1.8em;
          font-weight: 700;
          color: #009688;
          text-align: center;
          margin: 25px 0;
          padding: 20px;
          background: white;
          border-radius: 8px;
        }

        .training-dev-container .audience-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 30px;
        }

        .training-dev-container .audience-item {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          font-weight: 600;
          font-size: 1.05em;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          border-bottom: 3px solid #009688;
        }

        .training-dev-container .audience-item::before {
          content: "✓";
          display: block;
          color: #009688;
          font-size: 2em;
          margin-bottom: 10px;
        }

        .training-dev-container .work-details {
          background: white;
          padding: 30px;
          border-radius: 10px;
          margin: 20px 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        .training-dev-container .work-detail-item {
          padding: 15px 0;
          border-bottom: 1px solid #e0e0e0;
          font-size: 1.1em;
        }

        .training-dev-container .work-detail-item:last-child {
          border-bottom: none;
        }

        .training-dev-container .work-detail-label {
          font-weight: 700;
          color: #009688;
          margin-left: 10px;
        }

        .training-dev-container .deliverables-list {
          margin-top: 20px;
          background: #f8f9fa;
          padding: 25px;
          border-radius: 8px;
        }

        .training-dev-container .deliverables-list h4 {
          color: #009688;
          margin-bottom: 15px;
          font-size: 1.3em;
        }

        .training-dev-container .deliverables-list ul {
          margin-right: 25px;
        }

        .training-dev-container .deliverables-list li {
          margin-bottom: 12px;
          font-size: 1.05em;
        }

        .training-dev-container .cta {
          background: linear-gradient(135deg, #003366 0%, #009688 100%);
          color: white;
          padding: 80px 40px;
          text-align: center;
        }

        .training-dev-container .cta h2 {
          color: white;
          font-size: 2.5em;
          margin-bottom: 30px;
        }

        .training-dev-container .cta p {
          font-size: 1.3em;
          max-width: 700px;
          margin: 0 auto 40px auto;
        }

        .training-dev-container .cta-button {
          display: inline-block;
          background: white;
          color: #003366;
          padding: 18px 50px;
          font-size: 1.2em;
          font-weight: 700;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .training-dev-container .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .training-dev-container footer {
          background: #003366;
          color: white;
          text-align: center;
          padding: 40px 20px;
        }

        .training-dev-container footer h3 {
          color: #009688;
          margin-bottom: 10px;
        }

        .training-dev-container footer p {
          opacity: 0.9;
          font-size: 1em;
        }

        .training-dev-container .bonus-section {
          background: #fff9e6;
          padding: 25px;
          border-radius: 8px;
          margin-top: 25px;
          border-right: 4px solid #ffa726;
        }

        .training-dev-container .bonus-section h4 {
          color: #f57c00;
          margin-bottom: 15px;
        }

        .training-dev-container .team-size {
          background: #009688;
          color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          font-size: 1.2em;
          font-weight: 600;
          margin: 30px 0;
        }

        @media (max-width: 768px) {
          .training-dev-container .hero h1 {
            font-size: 2em;
          }
          
          .training-dev-container .hero h2 {
            font-size: 1.3em;
          }

          .training-dev-container h2 {
            font-size: 1.8em;
          }

          .training-dev-container section {
            padding: 40px 20px;
          }

          .training-dev-container .capabilities {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="training-dev-container" dir="rtl">
        {/* Hero Section */}
        <div className="hero">
          <div className="container">
            <h1>{isEn ? "AI Engineering for Development Teams" : "הכשרה מקצועית למפתחים ומהנדסי תוכנה"}</h1>
            <h2>{isEn ? "Professional AI Training for Developers & Software Engineers" : "AI Engineering for Development Teams"}</h2>
            <p className="hero-subtitle">{isEn ? "Real technological transformation of development processes using AI — comprehensive, practical training that will upgrade your entire development department." : "טרנספורמציה טכנולוגית אמיתית של תהליכי הפיתוח באמצעות AI - הכשרה מקיפה ומעשית שתשדרג את כל מחלקת הפיתוח"}</p>
          </div>
        </div>

        {/* Overview Section */}
        <section>
          <div className="container">
            <h2>{isEn ? "Overview" : "סקירה כללית"}</h2>
            <p>{isEn ? "In-depth training for developers and software engineers who want to embed AI into their daily development processes. Designed for development teams that want to accelerate development times, improve code quality, and focus on solving complex problems instead of routine tasks." : "הכשרה מעמיקה המיועדת למפתחים ומהנדסי תוכנה שרוצים להטמיע AI בתהליכי הפיתוח היומיומיים. תכנית ההכשרה מיועדת לצוותי פיתוח שרוצים להאיץ את זמני הפיתוח, לשפר איכות קוד, ולהתמקד בפתרון בעיות מורכבות במקום במשימות שגרתיות."}</p>
            
            <p className="highlight">{isEn ? "This training is suitable for teams that want to stay relevant and competitive in the AI era." : "הכשרה זו מתאימה לצוותים שרוצים להישאר רלוונטיים ותחרותיים בעידן ה-AI"}</p>

            <div className="team-size">
              {isEn ? "Suitable for development teams of 3–20 developers" : "מתאים לצוותי פיתוח בגודל 3-20 מפתחים"}
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section>
          <div className="container">
            <h2>{isEn ? "Who Is This For?" : "למי מיועדת ההכשרה?"}</h2>
            <div className="audience-list">
              <div className="audience-item">{isEn ? "Full Stack Developers" : "מפתחי Full Stack"}</div>
              <div className="audience-item">{isEn ? "Frontend Developers" : "מפתחי Frontend"}</div>
              <div className="audience-item">{isEn ? "Backend Developers" : "מפתחי Backend"}</div>
              <div className="audience-item">{isEn ? "DevOps Engineers" : "מהנדסי DevOps"}</div>
              <div className="audience-item">{isEn ? "Architects" : "ארכיטקטים"}</div>
              <div className="audience-item">Tech Leads</div>
            </div>
          </div>
        </section>

        {/* Training Process */}
        <section>
          <div className="container">
            <h2>{isEn ? "Training Process" : "תהליך ההכשרה"}</h2>

            <div className="process-step">
              <h3>{isEn ? "Phase 1: Kickoff Workshop — One Day (8 hours)" : "שלב 1: סדנה התנעה - יום אחד (8 שעות)"}</h3>
              <ul>
                <li>{isEn ? "Introduction to leading AI development tools — GitHub Copilot, Cursor, ChatGPT" : "הכרת כלי AI מובילים לפיתוח - GitHub Copilot, Cursor, ChatGPT"}</li>
                <li>{isEn ? "Defining team standards and Best Practices" : "הגדרת סטנדרטים ו-Best Practices לצוות"}</li>
                <li>{isEn ? "Hands-on exercises — writing code with AI" : "תרגילים מעשיים - כתיבת קוד עם AI"}</li>
                <li>{isEn ? "Identifying initial use cases in team projects" : "זיהוי מקרי שימוש ראשוניים בפרויקטים של הצוות"}</li>
              </ul>
              <div className="deliverable">{isEn ? "Deliverable: Personalized work plan + Team Best Practices guide" : "תוצר: תכנית עבודה מותאמת אישית + מדריך Best Practices לצוות"}</div>
            </div>

            <div className="process-step">
              <h3>{isEn ? "Phase 2: In-Depth Training — Two Weeks (40 hours)" : "שלב 2: הכשרה מעמיקה - שבועיים (40 שעות)"}</h3>
              <ul>
                <li>{isEn ? "Advanced use of Code Assistants (Copilot, Cursor, Tabnine)" : "שימוש מתקדם ב-Code Assistants (Copilot, Cursor, Tabnine)"}</li>
                <li>{isEn ? "Prompt Engineering for quality code writing" : "Prompt Engineering לכתיבת קוד איכותי"}</li>
                <li>{isEn ? "AI for testing — automatic Unit Test creation" : "AI לבדיקות - יצירת Unit Tests אוטומטית"}</li>
                <li>{isEn ? "Automatic Code Review and optimization" : "Code Review אוטומטי ואופטימיזציה"}</li>
                <li>{isEn ? "Automatic technical documentation generation" : "יצירת תיעוד טכני אוטומטית"}</li>
                <li>{isEn ? "Using AI for integrations and Legacy Code upgrades" : "שימוש ב-AI לאינטגרציות ושדרוג Legacy Code"}</li>
                <li>{isEn ? "AI-driven DevOps — CI/CD automations" : "DevOps מונע AI - אוטומציות CI/CD"}</li>
              </ul>
              <div className="deliverable">{isEn ? "Deliverable: Full toolkit of templates, prompts, and ready-to-use Workflows" : "תוצר: ארגז כלים מלא של תבניות, פרומפטים ו-Workflows מוכנים לשימוש"}</div>
            </div>

            <div className="process-step">
              <h3>{isEn ? "Phase 3: Practical Implementation in Project — Two Weeks (20 hours)" : "שלב 3: יישום מעשי בפרויקט - שבועיים (20 שעות)"}</h3>
              <ul>
                <li>{isEn ? "Implementing AI tools in real projects" : "הטמעת כלי AI בפרויקטים אמיתיים"}</li>
                <li>{isEn ? "Close mentoring of developers during implementation" : "ליווי צמוד של המפתחים ביישום"}</li>
                <li>{isEn ? "Code Reviews and ongoing feedback" : "Code Reviews ומשוב מתמשך"}</li>
                <li>{isEn ? "Solving practical problems and failures" : "פתרון בעיות וכשלים מעשיים"}</li>
              </ul>
              <div className="deliverable">{isEn ? "Deliverable: Real features/code developed with AI in team projects" : "תוצר: פיצ'רים/קוד ממשיים שפותחו עם AI בפרויקטים של הצוות"}</div>
            </div>

            <div className="process-step">
              <h3>{isEn ? "Phase 4: Follow-up & Embedding — One Month (12 hours)" : "שלב 4: מעקב והטמעה - חודש (12 שעות)"}</h3>
              <ul>
                <li>{isEn ? "4 weekly follow-up sessions" : "4 מפגשי מעקב שבועיים"}</li>
                <li>{isEn ? "Technical support and problem solving" : "תמיכה טכנית ופתרון בעיות"}</li>
                <li>{isEn ? "Data-driven improvements" : "שיפורים מבוססי נתונים"}</li>
                <li>{isEn ? "Measuring results and team impact" : "מדידת תוצאות והשפעה על הצוות"}</li>
              </ul>
              <div className="deliverable">{isEn ? "Deliverable: Detailed summary report + improvement recommendations" : "תוצר: דוח סיכום מפורט + המלצות לשיפור"}</div>
            </div>

            <div className="bonus-section">
              <h4>🎁 {isEn ? "Bonus: Resource Access" : "בונוס: גישה למשאבים"}</h4>
              <ul>
                <li>{isEn ? "Prompt and template library" : "ספריית פרומפטים ותבניות"}</li>
                <li>{isEn ? "Recordings and study materials" : "הקלטות וחומרי לימוד"}</li>
                <li>{isEn ? "Closed alumni community" : "קהילה סגורה של בוגרי ההכשרה"}</li>
                <li>{isEn ? "Regular updates on new tools" : "עדכונים שוטפים על כלים חדשים"}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section>
          <div className="container">
            <h2>{isEn ? "What Will the Team Learn?" : "מה הצוות ילמד?"}</h2>
            <div className="capabilities">
              <div className="capability-item">{isEn ? "Fast and smart code writing with AI Copilots" : "כתיבת קוד מהירה וחכמה עם AI Copilots"}</div>
              <div className="capability-item">{isEn ? "Creating comprehensive automated tests" : "יצירת בדיקות אוטומטיות מקיפות"}</div>
              <div className="capability-item">{isEn ? "Automatic Code Review and optimization" : "Code Review אוטומטי ואופטימיזציה"}</div>
              <div className="capability-item">{isEn ? "Automatic technical documentation" : "תיעוד טכני אוטומטי"}</div>
              <div className="capability-item">{isEn ? "Faster debugging" : "דיבאגינג מהיר יותר"}</div>
              <div className="capability-item">{isEn ? "Safe and efficient Refactoring" : "Refactoring בטוח ויעיל"}</div>
              <div className="capability-item">{isEn ? "Easy Legacy Code upgrades" : "שדרוג Legacy Code בקלות"}</div>
              <div className="capability-item">{isEn ? "Smart DevOps automations" : "אוטומציות DevOps חכמות"}</div>
            </div>
          </div>
        </section>

        {/* ROI */}
        <section>
          <div className="container">
            <h2>{isEn ? "Return on Investment (ROI)" : "החזר השקעה (ROI)"}</h2>
            
            <table className="roi-table">
              <thead>
                <tr>
                  <th>{isEn ? "Metric" : "מדד"}</th>
                  <th>{isEn ? "Estimated Result" : "תוצאה משוערת"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{isEn ? "Development speed increase" : "האצת זמני פיתוח"}</td>
                  <td>30–50%</td>
                </tr>
                <tr>
                  <td>{isEn ? "Bug reduction" : "הפחתת באגים בקוד"}</td>
                  <td>40–60%</td>
                </tr>
                <tr>
                  <td>{isEn ? "Code quality improvement" : "שיפור איכות הקוד"}</td>
                  <td>35–45%</td>
                </tr>
                <tr>
                  <td>{isEn ? "Code Review time savings" : "חיסכון בזמן Code Review"}</td>
                  <td>50–70%</td>
                </tr>
                <tr>
                  <td>{isEn ? "Documentation time savings" : "זמן חיסכון בתיעוד"}</td>
                  <td>60–80%</td>
                </tr>
              </tbody>
            </table>

            <div className="roi-calc">
              <h3>{isEn ? "Sample ROI Calculation for a Team of 10 Developers:" : "דוגמה לחישוב ROI לצוות של 10 מפתחים:"}</h3>
              <div className="roi-item">
                <strong>{isEn ? "Average cost per developer:" : "עלות ממוצעת למפתח:"}</strong> ₪30,000/{isEn ? "month" : "חודש"}
              </div>
              <div className="roi-item">
                <strong>{isEn ? "Monthly team cost:" : "עלות צוות חודשית:"}</strong> ₪300,000
              </div>
              <div className="roi-item">
                <strong>{isEn ? "30% time savings:" : "חיסכון של 30% בזמן:"}</strong> ₪90,000/{isEn ? "month" : "חודש"}
              </div>
              <div className="roi-item">
                <strong>{isEn ? "Annual savings:" : "חיסכון שנתי:"}</strong> ₪1,080,000
              </div>
              <div className="roi-highlight">
                {isEn ? "Return on investment within 2–3 weeks" : "החזר השקעה תוך 2-3 שבועות"}
              </div>
            </div>
          </div>
        </section>

        {/* Work Model */}
        <section>
          <div className="container">
            <h2>{isEn ? "Work Model" : "אופן העבודה"}</h2>
            <div className="work-details">
              <div className="work-detail-item">
                <span className="work-detail-label">{isEn ? "Training duration:" : "משך ההכשרה:"}</span>
                {isEn ? "~80 hours over two months" : "כ-80 שעות על פני חודשיים"}
              </div>
              <div className="work-detail-item">
                <span className="work-detail-label">{isEn ? "Format:" : "מתכונת:"}</span>
                {isEn ? "Hybrid — in-person workshops + independent practice + practical mentoring" : "היברידית - סדנאות פרונטליות + תרגול עצמאי + ליווי מעשי"}
              </div>
              <div className="work-detail-item">
                <span className="work-detail-label">{isEn ? "Group size:" : "גודל קבוצה:"}</span>
                {isEn ? "3–20 participants" : "3-20 משתתפים"}
              </div>
              <div className="work-detail-item">
                <span className="work-detail-label">{isEn ? "Flexibility:" : "גמישות:"}</span>
                {isEn ? "Fully adapted to team needs and schedule" : "התאמה מלאה לצרכי הצוות ולוח הזמנים"}
              </div>
            </div>

            <div className="deliverables-list">
              <h4>{isEn ? "Deliverables" : "תוצרים"}</h4>
              <ul>
                <li>{isEn ? "Team-adapted Best Practices guide" : "מדריך Best Practices מותאם לצוות"}</li>
                <li>{isEn ? "Prompt and template library" : "ספריית פרומפטים ותבניות"}</li>
                <li>{isEn ? "Automated Workflows" : "Workflows אוטומטיים"}</li>
                <li>{isEn ? "Progress and ROI reports" : "דוחות התקדמות ו-ROI"}</li>
                <li>{isEn ? "Professional completion certificate" : "תעודת סיום מקצועית"}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="cta">
          <div className="container">
            <h2>{isEn ? "Ready to Upgrade Your Development Team?" : "מוכנים לשדרג את צוות הפיתוח?"}</h2>
            <p>{isEn ? "Let's talk about how we'll embed AI in your team and double output." : "בואו נדבר על איך נטמיע AI בצוות שלכם ונגדיל את התפוקה פי 2"}</p>
            <Link to={createPageUrl("Contact")} className="cta-button">
              {isEn ? "Schedule a Free Consultation" : "תאמו שיחת ייעוץ חינם"}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <div className="container">
            <h3>ORTAM AI</h3>
            <p>{isEn ? "The AI Development Center — Leading the Technological Transformation" : "המרכז לפיתוח AI - מובילים את הטרנספורמציה הטכנולוגית"}</p>
            <p>yoni.ortam@gmail.com | 052-338-1822</p>
            <p>www.ortamai.com</p>
          </div>
        </footer>
      </div>
    </div>
  );
}