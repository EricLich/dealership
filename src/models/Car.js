const mongoose = require('mongoose');
const model = mongoose.model;

const carSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    hp:{
        type:Number,
        required:true
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

module.exports = model('Car', carSchema);