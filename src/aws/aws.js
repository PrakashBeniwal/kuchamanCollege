// const AWS = require('aws-sdk');

// // Set up AWS SDK
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESSKEYID,
//   secretAccessKey: process.env.AWS_SECRETKEY,
//   region: "ap-south-1",
// });

// // Create an S3 service object
// const s3 = new AWS.S3();

// // Define middleware function to upload file to S3
// const uploadToS3 = (bucketName) => {
//   return (req, res, next) => {
//     if (!req.file) {
//         console.log(req.file)
//         console.log("no file exist")
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Specify the parameters for the S3 object
//     const params = {
//       Bucket: bucketName,
//       Key: req.file.originalname, // Name of the file in S3
//       Body: req.file.buffer, // File data buffer
//       ContentType: req.file.mimetype, // Content type of the file
//       ACL: 'public-read', // Access control list
//     };

//     // Upload the file to AWS S3
//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.error('Error uploading file to S3:', err);
//         return res.status(500).json({ error: 'Failed to upload file to S3' });
//       }

//       // Set the S3 URL in the request object
//       req.s3Url = data.Location;
//       next();
//     });
//   };
// };

// module.exports = uploadToS3;


// // const AWS = require('aws-sdk');

// // // Configure AWS SDK
// // AWS.config.update({
// //     region: "ap-south-1",
// //     credentials: {
// //         accessKeyId: process.env.AWS_ACCESSKEYID,
// //         secretAccessKey: process.env.AWS_SECRETKEY
// //     }
// // });

// // // Create an S3 service object
// // const s3 = new AWS.S3();

// // // Function to upload a single file to S3
// // const uploadFileToS3 = (fileData, fileName) => {
// //     return new Promise((resolve, reject) => {
// //         // Specify the parameters for the S3 object
// //         const params = {
// //             Bucket: 'kuchamanimages',
// //             Key: `${Date.now()}${fileName}`, // Name of the file in S3
// //             Body: fileData, // File data
// //             ContentType: 'image/jpeg', // Content type of the file
// //             ACL: 'public-read', // Access control list
// //         };

// //         // Upload the file to S3
// //         s3.upload(params, (err, data) => {
// //             if (err) {
// //                 reject(err);
// //             } else {
// //                 resolve(data.Location);
// //             }
// //         });
// //     });
// // };

// // module.exports = uploadFileToS3;
