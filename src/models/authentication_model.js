const mongoose = require('mongoose');
const Schema = mongoose.Schema

let authenticationdSchema = new Schema({
    'userId': {type: String, default: ''},
    'password': {type: String, default: ''}
}, {collection: 'Authentication'} );



module.exports = mongoose.model('Authentication', authenticationdSchema);


