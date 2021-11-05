const mongoose = require('mongoose');
const Schema = mongoose.Schema

let authenticationdSchema = new Schema({
    'userId': {type: String, default: ''},
    'password': {type: String, default: ''}
}, {collection: 'Authentication'} );


authenticationdSchema.index({'userId': 1})
module.exports = mongoose.model('Authentication', authenticationdSchema);


