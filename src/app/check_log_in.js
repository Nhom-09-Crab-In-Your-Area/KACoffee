const express = require('express');
const authentication = require('../models/authentication_model')
const users = require('../models/users_model');
let check = (info) =>{
   
}

module.exports = (app)=> {  
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.route('/checkLogin')
        .post((req, res)=> {
            try{
                //check log in info

                
            }
            catch (err){
                res.status(500).send(error);
            }
            res.end();
        }
    )
};
