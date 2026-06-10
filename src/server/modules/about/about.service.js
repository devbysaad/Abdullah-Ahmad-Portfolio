const { About } = require('./about.model');

const getAbout = async () => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({});
  }
  return about;
};

const updateAbout = async (payload) => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create(payload);
    return about;
  }
  Object.assign(about, payload);
  await about.save();
  return about;
};

module.exports = { getAbout, updateAbout };
