const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users"
    },
    products: [{
        info: {type: Schema.Types.String, ref: "Product"},
        size: {type: String, enum: ["S","M","L"], default: "S"},
        sugar_level: {type: Number, enum: [0,30,50,70,100], default: 100},
        ice_level: {type: Number, enum: [0,30,50,70,100], default: 100},
        amount: {type: Number, default: 1, min: 1}
    }],
    storeID: {type: Schema.Types.String, default: "1"},
    employee: {type: Schema.Types.ObjectId, ref: "Employees"},
    createAt: {type: Date, default: Date.now},
    status: {
        type: String, 
        enum: ["Pending Payment","Canceled","Payment Received","Processing","Shipping","Complete"],
        default: "Payment Received"
    },
    price: {type: Number},
})

module.exports = mongoose.model("Order", orderSchema)