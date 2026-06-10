import { getApiErrorMessage, submitContact } from './api';

export async function sendContactMessage({ name, email, message }) {
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();
  const trimmedMessage = message?.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    throw new Error('Please fill in name, email, and message.');
  }

  return submitContact({
    type: 'message',
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
  });
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

  return submitContact({
    type: 'appointment',
    name: trimmedName,
    email: trimmedEmail,
    message: message?.trim() || '(No additional notes)',
    duration,
    appointmentDate,
    appointmentTime,
    timezone: timezone || 'UTC',
  });
}

export function getContactErrorMessage(err, fallback = 'Could not send. Try again.') {
  return getApiErrorMessage(err, fallback);
}
