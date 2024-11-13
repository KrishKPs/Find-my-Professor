const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { Image, ProfessorDetail } = require('../db'); // Import models

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png'], // Accepted file formats
  },
});

const upload = multer({ storage }).single('image'); // Field name in form

// Function to handle image upload
async function uploadImage(req, res) {
  const professor = req.user;

  if (!professor) {
    return res.status(401).json({
      message: 'No Professor found #1',
    });
  }

  const professorfind = await ProfessorDetail.findOne({ email: professor });

  if (!professorfind) {
    return res.status(401).json({
      message: 'No Professor found #2',
    });
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const imageUrl = req.file.path; // Cloudinary automatically provides the URL

      // Update ProfessorDetail with the new image URL
      await ProfessorDetail.updateOne({ email: professor }, { profile_photo: imageUrl });

      res.status(200).json({
        message: 'Image uploaded successfully',
        imageUrl, // Return the Cloudinary URL
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
