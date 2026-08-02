import { describe, it, expect } from 'vitest';
import nodemailer from 'nodemailer';

// Credentials must come from the environment — never commit them to the repo.
// The live SMTP check only runs when real credentials are provided.
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

describe.skipIf(!user || !pass)('Gmail SMTP credentials', () => {
  it('should verify SMTP connection with provided credentials', async () => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user,
        pass: (pass ?? '').replace(/\s/g, ''),
      },
    });

    // Verify connection — throws if credentials are invalid
    await expect(transporter.verify()).resolves.toBe(true);
  }, 15000);
});
