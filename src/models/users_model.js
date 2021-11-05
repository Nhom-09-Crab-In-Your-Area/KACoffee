const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema({
    'email': {type: String, default: '' },
    'name': {    
        'first name': {type: String, default: ''},
        'last name': {type: String, default:''}
    },
    'phone': {type: String, default:'' },
    'userID': {type: String, default: ''}
}, {collection: 'Users'});

userSchema.index({email:1});
module.exports = mongoose.model('Users', userSchema);