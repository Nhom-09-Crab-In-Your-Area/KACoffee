
const express = require('express');
const userModel = require('../models/users_model');
const authenticationModel = require('../models/authentication_model');

let check_conflict = ()=>{
    //implement


};


module.exports = (app)=> {  
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.route('/addUser')
        .post((req, res)=> {
            try{

                let input = req.body;
                //insert Users collection
                //need to check conflict

                userModel.count({}, function( err, count){
                    if (err) throw err;
                    else{
                        let new_user = {
                            'name': input.body,
                            'email': input.email,
                            'phone': input.phone,
                            'address': input.address,
                            'userId': count
                        }
                    }  
                })
                
                //if not conflict
                //insert Authentication collection 
                if(!check_conflict()){
                    let new_au = {
                        'userId': new_user.userId,
                        'password': input.password
                    }
                    let save_user = new userModel(new_user);
                    save_user.save();
                    let save_au = new authenticationModel(new_au);
                    save_au.save();
                    res.send({'message': 'Inserted'});    
                }
                
                //if conflict 
                else{
                    res.send({'message': 'Already exist'});
                }
            }
            catch (err){
                res.status(500).send(error);
            }
            res.end();
        }
    )
};
