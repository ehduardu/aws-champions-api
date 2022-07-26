const AWS = require('aws-sdk');
const { BUCKET_NAME } = process.env;

/**
 * 
 * @param {AWS.S3} s3 
 */
const createFile = async (s3, jsonData) => {
  const response = {
    filename: `${jsonData.filename}.json`,
    status: 201
  };

  const bucketParams = {
    Bucket: BUCKET_NAME,
    Key: response.filename,
  };

  try {
    await s3.headObject(bucketParams).promise();

    console.log('Arquivo já existe');
    response.status = 409;
  } catch (err) {
    if (err.name === 'NotFound') {
      bucketParams.Body = JSON.stringify(jsonData);
      const result = await s3.putObject(bucketParams).promise();
      
      console.log('Arquivo json salvo com sucesso', result);
    } else{
      console.log('Falha ao salvar arquivo', err);
      response.status = 500;
    } 
  }

  return response;
}; 

module.exports = { createFile };