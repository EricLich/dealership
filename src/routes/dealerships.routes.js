const express = require('express');
const dealershipsRouter = express.Router();
const dealershipsCtrl = require('../controllers/dealerships.controller');
//BASIC CRUD

//CREATE
dealershipsRouter.post('/', dealershipsCtrl.createDealership);
//READ
dealershipsRouter.get('/', dealershipsCtrl.getDealerships);
//READ ONE
dealershipsRouter.get('/:id', dealershipsCtrl.getDealership);
//UPDATE
dealershipsRouter.put('/:id', dealershipsCtrl.updateDealership);
//DELETE
dealershipsRouter.delete('/:id', dealershipsCtrl.deleteDealership);

module.exports = dealershipsRouter;