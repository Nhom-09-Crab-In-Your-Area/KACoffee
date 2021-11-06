const express = require('express');
const authenticationModel = require('../models/authentication_model')

module.exports = (app)=> {  
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.route('/checkLogin')
        .post((req, res)=> {
            try{
                //check log in info  
                authenticationModel.find({'email': req.body.email}, (err, account)=>{
                    if (err) throw err;
                    if (account == null) res.send('email not exist');
                    else{
                        if (account.password == req.body.password){
                            res.send('log in accepted');
                        }
                        else{
                            res.send('wrong password');
                        }
                    }
                })
            }
            catch (err){
                res.status(500).send(err);
            }
        }
    )
};
