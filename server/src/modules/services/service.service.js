const { Service } = require('./service.model');

const listServices = () => Service.find().sort({ order: 1, createdAt: 1 });
const createService = (payload) => Service.create(payload);
const updateService = (id, payload) =>
  Service.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
const deleteService = (id) => Service.findByIdAndDelete(id);

module.exports = { listServices, createService, updateService, deleteService };
