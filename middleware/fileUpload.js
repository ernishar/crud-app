const multer = require('multer');
const fs= require("fs")
const path = require('path');

// Ensure that the 'public/assets' directory exists
const uploadDirectory = 'public/assets/';
const absoluteUploadPath = path.join(__dirname, '..', uploadDirectory);
if (!fs.existsSync(absoluteUploadPath)) {
    fs.mkdirSync(absoluteUploadPath, { recursive: true });
}


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/');
    },
    filename: function (req, file, cb) {
        cb(
          null,
          Date.now() + "-" + file.originalname
        );
}
});


// Filter function to accept only certain file types
const fileFilter = (req, file, cb) => {
    console.log(file, "line 15")
    if (file) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Unsupported file type'), false); // Reject the file
    }
};

// Initialize Multer with options
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
