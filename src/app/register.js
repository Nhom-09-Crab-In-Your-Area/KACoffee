
const express = require('express');
const userModel = require('../models/users_model');
const authenticationModel = require('../models/authentication_model');
const employeeModel = require('../models/employees_model');

account_type = function(route){
    if(route == '/addCustomer') return 'Customer';
    if(route == '/addEmployee') return 'Employee';
}
regis_route = function (app, route){
    app.route(route)
        .post((req, res)=> {
            
            try{
                let info = req.body;
                acc_type = account_type(route);
                if (acc_type == 'Customer'){
                    Model = userModel;
                } 
                if (acc_type == 'Employee'){
                    //check authority
                    if (req.session.account_type != 'Admin'){
                        res.send('Only Admin can create employee account');
                        return;
                    }
                    Model = employeeModel;
                }


                //check email
                Model.findOne({'email': info.email}, (err, account)=>{
                    
                    if (err) throw err;
                    if (account != null) res.send('email existed');
                    else{

                      
                        //check phone
                        Model.findOne({'phone': info.phone}, (err, account)=>{
                            if (err) throw err;
                            
                            
                            if (account != null) res.send('phone existed')
                            else{
                                //insert Users/Employees collection
                                new_account = {
                                    'last name': info['last name'],
                                    'first name': info['first name'],
                                    'phone': info.phone,
                                    'email': info.email,
                                    'address': info.address,
                                }

                                if(acc_type == 'Employee'){
                                    new_account['storeID'] = info.storeID;
                                    new_account['account type'] = 'Employee';
                                }
                                Model.create(new_account);
                            
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


module.exports = (app)=> {  
    regis_route(app, '/addCustomer');
    regis_route(app, '/addEmployee');
};
