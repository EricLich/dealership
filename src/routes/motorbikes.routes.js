const express = require('express');
const motorbikesRouter = express.Router();
const motorbikesCtrl = require('../controllers/motorbikes.controller');
//BASIC CRUD

//CREATE
motorbikesRouter.post('/', motorbikesCtrl.createMotorbike);
//READ
motorbikesRouter.get('/', motorbikesCtrl.getMotorbikes);
//READ ONE
motorbikesRouter.get('/:id', motorbikesCtrl.getMotorbike);
//UPDATE
motorbikesRouter.put('/:id', motorbikesCtrl.updateMotorbike);
//DELETE
motorbikesRouter.delete('/:id', motorbikesCtrl.deleteMotorbike);

module.exports = motorbikesRouter;