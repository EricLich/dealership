const express = require('express');
const clientsRouter = express.Router();
const clientsCtrl = require('../controllers/clients.controller');
//BASIC CRUD

//CREATE
clientsRouter.post('/', clientsCtrl.createClient);
//READ
clientsRouter.get('/', clientsCtrl.getClients);
//READ ONE
clientsRouter.get('/:id', clientsCtrl.getClient);
//UPDATE
clientsRouter.put('/:id', clientsCtrl.updateClient);
//DELETE
clientsRouter.delete('/:id', clientsCtrl.deleteClient);

module.exports = clientsRouter;