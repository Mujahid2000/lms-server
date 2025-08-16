const Lecture = require('../models/Lecture');

exports.createLecture = async (moduleId, payload) => {
  // module ফিল্ড দিয়ে filter করো (moduleId নয়)
  const last = await Lecture.find({ module: moduleId })
    .sort({ order: -1 })
    .limit(1);

  const nextOrder = (last[0]?.order || 0) + 1;

  const lecture = new Lecture({
    module: moduleId, // ⚡️ module field ব্যবহার করো, moduleId নয়
    title: payload.title,
    videoUrl: payload.videoUrl,
    duration: payload.duration,
    notes: payload.notes, // array
    order: nextOrder,
  });

  return lecture.save();
};



exports.getLecturesByModule = async (moduleId) => Lecture.find({ module: moduleId }).sort({ order: 1 }).lean();
exports.updateLecture = (id, payload) => Lecture.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
exports.deleteLecture = (id) => Lecture.findByIdAndDelete(id);
exports.getAllLectures = async (filter = {}) => Lecture.find(filter).populate({ path: 'module', populate: { path: 'course' } }).lean();