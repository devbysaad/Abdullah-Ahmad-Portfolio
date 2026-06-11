const service = require('./contact.service');

const submitContact = async (req, res, next) => {
  console.log('[contact:express]', 'POST /api/contact via Express bridge (prefer pages/api/contact.js)');
  try {
    await service.createContactMessage(req.validated.body);
    return res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    return next(err);
  }
};

module.exports = { submitContact };
