const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    thumbnail: { type: String , required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);