const AWS = require('aws-sdk');
const { BUCKET_NAME } = process.env;

/**
 * 
 * @param {AWS.S3} s3 
 */
const getFile = async (s3, filename) => {
  const response = {
    status: 404,
    file: undefined
  };

  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: filename,
  };

  try {
    const bufferFile = await s3.getObject(bucketParams).promise();
    const file = JSON.parse(bufferFile.Body.toString('utf-8'));
    console.log('Arquivo encontrado', file);

    response.file = file;
    response.status = 200;
  } catch (err) {
    if (err.name === 'NoSuchKey') {
      console.log('Arquivo não encontrado');
    } else{
      console.log('Falha ao buscar arquivo', err);
      response.status = 500;
    } 
  }

  return response;
}; 

module.exports = { getFile };