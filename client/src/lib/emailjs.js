import { env, getEmailJsMissingVars, isEmailJsConfigured } from './env';
import { formatAppointmentSummary } from '../components/booking/booking.utils';

const TEMPLATE_KEYS = {
  message: 'templateMessage',
  appointment: 'templateAppointment',
};

let emailJsModule = null;
let initPromise = null;

export function getEmailJsStatus() {
  return {
    configured: isEmailJsConfigured(),
    missing: getEmailJsMissingVars(),
  };
}

function assertEmailJsReady(templateKey) {
  if (!isEmailJsConfigured()) {
    const missing = getEmailJsMissingVars().join(', ');
    throw new Error(
      `EmailJS is not configured. Add these to client/.env and restart the dev server: ${missing}`
    );
  }

  const templateId = env.emailJs[TEMPLATE_KEYS[templateKey]];
  if (!templateId) {
    throw new Error(`EmailJS template is missing for "${templateKey}".`);
  }

  return {
    publicKey: env.emailJs.publicKey,
    serviceId: env.emailJs.serviceId,
    templateId,
    toEmail: env.emailJs.toEmail,
  };
}

async function getEmailJs() {
  if (!emailJsModule) {
    const { default: emailjs } = await import('@emailjs/browser');
    emailJsModule = emailjs;
  }

  if (!initPromise) {
    initPromise = emailJsModule.init({
      publicKey: env.emailJs.publicKey,
      limitRate: { id: 'portfolio_forms', throttle: 10_000 },
    });
  }

  await initPromise;
  return emailJsModule;
}

function buildBaseParams({ name, email, message, subject }) {
  const trimmedName = name?.trim() || '';
  const trimmedEmail = email?.trim() || '';
  const trimmedMessage = message?.trim() || '';

  return {
    to_email: env.emailJs.toEmail,
    from_name: trimmedName,
    from_email: trimmedEmail,
    reply_to: trimmedEmail,
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
    subject,
  };
}

async function sendTemplate(templateKey, extraParams) {
  const { serviceId, templateId } = assertEmailJsReady(templateKey);
  const emailjs = await getEmailJs();

  const response = await emailjs.send(serviceId, templateId, extraParams);

  if (response?.status && response.status >= 400) {
    throw new Error(response.text || `EmailJS request failed (${response.status})`);
  }

  return response;
}

/** Quick message from the contact section */
export async function sendContactMessage({ name, email, message }) {
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();
  const trimmedMessage = message?.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    throw new Error('Please fill in name, email, and message.');
  }

  return sendTemplate('message', {
    ...buildBaseParams({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      subject: `Portfolio message from ${trimmedName}`,
    }),
  });
}

/** Book a call — calendar + details step */
export async function sendAppointmentRequest({
  name,
  email,
  message,
  duration,
  appointmentDate,
  appointmentTime,
  timezone,
  selectedDate,
  use24h = false,
}) {
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();

  if (!trimmedName || !trimmedEmail) {
    throw new Error('Please fill in your name and email.');
  }

  if (!appointmentDate || !appointmentTime) {
    throw new Error('Please select a date and time for your call.');
  }

  const date = selectedDate || new Date(`${appointmentDate}T12:00:00`);
  const { dateStr, timeStr } = formatAppointmentSummary(
    date,
    appointmentTime,
    duration,
    use24h
  );

  const notes = message?.trim() || '(No additional notes)';

  return sendTemplate('appointment', {
    ...buildBaseParams({
      name: trimmedName,
      email: trimmedEmail,
      message: notes,
      subject: `Call request from ${trimmedName} — ${appointmentDate} ${appointmentTime}`,
    }),
    duration: String(duration),
    timezone: timezone || 'UTC',
    appointment_date: appointmentDate,
    appointment_time: appointmentTime,
    appointment_summary: `${dateStr} · ${timeStr} (${timezone || 'UTC'})`,
  });
}

export function getEmailJsErrorMessage(err, fallback = 'Could not send email. Try again.') {
  if (typeof err?.text === 'string' && err.text.trim()) return err.text;
  if (typeof err?.message === 'string' && err.message.trim()) return err.message;
  return fallback;
}
