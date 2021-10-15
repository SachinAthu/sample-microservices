const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    registeredDate:{
        type:Date,
        default:Date.now
    }
})

module.exports = Users = mongoose.model('users',UserSchema);