import { getApiErrorMessage, submitContact } from './api';

const log = (...args) => console.log('[client:contact]', ...args);

export async function sendContactMessage({ name, email, message }) {
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();
  const trimmedMessage = message?.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    throw new Error('Please fill in name, email, and message.');
  }

  log('sendContactMessage start', { name: trimmedName, email: trimmedEmail });
  try {
    const result = await submitContact({
      type: 'message',
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });
    log('sendContactMessage ok', result);
    return result;
  } catch (err) {
    log('sendContactMessage failed', err?.message, err?.response?.data);
    throw err;
  }
}

export async function sendAppointmentRequest({
  name,
  email,
  message,
  duration,
  appointmentDate,
  appointmentTime,
  timezone,
}) {
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();

  if (!trimmedName || !trimmedEmail) {
    throw new Error('Please fill in your name and email.');
  }

  if (!appointmentDate || !appointmentTime) {
    throw new Error('Please select a date and time for your call.');
  }

  log('sendAppointmentRequest start', {
    name: trimmedName,
    email: trimmedEmail,
    appointmentDate,
    appointmentTime,
  });
  try {
    const result = await submitContact({
      type: 'appointment',
      name: trimmedName,
      email: trimmedEmail,
      message: message?.trim() || '(No additional notes)',
      duration,
      appointmentDate,
      appointmentTime,
      timezone: timezone || 'UTC',
    });
    log('sendAppointmentRequest ok', result);
    return result;
  } catch (err) {
    log('sendAppointmentRequest failed', err?.message, err?.response?.data);
    throw err;
  }
}

export function getContactErrorMessage(err, fallback = 'Could not send. Try again.') {
  return getApiErrorMessage(err, fallback);
}
