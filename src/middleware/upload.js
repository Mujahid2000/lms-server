// const multer = require('multer');
// const path = require('path');


// const fileFilter = (req, file, cb) => {
  //   const allowed = /jpeg|jpg|png|gif/;
  //   const ext = path.extname(file.originalname).toLowerCase();
  //   if (allowed.test(ext)) cb(null, true);
  //   else cb(new Error('Unsupported file type'));
  // };
  
  // // Use memory storage for Base64 conversion
  // const storage = multer.memoryStorage();
  
  // exports.uploadSingle = (fieldName) => multer({ storage, fileFilter }).single(fieldName);
  
  
  
  
  
  
  
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: () => ({
    folder: "portfolio-projects",
    // allowed_formats: ["jpg", "jpeg", "png", "gif", "svg"],
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5 MB
  },
});

module.exports = upload;
