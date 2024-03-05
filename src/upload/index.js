const multer = require('multer');
const path = require('path');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Specify the filename of the uploaded file
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create Multer instance
const upload = multer({ storage: storage });

module.exports=upload;

