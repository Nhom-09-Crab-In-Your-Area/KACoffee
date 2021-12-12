const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users"},
    products: [{type: Schema.Types.String, ref: "Product"}],
    employee: {type: Schema.Types.ObjectId, ref: "Employees"},
    storeID: {type: String},
    createAt: {type: Date, default: Date.now},
    status: {type: String},
    price: {type: Number},
})

module.exports = mongoose.model("Order", orderSchema)