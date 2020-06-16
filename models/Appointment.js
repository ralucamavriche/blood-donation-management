const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const AppointmentSchema = new Schema({
    date: {
        type: Date,
        required: true
    }
});

module.exports = DAppointment = mongoose.model('appointment', AppointmentSchema);