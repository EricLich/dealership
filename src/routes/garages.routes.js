const express = require('express');
const garagesRouter = express.Router();
const garagesCtrl = require('../controllers/garages.controller');
//BASIC CRUD

//CREATE
garagesRouter.post('/', garagesCtrl.createGarage);
//READ
garagesRouter.get('/', garagesCtrl.getGarages);
//READ ONE
garagesRouter.get('/:id', garagesCtrl.getGarage);
//UPDATE
garagesRouter.put('/:id', garagesCtrl.updateGarage);
//DELETE
garagesRouter.delete('/:id', garagesCtrl.deleteGarage);

module.exports = garagesRouter;