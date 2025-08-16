const Lecture = require('../models/Lecture');

exports.createLecture = async (moduleId, payload) => {
  // console.log('lecture service',moduleId, payload)
  // moduleId অনুযায়ী সর্বশেষ lecture খুঁজে বের করো
  const last = await Lecture.find({ moduleId })
    .sort({ order: -1 })
    .limit(1);
// console.log('check 1')
  const nextOrder = (last[0]?.order || 0) + 1;
// console.log('check 2' , nextOrder)
  const lecture = new Lecture({
    moduleId, // এখানে 그대로 থাকবে
    title: payload.title,
    videoUrl: payload.videoUrl,
    duration: payload.duration,
    notes: payload.notes, 
    order: nextOrder,
  });
// console.log('check 3')
  return lecture.save();
  
};



exports.getLecturesByModule = async (moduleId) => Lecture.find({ module: moduleId }).sort({ order: 1 }).lean();
exports.updateLecture = (id, payload) => Lecture.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
exports.deleteLecture = (id) => Lecture.findByIdAndDelete(id);
exports.getAllLectures = async (filter = {}) => Lecture.find(filter).populate({ path: 'module', populate: { path: 'course' } }).lean();