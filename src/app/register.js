
const express = require('express');
const userModel = require('../models/users_model');
const authenticationModel = require('../models/authentication_model');

let email_check = false;
let phone_check = false;
let check_conflict = (info)=>{
    userModel.find({'email': info.email}, (err, email)=>{
        if (err) throw err;
        if (email != null) email_check = true;
    });
    userModel.find({'phone': info.phone}, (err, phone)=>{
        if (err) throw err;
        if (phone != null) phone_check = true;
    });
};


module.exports = (app)=> {  
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.route('/addUser')
        .post((req, res)=> {
            try{
                let account = req.body;
                check_conflict(account);
                //check email
                if (email_check){
                    res.send('email existed');
                }
                //check phone
                if (phone_check){
                    res.send('phone existed');
                }
                if(!phone_check && !email_check){
                    //insert Users collection
                    userModel.create({
                        'last name': account['last name'],
                        'first name': account['first name'],
                        'phone': account.phone,
                        'email': account.email,
                        'address': account.address
                    });

                    //insert Authentication collection
                    authenticationModel.create({
                        'email': account.email,
                        'password': account.password
                    })

                    res.send('account added');
                }
                email_check = false;
                phone_check = false;
            }
            catch (err){
                res.status(500).send(err);
            }
        }
    )
};
