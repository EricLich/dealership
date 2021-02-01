const mongoose = require('mongoose');
const model = mongoose.model;

const bikeSchema = new mongoose.Schema({
    model:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    cc:{
        type:Number,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, {timestamps: true, versionKey: false});

module.exports = model('Motorbike', bikeSchema);