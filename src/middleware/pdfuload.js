const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  // Allowed file extensions for both thumbnail & notes
  const allowed = /jpeg|jpg|png|gif|pdf/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Unsupported file type'));
};

// Store in memory (you’re using Base64 conversion later)
const storage = multer.memoryStorage();

exports.uploadLectureFiles = multer({ storage, fileFilter }).fields([
  { name: 'thumbnail', maxCount: 1 }, // one image
  { name: 'notes', maxCount: 5 }      // up to 5 PDFs
]);

