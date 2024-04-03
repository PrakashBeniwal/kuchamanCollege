const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const multer = require('multer');

// Create an S3 client with your AWS credentials
const s3Client = new S3Client({
  credentials: fromIni(),
  region: 'YOUR_REGION' // Replace with your AWS region, e.g., 'us-east-1'
});

// Set up multer to upload files directly to S3
const upload = multer({
  storage: multer.memoryStorage(), // Save files in memory before uploading to S3
  fileFilter: function(req, file, cb) {
    // Add any file filtering logic here if needed
    cb(null, true);
  }
}).array('images', 10); // Allow uploading up to 10 images with the field name 'images'

// Function to upload multiple images to S3
const uploadImagesToS3 = async (files) => {
  try {
    const uploadPromises = files.map(async (file) => {
      // Set up parameters for uploading to S3
      const params = {
        Bucket: 'YOUR_S3_BUCKET_NAME',
        Key: file.originalname, // Use original file name as S3 key
        Body: file.buffer, // File buffer from multer
        ACL: 'public-read' // Set appropriate ACL permissions
      };

      // Upload file to S3
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // Return the S3 object URL
      return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    });

    // Wait for all uploads to complete
    const imageUrls = await Promise.all(uploadPromises);

    // Return array of S3 object URLs
    return imageUrls;
  } catch (error) {
    console.error('Error uploading files to S3:', error);
    throw error;
  }
};

module.exports = {
  upload,
  uploadImagesToS3
};
