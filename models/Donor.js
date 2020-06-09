const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const DonorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    age: {
        type: Number,
        // required: true
    },
    weight: {
        type: Number,
        // required: true
    },
    phone_number: {
        type: Number,
        // required: true
    },
    createdBy:{
        type:String,
        required:false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Donor = mongoose.model('donor', DonorSchema);