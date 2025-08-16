const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
    description: {type:String, required:true}
  },
  { timestamps: true }
);



module.exports = mongoose.model('Module', ModuleSchema);