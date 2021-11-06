const express = require('express');
const authenticationModel = require('../models/authentication_model')
const usersModel = require('../models/users_model');

let findId = (email) =>{
    let query = usersModel.find({'email': email});
    id = query.select('userId');
    return id;
}

let check_password = (info) =>{
   id = findId(info.email);
   if (id == null) return 'not exist';
   let query = authenticationModel.find({'email': email});
   password = query.select('password');
   if (password == info.password) return 'password correct';
   else return 'passpword not correct';
}

module.exports = (app)=> {  
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.route('/checkLogin')
        .post((req, res)=> {
            try{
                //check log in info  
                res.send(check_password(req.body));
            }
            catch (err){
                res.status(500).send(error);
            }
            res.end();
        }
    )
};
