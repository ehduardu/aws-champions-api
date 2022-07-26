const { Router } = require ('express');
const FilesController = require('../controllers/FilesController');

const publicRouter = Router();
const filesController = new FilesController();

publicRouter.post('/cloud', filesController.create);
publicRouter.get('/cloud/:filename', filesController.show);
publicRouter.delete('/cloud/:filename', filesController.delete);


module.exports = publicRouter;
