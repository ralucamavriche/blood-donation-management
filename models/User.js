const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    donors_list: {
        type:[]
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        default:'admin'
    },
    idDonatorRole:{
        type:String,
        default:null
    },
    address:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:""
    }
});
// hospital account collection
module.exports = User = mongoose.model('user', UserSchema);