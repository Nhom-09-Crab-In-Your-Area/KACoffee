const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    productList: [{
        type: Schema.Types.String,
        ref: "Product"
    }]
})

module.exports = mongoose.model('Shopping Cart', cartSchema)