const express = require('express');
const dealershipsRouter = express.Router();
const dealershipsCtrl = require('../controllers/dealerships.controller');


/////////////////////////////////////////////////////////
//                     DELAERSHIPS                    //
///////////////////////////////////////////////////////
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


/////////////////////////////////////////////////////////
//                     CLIENTS                        //
///////////////////////////////////////////////////////
//CREATE
dealershipsRouter.post('/:dealership_id/add-client/', dealershipsCtrl.createClient);
//READ
dealershipsRouter.get('/:dealership_id/get-clients', dealershipsCtrl.getClients);
//READ ONE
dealershipsRouter.get('/:dealership_id/get-client/:client_id', dealershipsCtrl.getClient);
//UPDATE
dealershipsRouter.put('/:dealership_id/update-client/:client_id', dealershipsCtrl.updateClient);
//DELETE
dealershipsRouter.delete('/:dealership_id/delete-client/:client_id', dealershipsCtrl.deleteClient);


/////////////////////////////////////////////////////////
//                     EMPLOYEES                      //
///////////////////////////////////////////////////////
//CREATE
dealershipsRouter.post('/:dealership_id/add-employee', dealershipsCtrl.createEmployee);
//READ
dealershipsRouter.get('/:dealership_id/get-employees', dealershipsCtrl.getEmployees);
//READ ONE
dealershipsRouter.get('/:dealership_id/get-employee/:employee_id', dealershipsCtrl.getEmployee);
//UPDATE
dealershipsRouter.put('/:dealership_id/update-employee/:employee_id', dealershipsCtrl.updateEmployee);
//DELETE
dealershipsRouter.delete('/:dealership_id/delete-employee/:employee_id', dealershipsCtrl.deleteEmployee);


module.exports = dealershipsRouter;