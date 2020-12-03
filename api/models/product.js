const mongoose = require("mongoose")
const ObjectId = require('mongoose').ObjectId;



var Schema = mongoose.Schema;
const productSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: String,
    price: {type: Number, required: true},
    productimage:{type:String, required:true}
})

module.exports = mongoose.model('Tank', productSchema)