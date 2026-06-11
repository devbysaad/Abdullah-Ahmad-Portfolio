const { ContactMessage } = require('./contact.model');
const { sendPortfolioEmail } = require('../../utils/resendMail');

const log = (step, ...args) => console.log(`[contact:service:${step}]`, ...args);

const createContactMessage = async (payload) => {
  log('1', 'saving to MongoDB', { type: payload.type, email: payload.email });
  const saveStart = Date.now();
  const doc = await ContactMessage.create(payload);
  log('1', 'saved', doc._id?.toString(), `${Date.now() - saveStart}ms`);

  // Respond to client immediately — email in background (MongoDB must not block on Resend)
  setImmediate(() => {
    const emailStart = Date.now();
    log('2', 'sending email via Resend (background)');
    sendPortfolioEmail(payload)
      .then((result) => log('2', 'email sent', result?.id || 'ok', `${Date.now() - emailStart}ms`))
      .catch((err) => log('2', 'email FAILED', `${Date.now() - emailStart}ms`, err?.message, err));
  });

  return doc;
};

module.exports = { createContactMessage };
