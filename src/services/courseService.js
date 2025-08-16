const Course = require('../models/Course');
const ModuleModel = require('../models/Module');
const Lecture = require('../models/Lecture');

exports.createCourse = async (payload) => {
  const course = new Course(payload);
  return course.save();
};

exports.getCourses = async () => Course.find().sort({ createdAt: -1 }).lean();
exports.getCourseById = async (id) => Course.findById(id).lean();
exports.updateCourse = async (id, payload) => Course.findByIdAndUpdate(id, payload, { new: true });
exports.deleteCourse = async (id) => {
  const modules = await ModuleModel.find({ course: id }).select('_id').lean();
  const moduleIds = modules.map((m) => m._id);
  await Lecture.deleteMany({ module: { $in: moduleIds } });
  await ModuleModel.deleteMany({ course: id });
  return Course.findByIdAndDelete(id);
};