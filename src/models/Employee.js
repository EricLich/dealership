const mongoose = require('mongoose');
const model = mongoose.model;

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required: true
    },
    salary: {
        type: Number,
        requierd: true
    },
    dealerships: [{
        type: mongoose.Schema.Types.ObjectId
    }]
}, {timestamps: true, versionKey: false});

const Employee = model('Employee', employeeSchema);

module.exports = {
    Employee: Employee,
    employeeSchema: employeeSchema
}
