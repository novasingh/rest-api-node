const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const httpStatus = require('http-status');
const { s3Bucket, s3Region, s3AccessKey, s3SecretAccessKey } = require('../config/config');

// Initialize S3 Client
const s3 = new S3Client({
  region: s3Region,
  credentials: {
    accessKeyId: s3AccessKey,
    secretAccessKey: s3SecretAccessKey,
  },
});

const upload = async (req, res) => {
  const inputFile = req.file; // Ensure this is correctly populated by multer

  if (!inputFile) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Please upload a logo' });
  }

  const key = `logos/${new Date().getTime()}_${inputFile.originalname}`;

  const params = {
    Bucket: s3Bucket, // Your bucket name
    Key: key, // Use originalname for the file name
    Body: inputFile.buffer, // Use buffer for the file data
    ContentType: inputFile.mimetype, // Content type
  };

  try {
    // Use PutObjectCommand to upload the file
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const logoUrl = `https://${s3Bucket}.s3.${s3Region}.amazonaws.com/${key}`; // Construct the URL

    return logoUrl;
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error uploading logo to S3' });
  }
};

module.exports = {
  upload,
};
