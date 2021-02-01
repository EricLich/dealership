const mongoose = require('mongoose');
const model = mongoose.model;

const garageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        max: 10
    }],
    adress: {
        type: String,
        requried: true
    }
},{timestamps: true, versionKey: true});

module.exports = model('Garage', garageSchema);
