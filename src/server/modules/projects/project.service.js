const { Project } = require('./project.model');

const listProjects = () => Project.find().sort({ order: 1, createdAt: 1 });
const createProject = (payload) => Project.create(payload);
const updateProject = (id, payload) =>
  Project.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
const deleteProject = (id) => Project.findByIdAndDelete(id);

module.exports = { listProjects, createProject, updateProject, deleteProject };
