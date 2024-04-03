const express = require('express');
const router = express.Router();
const uploadFileToS3 = require('./awsS3Upload');

// POST route for uploading images
router.post('/upload-images', async (req, res) => {
  try {
    const uploadedImageUrls = [];

    // Loop through each file uploaded in the request
    for (const file of req.files) {
      // Upload the file to S3 and get the URL
      const imageUrl = await uploadFileToS3(file.buffer, file.originalname);
      uploadedImageUrls.push(imageUrl);
    }

    // Respond with the URLs of the uploaded images
    res.json({ message: 'Images uploaded successfully', urls: uploadedImageUrls });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

module.exports = router;
