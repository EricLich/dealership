const express = require('express');
const employeesRouter = express.Router();
const employeesCtrl = require('../controllers/employees.controler');
//BASIC CRUD

//CREATE
employeesRouter.post('/', employeesCtrl.createEmployee);
//READ
employeesRouter.get('/', employeesCtrl.getEmployees);
//READ ONE
employeesRouter.get('/:id', employeesCtrl.getEmployee);
//UPDATE
employeesRouter.put('/:id', employeesCtrl.updateEmployee);
//DELETE
employeesRouter.delete('/:id', employeesCtrl.deleteEmployee);

module.export = employeesRouter;