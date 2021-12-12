const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users"
    },
    products: [{
        info: {type: Schema.Types.String, ref: "Product"},
        size: {type: String, enum: ["S","M","L"], default: "S"},
        sugar_level: {type: Number, enum: [0,30,50,70,100], default: 100},
        ice_level: {type: Number, enum: [0,30,50,70,100], default: 100},
        amount: {type: Number, default: 1}
    }],
    storeID: {type: Schema.Types.String},
})

module.exports = mongoose.model('Shopping Cart', cartSchema)