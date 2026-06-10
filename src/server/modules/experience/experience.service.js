const { Experience } = require('./experience.model');

const listExperience = () => Experience.find().sort({ order: 1, createdAt: 1 });
const createExperience = (payload) => Experience.create(payload);
const updateExperience = (id, payload) =>
  Experience.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
const deleteExperience = (id) => Experience.findByIdAndDelete(id);

module.exports = { listExperience, createExperience, updateExperience, deleteExperience };
