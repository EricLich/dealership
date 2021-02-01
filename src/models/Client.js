const mongoose = require('mongoose');
const model = mongoose.model;

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
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

module.exports = model('Client', clientSchema);