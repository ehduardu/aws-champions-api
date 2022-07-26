const { Router } = require ('express');
const publicRouter = require('./public');

const routes = Router();

routes.use('/', publicRouter);

module.exports = routes;
