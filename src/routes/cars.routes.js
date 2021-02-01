const carsRouter = require('./router');
const carCtrl = require('../controllers/cars.controller');
//BASIC CRUD

//CREATE
carsRouter.post('/', carCtrl.createCar);
//READ
carsRouter.get('/', carCtrl.getCars);
//READ ONE
carsRouter.get('/:id', carCtrl.getCar);
//UPDATE
carsRouter.put('/:id', carCtrl.updateCar);
//DELETE
carsRouter.delete('/:id', carCtrl.deleteCar);