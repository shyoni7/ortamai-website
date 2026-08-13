import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    // Gmail app passwords are often copied with spaces — strip them
    pass: (process.env.SMTP_PASS ?? '').replace(/\s/g, ''),
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
});

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function requireEmailConfig(): void {
  if (!isEmailConfigured()) {
    throw new Error('SMTP is not configured (set SMTP_USER and SMTP_PASS)');
  }
}

function recipientAddress(): string {
  return process.env.CONTACT_EMAIL_TO || process.env.SMTP_USER || '';
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  requireEmailConfig();
  const { name, email, phone, subject, message } = payload;

  const html = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
      <h2 style="color: #7c3aed; margin-bottom: 4px;">פנייה חדשה מהאתר — ORTAM AI</h2>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 120px; font-weight: bold;">שם:</td>
          <td style="padding: 8px 0; color: #111827;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">מייל:</td>
          <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">טלפון:</td>
          <td style="padding: 8px 0; color: #111827;">${phone}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">נושא:</td>
          <td style="padding: 8px 0; color: #111827;">${subject}</td>
        </tr>
      </table>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />

      <h3 style="color: #374151; margin-bottom: 8px;">תוכן ההודעה:</h3>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; color: #111827; white-space: pre-wrap;">${message}</div>

      <p style="margin-top: 24px; color: #9ca3af; font-size: 12px;">הודעה זו נשלחה אוטומטית מאתר ortamai.com</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"ORTAM AI Website" <${process.env.SMTP_USER}>`,
    to: recipientAddress(),
    replyTo: email,
    subject: `[פנייה חדשה] ${subject} — ${name}`,
    html,
  });
}

export interface CvEmailPayload {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  field?: string;
  message?: string;
  attachment?: {
    filename: string;
    content: Buffer;
    contentType: string;
  };
}

export async function sendCvEmail(payload: CvEmailPayload): Promise<void> {
  requireEmailConfig();
  const { name, email, phone, role, field, message, attachment } = payload;

  const rows: Array<[string, string]> = [
    ['שם:', name],
    ['מייל:', email],
    ['טלפון:', phone ?? 'לא צוין'],
    ['תפקיד מבוקש:', role ?? 'לא צוין'],
    ['תחום:', field ?? 'לא צוין'],
    ['קובץ קו"ח:', attachment ? attachment.filename : 'לא צורף קובץ'],
  ];

  const html = buildRtlEmail('קורות חיים חדשים מהאתר — ORTAM AI', rows, message ?? 'ללא הודעה');

  await transporter.sendMail({
    from: `"ORTAM AI Website" <${process.env.SMTP_USER}>`,
    to: recipientAddress(),
    replyTo: email,
    subject: `[קו"ח חדשים] ${name}${role ? ` — ${role}` : ''}`,
    html,
    attachments: attachment
      ? [{ filename: attachment.filename, content: attachment.content, contentType: attachment.contentType }]
      : [],
  });
}

export interface ConsultationEmailPayload {
  businessName: string;
  firstName: string;
  email: string;
  phone: string;
  about?: string;
}

export async function sendConsultationEmail(payload: ConsultationEmailPayload): Promise<void> {
  requireEmailConfig();
  const { businessName, firstName, email, phone, about } = payload;

  const rows: Array<[string, string]> = [
    ['שם פרטי:', firstName],
    ['שם העסק:', businessName],
    ['מייל:', email],
    ['טלפון:', phone],
  ];

  const html = buildRtlEmail('בקשת ייעוץ חדשה (חממה) — ORTAM AI', rows, about ?? 'לא צוין');

  await transporter.sendMail({
    from: `"ORTAM AI Website" <${process.env.SMTP_USER}>`,
    to: recipientAddress(),
    replyTo: email,
    subject: `[בקשת ייעוץ] ${firstName} — ${businessName}`,
    html,
  });
}

export interface CourseOrderEmailPayload {
  type: 'booking' | 'eligibility_check';
  courseTitle: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
}

/** Owner notification for a new booking / eligibility-check request. */
export async function sendCourseOrderEmail(payload: CourseOrderEmailPayload): Promise<void> {
  requireEmailConfig();
  const { type, courseTitle, name, email, phone, message } = payload;
  const isEligibility = type === 'eligibility_check';

  const html = buildRtlEmail(
    isEligibility
      ? 'בקשת בדיקת זכאות חדשה — מסלול מסובסד'
      : 'הזמנת קורס חדשה מהאתר — ORTAM AI',
    [
      [isEligibility ? 'מסלול:' : 'קורס:', courseTitle],
      ['שם:', name],
      ['מייל:', `<a href="mailto:${email}" style="color: #7c3aed;">${email}</a>`],
      ['טלפון:', phone],
    ],
    message || 'ללא הודעה'
  );

  await transporter.sendMail({
    from: `"ORTAM AI Website" <${process.env.SMTP_USER}>`,
    to: recipientAddress(),
    replyTo: email,
    subject: isEligibility
      ? `[בדיקת זכאות] ${courseTitle} — ${name}`
      : `[הזמנת קורס] ${courseTitle} — ${name}`,
    html,
  });
}

/** Confirmation sent to the customer after submitting a request. */
export async function sendCourseOrderConfirmationEmail(payload: CourseOrderEmailPayload): Promise<void> {
  requireEmailConfig();
  const { type, courseTitle, name, email } = payload;
  const isEligibility = type === 'eligibility_check';

  const body = isEligibility
    ? `היי ${name},\n\nקיבלנו את בקשתך לבדיקת זכאות למסלול "${courseTitle}".\nצוות ORTAM AI יבדוק את הפרטים ויחזור אליך טלפונית בהקדם.\n\nתודה,\nצוות ORTAM AI`
    : `היי ${name},\n\nקיבלנו את הזמנתך ל"${courseTitle}".\nניצור איתך קשר תוך יום עסקים לתיאום מועד והסדרת התשלום.\n\nתודה,\nצוות ORTAM AI`;

  await transporter.sendMail({
    from: `"ORTAM AI" <${process.env.SMTP_USER}>`,
    to: email,
    subject: isEligibility
      ? `קיבלנו את בקשתך — ${courseTitle} | ORTAM AI`
      : `קיבלנו את הזמנתך — ${courseTitle} | ORTAM AI`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
        <h2 style="color: #7c3aed; margin-bottom: 4px;">ORTAM AI</h2>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; color: #111827; white-space: pre-wrap;">${body}</div>
        <p style="margin-top: 24px; color: #9ca3af; font-size: 12px;">הודעה זו נשלחה אוטומטית מאתר ortamai.com</p>
      </div>
    `,
  });
}

function buildRtlEmail(title: string, rows: Array<[string, string]>, body: string): string {
  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 120px; font-weight: bold;">${label}</td>
          <td style="padding: 8px 0; color: #111827;">${value}</td>
        </tr>`
    )
    .join('');

  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
      <h2 style="color: #7c3aed; margin-bottom: 4px;">${title}</h2>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
      <table style="width: 100%; border-collapse: collapse;">${tableRows}</table>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
      <h3 style="color: #374151; margin-bottom: 8px;">תוכן ההודעה:</h3>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; color: #111827; white-space: pre-wrap;">${body}</div>
      <p style="margin-top: 24px; color: #9ca3af; font-size: 12px;">הודעה זו נשלחה אוטומטית מאתר ortamai.com</p>
    </div>
  `;
}
