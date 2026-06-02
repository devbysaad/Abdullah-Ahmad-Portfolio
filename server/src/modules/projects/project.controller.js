const projectService = require('./project.service');

const getProjects = async (_req, res, next) => {
  try {
    const items = await projectService.listProjects();
    return res.json(items);
  } catch (err) {
    return next(err);
  }
};

const createProject = async (req, res, next) => {
  try {
    const item = await projectService.createProject(req.validated.body);
    return res.status(201).json(item);
  } catch (err) {
    return next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const item = await projectService.updateProject(req.params.id, req.validated.body);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json(item);
  } catch (err) {
    return next(err);
  }
};

const removeProject = async (req, res, next) => {
  try {
    const item = await projectService.deleteProject(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getProjects, createProject, updateProject, removeProject };
