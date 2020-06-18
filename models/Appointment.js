const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const AppointmentSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    idDonor:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    }
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);