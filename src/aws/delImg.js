const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// Configure AWS SDK with your credentials and region
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETKEY
  }
});

// Function to delete an object from S3
const deleteS3Img = async (objectKey) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: objectKey
  });

  try {
    const response = await s3Client.send(command);
    // console.log('File deleted successfully');
    return response;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Export the deleteS3Img function
module.exports = deleteS3Img;
