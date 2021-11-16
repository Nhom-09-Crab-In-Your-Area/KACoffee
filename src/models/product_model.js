const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)

let ProductSchema = new Schema(
    {
        _id: {type: Number,},
        //id: {type: String},
        name: {type: String, require: true},
        price: {type: String, require: true},
        type: {type: String},
        image: {type: String},
        rateLevel: {type: Number, default: 0},
        rateNumber: {type: Number, default: 0}
    }, 
    {
        _id: false,
    },
    {
        collection: 'Product'
    })

ProductSchema.plugin(AutoIncrement)

module.exports = mongoose.model('Product', ProductSchema)