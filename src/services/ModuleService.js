const ModuleModel = require('../models/Module');
const Lecture = require('../models/Lecture');
const { default: mongoose } = require('mongoose');

exports.createModule = async (courseId, title, description) => {
  const last = await ModuleModel.find({ course: courseId }).sort({ moduleNumber: -1 }).limit(1);
  const nextNumber = (last[0]?.moduleNumber || 0) + 1;
  const mod = new ModuleModel({ course: courseId, title, moduleNumber: nextNumber, description });
  return mod.save();
};

exports.getModulesByCourse = async (courseId) => {
  console.log(courseId)
  return ModuleModel.aggregate([
  {
    $match: {
      course: new mongoose.Types.ObjectId(courseId)  // courseId from API params
    }
  },
  {
    $lookup: {
      from: "lectures",  // Adjust to your exact collection name, e.g., "lecture" if singular
      let: { moduleIdLocal: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                { $toObjectId: "$moduleId" },  // Convert lecture.moduleId (string) to ObjectId
                "$$moduleIdLocal"              // Module _id
              ]
            }
          }
        },
        {
          $sort: { order: 1 }  // Optional: Sort lectures by 'order' field within each module
        }
      ],
      as: "lectures"
    }
  },
  {
    $sort: { moduleNumber: 1 }  // Sort modules
  }
]);
};

exports.updateModule = (id, payload) => ModuleModel.findByIdAndUpdate(id, payload, { new: true });
exports.deleteModule = async (id) => {
  await Lecture.deleteMany({ module: id });
  return ModuleModel.findByIdAndDelete(id);
};