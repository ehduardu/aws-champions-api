const AWS = require('aws-sdk');
const { BUCKET_NAME } = process.env;

/**
 * 
 * @param {AWS.S3} s3 
 */
const deleteFile = async (s3, filename) => {
  const statusCode = 204;

  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: filename,
  };

  try {
    await s3.deleteObject(bucketParams).promise();
    console.log('Arquivo deletado', filename);
  } catch (err) {
    console.log('Falha ao deletar arquivo', err);
    statusCode = 500;
  }

  return statusCode;
}; 

module.exports = { deleteFile };