const { ContactMessage } = require('./contact.model');

const createContactMessage = (payload) => ContactMessage.create(payload);

module.exports = { createContactMessage };
