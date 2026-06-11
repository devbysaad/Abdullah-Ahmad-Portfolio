/**
 * Quick Resend smoke test — mirrors https://resend.com/docs/send-with-nodejs
 * Run: node scripts/test-resend.mjs
 */
import { config } from 'dotenv';
import { resolve } from 'path';
import { Resend } from 'resend';

config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

const apiKey = process.env.RESEND_API_KEY?.trim();
const from = process.env.RESEND_FROM_EMAIL?.trim() || 'onboarding@resend.dev';
const to = process.env.RESEND_TO_EMAIL?.trim();

if (!apiKey) {
  console.error('Missing RESEND_API_KEY in .env or .env.local');
  process.exit(1);
}
if (!to) {
  console.error('Missing RESEND_TO_EMAIL in .env or .env.local');
  process.exit(1);
}

const resend = new Resend(apiKey);

const { data, error } = await resend.emails.send({
  from,
  to,
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
});

if (error) {
  console.error('Resend error:', error);
  process.exit(1);
}

console.log('Email sent:', data);
