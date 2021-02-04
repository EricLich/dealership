const Car = require('../models/Car');
const globalValues = require('../global');

const carCtrl = {};

//BASIC CRUD
//CREATE
carCtrl.createCar = async (req, res) => {
    try{
        const carStatus = req.body.status === globalValues.carStatus.new || req.body.status === globalValues.carStatus.new;
        const carType = req.body.type === globalValues.carTypes.car || req.body.type === globalValues.carTypes.truck
        if(carStatus && carType){
            const car = await new Car(req.body);
            if(!car) return res.status(301).json({message: "Car not created"});
            car.save()
                .then(car => res.json({message: "car added"}))
                .catch(err => console.log(err));
        }else{
            return res.json({message: "Some of the values inserted are not valid"});
        }
    }catch(err){
        console.log(err)
    }    
}

//GET
carCtrl.getCars = async (req, res) => {
    try{
        const cars = await Car.find();
        if(!cars) return res.status(301).json({message: "No cars to add to inventory"});
        return res.send(cars);
    }catch(err){
        console.log(err);
    }
}

//GET ONE
carCtrl.getCar = async (req, res) => {
    try{
        const car = await Car.findById(req.params.id);
        if(!car) return res.status(301).json({message: "Car does not exist in cargo to ship"});
        return res.send(car);
    }catch(err){
        console.log(err);
    }
}

//UPDATE
carCtrl.updateCar = async (req, res) => {
    try{
        const car = await Car.findByIdAndUpdate(req.params.id, req.body);
        if(!car) return res.status(301).json({message: "Car does not exist"});
        return res.json({message: "Car updated"});                              
    }catch(err){
        console.log(err);
    }
}

//DELETE
carCtrl.deleteCar = async (req, res) => {
    try{
        const car = await Car.findByIdAndDelete(req.params.id);
        if(!car) return res.status(301).json({message: "Car does not exist"});
        return res.json({message: "Car deleted from pre-inventory"})        ;
    }catch(err){
        console.log(err);
    }
}

module.exports = carCtrl;