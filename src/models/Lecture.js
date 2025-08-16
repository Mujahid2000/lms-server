const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema(
  {
    moduleId: { type: String, required: true },
    title: { type: String, required: true },
    duration: {type: Number, required: true},
    videoUrl: { type: String, required: true },
    isPreview: { type: Boolean, required: true, default: false },
    notes: [{ type: String, required: true }],
    order: { type: Number, required: true },
    isCompleted: {type: Boolean, required: true, default: false},
    isUnlocked:{type: Boolean, required: true, default: false}
  },
  { timestamps: true }
);



module.exports = mongoose.model('Lecture', LectureSchema);