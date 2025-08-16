const Lecture = require('../models/Lecture');

exports.createLecture = async (moduleId, payload) => {
  const last = await Lecture.find({ moduleId }).sort({ order: -1 }).limit(1);
  const nextOrder = (last[0]?.order || 0) + 1;

  const lecture = new Lecture({
    moduleId,
    title: payload.title,
    videoUrl: payload.videoUrl,
    duration: payload.duration,
    notes: payload.notes, // now this is an array or a single string
    order: nextOrder
  });

  return lecture.save();
};



exports.getLecturesByModule = async (moduleId) => Lecture.find({ module: moduleId }).sort({ order: 1 }).lean();
exports.updateLecture = (id, payload) => Lecture.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
exports.deleteLecture = (id) => Lecture.findByIdAndDelete(id);
exports.getAllLectures = async (filter = {}) => Lecture.find(filter).populate({ path: 'module', populate: { path: 'course' } }).lean();