const { getFile } = require('./GetFileService');
const { createFile } = require('./CreateFileService');
const { deleteFile } = require('./DeleteFileService');


module.exports = {
  getFile,
  createFile,
  deleteFile
};
