const multer = require('multer');
const path = require('path');
const {Image} = require('../db'); // Import the Image model

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Accept image files only
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
}).single('image'); // Field name in form

// Function to handle image upload
async function uploadImage(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
            // Save image details to the database
            const newImage = new Image({
                filename: req.file.filename,
                path: req.file.path,
            });

            await newImage.save();

            res.status(200).json({
                message: 'Image uploaded successfully',
                data: newImage,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error saving image details',
                error: error.message,
            });
        }
    });
}

module.exports = uploadImage;
