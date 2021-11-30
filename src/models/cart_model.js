const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users_model"
    },
    productList: [{
        type: Schema.Types.ObjectId,
        ref: "product_model"
    }]
})

module.exports = mongoose.model('Shopping Cart', cartSchema)