const mongoose = require('mongoose');
const model = mongoose.model;


const dealershipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employees: [{type: mongoose.Schema.Types.ObjectId}],
    clients: [{type: mongoose.Schema.Types.ObjectId}],
    garages: [{
        type: mongoose.Schema.Types.ObjectId
    }]
},{timestamps: true, versionKey:false});

const Dealership = model('Dealership', dealershipSchema);

module.exports = Dealership, dealershipSchema;