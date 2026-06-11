const { Resend } = require('resend');
const { env } = require('../config/env');

const log = (step, ...args) => console.log(`[resend:${step}]`, ...args);

let client = null;

const getClient = () => {
  if (!client) {
    log('init', 'creating Resend client', {
      apiKey: env.resend.apiKey ? `${env.resend.apiKey.slice(0, 8)}…` : 'MISSING',
    });
    client = new Resend(env.resend.apiKey);
  }
  return client;
};

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildMessageEmail(payload) {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const message = escapeHtml(payload.message).replace(/\n/g, '<br />');

  return {
    subject: `Portfolio message from ${payload.name}`,
    html: `
      <h2>New portfolio message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    text: `New portfolio message\n\nName: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  };
}

function buildAppointmentEmail(payload) {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const notes = escapeHtml(payload.message || '(No additional notes)').replace(/\n/g, '<br />');
  const when = `${payload.appointmentDate} ${payload.appointmentTime} (${payload.timezone || 'UTC'})`;

  return {
    subject: `Call request from ${payload.name} — ${when}`,
    html: `
      <h2>New call booking request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Duration:</strong> ${payload.duration} minutes</p>
      <p><strong>When:</strong> ${escapeHtml(when)}</p>
      <p><strong>Notes:</strong></p>
      <p>${notes}</p>
    `,
    text: [
      'New call booking request',
      '',
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Duration: ${payload.duration} minutes`,
      `When: ${when}`,
      '',
      `Notes: ${payload.message || '(No additional notes)'}`,
    ].join('\n'),
  };
}

async function sendPortfolioEmail(payload) {
  log('1', 'build email', { type: payload.type, to: env.resend.toEmail, from: env.resend.fromEmail });

  const content =
    payload.type === 'appointment' ? buildAppointmentEmail(payload) : buildMessageEmail(payload);

  log('2', 'subject', content.subject);

  const resend = getClient();
  const sendStart = Date.now();

  log('3', 'calling resend.emails.send…');
  const { data, error } = await resend.emails.send({
    from: env.resend.fromEmail,
    to: [env.resend.toEmail],
    replyTo: payload.email,
    subject: content.subject,
    html: content.html,
    text: content.text,
  });

  log('4', 'response', `${Date.now() - sendStart}ms`, { data, error });

  if (error) {
    log('ERR', 'Resend API error', JSON.stringify(error, null, 2));
    const err = new Error(error.message || 'Resend failed to send email');
    err.statusCode = 502;
    throw err;
  }

  log('5', 'sent ok', data?.id);
  return data;
}

module.exports = { sendPortfolioEmail };
