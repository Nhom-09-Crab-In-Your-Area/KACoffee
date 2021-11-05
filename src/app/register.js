
const express = require('express');
const userModel = require('../models/users_model');
const authentication = require('../models/authentication_model');
module.exports = (app)=> {  
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.route('/addUser')
        .post((req, res)=> {
            try{
                //insert Users collection

                //insert Authentication collection 

                console.log('Inserted new user');
            }
            catch (err){
                res.status(500).send(error);
            }
            res.end();
        }
    )
};
