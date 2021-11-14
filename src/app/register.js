
const express = require('express');
const userModel = require('../models/users_model');
const authenticationModel = require('../models/authentication_model');
account_type = function(route){
    if(route == '/addCustomer') return 'Customer';
    if(route == '/addAdmin') return 'addAdmin';
    if(route == '/addEmployee') return 'Employee';
}
regis_route = function (app, route){
    app.route(route)
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
                                'address': info.address,
                                'account type': account_type(route)
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

}


module.exports.addCusomer = (app)=> {  
    regis_route(app, '/addCustomer');
    regis_route(app, '/addEmployee');
    regis_route(app, '/addAdmin');
};
