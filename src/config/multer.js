const multer = require("multer");

// Memory Storage = Buffer data directly available
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
