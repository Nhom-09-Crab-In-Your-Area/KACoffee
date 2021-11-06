
const express = require('express');
const userModel = require('../models/users_model');
const authenticationModel = require('../models/authentication_model');

module.exports = (app)=> {  
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.route('/addUser')
        .post((req, res)=> {
            
            try{
                let info = req.body;
                //check email
                userModel.findOne({'email': info.email}, (err, account)=>{
                    
                    if (err) throw err;
                    if (account != null) res.send('email existed');
                    else{
                        //check phone
                        userModel.findOne({'phone': info.phone}, (err, account)=>{
                            if (err) throw err;
                            if (account != null) res.send('phone existed');
                            else{
                                //insert Users collection
                            userModel.create({
                                'last name': info['last name'],
                                'first name': info['first name'],
                                'phone': info.phone,
                                'email': info.email,
                                'address': info.address
                            });

                            //insert Authentication collection
                            authenticationModel.create({
                                'email': info.email,
                                'password': info.password
                            })

                            res.send('account added');
                            }
                        });
                    }
                });

            }
            catch (err){
                res.status(500).send(err);
            }
        }
    )
};
