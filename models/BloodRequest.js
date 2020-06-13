const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const BloodRequestSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    blood_type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    viewedBy: {
        type:[],
        default:[]
    },
    comments: {
        type:[],
        default:[]
    }
});

module.exports = BloodRequest = mongoose.model('request', BloodRequestSchema);