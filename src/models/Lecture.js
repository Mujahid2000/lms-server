const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema(
  {
    moduleId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Module", 
      required: true 
    },
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    videoUrl: { type: String, required: true },
    isPreview: { type: Boolean, default: false },
    notes: [{ type: String }], // optional রাখলাম
    order: { type: Number, required: true },
    isCompleted: { type: Boolean, default: false },
    isUnlocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// প্রতিটি module এর মধ্যে order unique থাকবে
LectureSchema.index({ moduleId: 1, order: 1 }, { unique: false });

module.exports = mongoose.model('Lecture', LectureSchema);
