import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const log = (step, ...args) => console.log(`[api/contact:${step}]`, ...args);

/**
 * Fast contact/booking endpoint — bypasses the Express serverless bridge (which was timing out).
 */
export default async function handler(req, res) {
  const started = Date.now();
  log('0', 'request', req.method, req.url);

  if (req.method === 'OPTIONS') {
    log('0', 'OPTIONS preflight');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    log('0', 'rejected method', req.method);
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    log('1', 'loading modules');
    const { connectDatabase } = require('../../server/config/database');
    const { createContactMessage } = require('../../server/modules/contact/contact.service');
    const { createContactSchema } = require('../../server/modules/contact/contact.validation');
    const { env } = require('../../server/config/env');
    log('1', 'modules loaded', `${Date.now() - started}ms`, {
      resendFrom: env.resend.fromEmail,
      resendTo: env.resend.toEmail,
      resendKey: env.resend.apiKey ? `${env.resend.apiKey.slice(0, 8)}…` : 'MISSING',
    });

    log('2', 'connecting MongoDB');
    const dbStart = Date.now();
    await connectDatabase();
    log('2', 'MongoDB ready', `${Date.now() - dbStart}ms`);

    log('3', 'validating body', { type: req.body?.type, email: req.body?.email });
    const validated = createContactSchema.parse({
      body: req.body,
      params: {},
      query: {},
    });
    log('3', 'validation ok', `${Date.now() - started}ms`);

    log('4', 'createContactMessage (save + email)');
    const saveStart = Date.now();
    await createContactMessage(validated.body);
    log('4', 'createContactMessage done', `${Date.now() - saveStart}ms`);

    const isAppointment = validated.body.type === 'appointment';
    log('5', 'success', `${Date.now() - started}ms total`);
    return res.status(201).json({
      success: true,
      message: isAppointment
        ? 'Appointment request received — we will confirm by email shortly.'
        : 'Message sent successfully.',
    });
  } catch (err) {
    log('ERR', `${Date.now() - started}ms`, err?.name, err?.message, err?.stack);

    if (err?.name === 'ZodError') {
      const first = err.issues?.[0]?.message || 'Please check your form and try again.';
      return res.status(400).json({ success: false, message: first, details: err.issues });
    }

    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Could not send your request. Try again.',
    });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
