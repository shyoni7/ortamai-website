import { describe, it, expect } from 'vitest';
import nodemailer from 'nodemailer';

describe('Gmail SMTP credentials', () => {
  it('should verify SMTP connection with provided credentials', async () => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER ?? 'info@ortamai.com',
        pass: (process.env.SMTP_PASS ?? 'nhze lnnx itse wkid').replace(/\s/g, ''),
      },
    });

    // Verify connection — throws if credentials are invalid
    await expect(transporter.verify()).resolves.toBe(true);
  }, 15000);
});
