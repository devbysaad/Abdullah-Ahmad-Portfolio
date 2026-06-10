import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/**
 * Fast contact/booking endpoint — bypasses the Express serverless bridge (which was timing out).
 */
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { connectDatabase } = require('../../server/config/database');
    const { createContactMessage } = require('../../server/modules/contact/contact.service');
    const { createContactSchema } = require('../../server/modules/contact/contact.validation');

    await connectDatabase();

    const validated = createContactSchema.parse({
      body: req.body,
      params: {},
      query: {},
    });

    await createContactMessage(validated.body);

    const isAppointment = validated.body.type === 'appointment';
    return res.status(201).json({
      success: true,
      message: isAppointment
        ? 'Appointment request received — we will confirm by email shortly.'
        : 'Message sent successfully.',
    });
  } catch (err) {
    if (err?.name === 'ZodError') {
      const first = err.issues?.[0]?.message || 'Please check your form and try again.';
      return res.status(400).json({ success: false, message: first, details: err.issues });
    }

    console.error('[api/contact]', err?.message || err);
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
