const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    productId:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
    addedDateTime:{
        type:Date,
        default:Date.now
    }
})

module.exports = Products = mongoose.model('carts',CartSchema);