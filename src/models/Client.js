const mongoose = require('mongoose');
const model = mongoose.model;

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required:true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    vehicles: [{
        type: String
    }]
}, {timestamps: true, versionKey: false});

const Client = model('Client', clientSchema);

module.exports = {
    Client: Client,
    clientSchema: clientSchema
}