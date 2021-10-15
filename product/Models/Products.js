const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    addedDate:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        required:true
    },
    sellerId:{
        type:String,
        required:true
    }
})

module.exports = Products = mongoose.model('products',ProductSchema);