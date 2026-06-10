const { ContactMessage } = require('./contact.model');
const { sendPortfolioEmail } = require('../../utils/resendMail');

const createContactMessage = async (payload) => {
  const doc = await ContactMessage.create(payload);

  // Respond to the user immediately — email sends in the background
  setImmediate(() => {
    sendPortfolioEmail(payload).catch((err) => {
      console.error('[contact] email failed:', err?.message || err);
    });
  });

  return doc;
};

module.exports = { createContactMessage };
