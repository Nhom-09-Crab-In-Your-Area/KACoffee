const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema({
    'email': {type: String, default: '' },
    'first name': {type: String},
    'last name': {type: String},
    'phone': {type: String},
    'address': {type: String, default: ''},
    cart: {type: Schema.Types.ObjectId, ref: "Shopping Cart"}
}, {collection: 'Users'});

module.exports = mongoose.model('Users', userSchema);