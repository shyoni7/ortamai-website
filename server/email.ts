import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
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
    to: process.env.CONTACT_EMAIL_TO,
    replyTo: email,
    subject: `[פנייה חדשה] ${subject} — ${name}`,
    html,
  });
}
