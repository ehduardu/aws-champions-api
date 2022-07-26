const AWS = require('aws-sdk');
const {request, response} = require('express');
const { getFile, createFile, deleteFile } = require('../../services');

/**
 * FilesController
 * É responsável por manipular as requisições relacionadas aos arquivos JSON
 */
class FilesController  {

  constructor(){
    AWS.config.update({ region: 'us-east-1' });
  }

  /**
   * FilesController.create()
   * @description Salva como novo arquivo no S3 bucket
   * @param {request} request 
   * @param {response} response
   */
  create = async (request, response) => {
    const s3 = new AWS.S3();
    const { body } = request;
    
    if(!body.filename){
      return response.status(400).send();
    }

    const {filename, status} = await createFile(s3, body);

    return response.status(status).send({ filename });
  };

  /**
   * FilesController.show()
   * @description Busca e retorna um arquivo do S3 bucket
   * @param {request} request 
   * @param {response} response 
   */
  show = async (request, response) => {
    const s3 = new AWS.S3();
    const { filename } = request.params;

    const { file, status } = await getFile(s3, filename);

    return response.status(status).send(file);
  };

   /**
   * FilesController.delete()
   * @description Apaga um arquivo do S3 bucket
   * @param {request} request 
   * @param {response} response 
   */
  delete = async (request, response) => {
    const s3 = new AWS.S3();
    const { filename } = request.params;

    let { status } = await getFile(s3, filename);

    if(status === 404){
      return response.status(status).send();
    }

    status  = await deleteFile(s3, filename);
    return response.status(status).send();
  };
}

module.exports = FilesController;
