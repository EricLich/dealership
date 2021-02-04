const Dealership = require('../models/Dealership');
const {Employee} = require('../models/Employee');
const {Client} = require('../models/Client');
const globalValues = require('../global');
const dealershipCtrl = {};

/////////////////////////////////////////////////////////
//                     DELAERSHIPS                    //
///////////////////////////////////////////////////////

//BASIC CRUD
//CREATE
dealershipCtrl.createDealership = async (req, res) => {
    try{
        const ds = await new Dealership(req.body);
        ds.save()
            .then(ds => res.send({message: "Dealership added to db"}))
            .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

//GET
dealershipCtrl.getDealerships = async (req, res) => {
    try{
        const ds = await Dealership.find();
        if(ds.length == 0) return res.status(301).json({message: "No dealerships in DB"});
        return res.send(ds);
    }catch(err){
        console.log(err);
    }
}

//GET ONE
dealershipCtrl.getDealership = async (req, res) => {
    try{
        const ds = await Dealership.findById(req.params.id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist in db"});
        return res.send(ds);
    }catch(err){
        console.log(err)
    }
}

//UPDATE
dealershipCtrl.updateDealership = async (req, res) => {
    try{
        const ds = await Dealership.findByIdAndUpdate(req.params.id, req.body)
                                    .then(ds => res.send(ds))
                                    .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

//DELETE
dealershipCtrl.deleteDealership = async (req, res) => {
    try{
        const ds = await Dealership.findByIdAndDelete(req.params.id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist in db"});
        return res.send({message: "Dealership deleted"});
    }catch(err){
        console.log(err);
    }
}

/////////////////////////////////////////////////////////
//                     CLIENTS                        //
///////////////////////////////////////////////////////

dealershipCtrl.createClient = async (req, res) => {
    try{
        if(Object.keys(req.body).length === 0){
            return res.send({message: "Insert client data"});
        }else{
            const ds = await Dealership.findById(req.params.dealership_id)
            if(ds){
                const type = req.body.type === globalValues.clientTypes.company || req.body.type === globalValues.clientTypes.individual;
                if(type){
                    const client = await new Client(req.body);
                    client.save()
                          .then(client => {
                              if(!client) res.status(301).json({message: "Could not create client"});
                              ds.clients.push(client._id);
                              ds.save()
                                .then(db => res.send({message: "Client added to db"}))
                                .catch(err => console.log(err))
                          })
                          .catch(err => console.log(err));
                }else{
                    return res.send({message: "Insert a valid client type"});
                }
            }else{
                return res.send({message: "Dealership does not exist"});
            }
        }
    }catch(err){
        console.log(err);
    }
}

//GET
dealershipCtrl.getClients = async (req, res) => {
    try{
        const ds = await Dealership.findById(req.params.dealership_id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist"});
        if(ds.clients.length > 0){
            let clients = await getAllClients(ds);
            return res.json(clients);
        }else{
            return res.send({message: "No clients in Dealership DB"});
        }
    }catch(err){
        console.log(err);
    }
}

const getAllClients = async (ds) => {
    let clients = [];
    for(let clientId of ds.clients){
        let client = await Client.findById(clientId);
        clients.push(client);
    }
    return clients;
}

//GET ONE
dealershipCtrl.getClient = async (req, res) => {
    try{
        const ds = await Dealership.findById(req.params.dealership_id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist"});
        if(ds.clients.length > 0){
            const findClient = (client_id, index) =>{
                return client_id == ds.clients[index];
            }    
            const clientIndex = ds.clients.findIndex(findClient);
            if(clientIndex > -1){
                const client = await Client.findById(req.params.client_id);
                if(!client) return res.status(301).json({message: "Client does not exist in clients db"});
                return res.json(client);
            }else{
                return res.send({message: "Client does not exist"});
            }
        }else{
            return res.send({message: "No clients added to the dealership"});
        }
    }catch(err){
        console.log(err);
    }
}

//UPDATE
dealershipCtrl.updateClient = async (req, res) => {
    try{
        const ds = await Dealership.findById(req.params.dealership_id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist"});
        if(ds.clients.length > 0){ 
            const clientIndex = await searchClient(req.params.client_id, ds);
            if(clientIndex > -1){
                const client = await Client.findByIdAndUpdate(req.params.client_id, req.body);
                if(!client) return res.status(301).json({message: "Client does not exist in clients db"});
                return res.json({message: "Client updated"});
            }else{
                return res.send({message: "Client does not exist"});
            }
        }else{
            return res.send({message: "No clients added to the dealership"});
        }
    }catch(err){
        console.log(err);
    }
}

const searchClient = async (client_id, ds) => {
    let i = 0;
    let found = false;
    while(i < ds.clients.length && !found){
        if(client_id == ds.clients[i]){
            found = true;
            return i;
        }else{
            i++;
        }
    }
    if(!found){
        return -1;
    }
}

//DELETE
dealershipCtrl.deleteClient = async (req, res) => {
    try{
        const ds = await Dealership.findById(req.params.dealership_id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist"});
        if(ds.clients.length > 0){

            const clientIndex = await searchClient(req.params.client_id, ds);
            if(clientIndex > -1){
                ds.clients.splice(clientIndex, 1);
                ds.save();
                return res.json({message: "Client deleted from dealership"});
            }else{
                return res.send({message: "Client does not exist"});
            }
        }else{
            return res.send({message: "No clients added to the dealership"});
        }
    }catch(err){
        console.log(err);
    }
}


/////////////////////////////////////////////////////////
//                     EMPLOYEES                      //
///////////////////////////////////////////////////////
dealershipCtrl.createEmployee= async (req, res) => {
    try{
        if(Object.keys(req.body).length === 0){
            return res.send({message: "Insert employee data"});
        }else{
            const ds = await Dealership.findById(req.params.dealership_id);
            if(!ds) {
                return res.status(301).json({message: "Dealership does not exist"});
            }else{
                const role = checkRole(req.body.role);
                if(role){
                    const employee = await new Employee(req.body);
                    employee.save();
                    ds.employees.push(employee._id);
                    ds.save();
                    return res.send({message: "Employee added to db"});
                }else{
                    return res.send({message: "Insert a valid role"});
                }
            }
        }
    }catch(err){
        console.log(err);
    }
}

const checkRole = (role) => {
    return role == globalValues.employeeRoles.cleaning 
                || role == globalValues.employeeRoles.maintainance
                || role == globalValues.employeeRoles.seller
                || role == globalValues.employeeRoles.admin
                || role == globalValues.employeeRoles.manager
                || role == globalValues.employeeRoles.technician 
}

//GET
dealershipCtrl.getEmployees = async (req, res) => {
    try{
        const ds = await Dealership.findById(req.params.dealership_id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist"});
        if(ds.clients.length > 0){
            let employees = await getAllEmployees(ds);
            return res.json(employees);
        }else{
            return res.send({message: "No clients added to the dealership"});
        }
    }catch(err){
        console.log(err);
    }
}

const getAllEmployees = async (ds) => {
    let employees = [];
    for(let employee_id of ds.employees){
        let employee = await Employee.findById(employee_id);
        employees.push(employee);
    }
    return employees;
}

//GET ONE
dealershipCtrl.getEmployee = async (req, res) => {
    try{
        const ds = await Dealership.findById(req.params.dealership_id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist"});
        if(ds.clients.length > 0){
            const employee = await Employee.findById(req.params.employee_id);
            if(!employee) return res.send({message: "Employee does not exist in db"})
            return res.json(employee);
        }else{
            return res.send({message: "No clients added to the dealership"});
        }
    }catch(err){
        console.log(err);
    }
}

//UPDATE
dealershipCtrl.updateEmployee = async (req, res) => {
    try{
        const ds = await Dealership.findById(req.params.dealership_id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist"});
        if(ds.clients.length > 0){
            let employeeIndex = searchEmployee(req.params.employee_id, ds);
            if(employeeIndex > -1){
                const employee = await Employee.findByIdAndUpdate(req.params.employee_id, req.body);
                if(!employee) return res.send({message: "Employee does not exist in db"});
                return res.send({message: "Employee updated"});
            }else{
                return res.send({message: "Employee not added to this dealership db"})
            }
        }else{
            return res.send({message: "No clients added to the dealership"});
        }
    }catch(err){
        console.log(err);
    }
}

const searchEmployee = async (employee_id, ds) => {
    let i = 0;
    let found = false;
    while(i < ds.employees.length && !found){
        if(employee_id == ds.employees[i]){
            found = true;
            return i;
        }else{
            i++;
        }
    }
    if(!found){
        return -1;
    }
}

//DELETE
dealershipCtrl.deleteEmployee = async (req, res) => {
    try{
        const ds = await Dealership.findById(req.params.dealership_id);
        if(!ds) return res.status(301).json({message: "Dealership does not exist"});
        if(ds.clients.length > 0){
            let employeeIndex = await searchEmployee(req.params.employee_id, ds);
            if(employeeIndex > -1){
                ds.employees.splice(employeeIndex, 1);
                ds.save();
                return res.send({message: "Employee deleted"});
            }else{
                res.send({message: "Employee does not exist in dealership"})
            }
        }else{
            return res.send({message: "No employees added to the dealership"});
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = dealershipCtrl;