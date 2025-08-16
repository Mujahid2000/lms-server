const moduleService = require('../services/ModuleService');

exports.createModule = async (req, res) => {
  const { courseId, title, description } = req.body;
  console.log(courseId, title, description)
  if (!courseId || !title ||!description) return res.status(400).json({ message: 'Please Complete the required Field' });
  const mod = await moduleService.createModule(courseId, title, description);
  res.status(201).json(mod);
};

exports.listModules = async (req, res) => {
  const  courseId  = req.params.id;
  console.log(courseId)
  if (!courseId) return res.status(400).json({ message: 'courseId required' });
  const modules = await moduleService.getModulesByCourse(courseId);
  res.json(modules);
};

exports.updateModule = async (req, res) => {
  const mod = await moduleService.updateModule(req.params.id, req.body);
  res.json(mod);
};

exports.deleteModule = async (req, res) => {
  await moduleService.deleteModule(req.params.id);
  res.json({ message: 'Module deleted' });
};