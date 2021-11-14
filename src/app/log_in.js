const express = require('express');
const authenticationModel = require('../models/authentication_model')

module.exports = (app)=> {  
    app.route('/log_in')
        .post((req, res)=> {
            try{
                //check log in info  
                authenticationModel.findOne({'email': req.body.email}, (err, account)=>{
                    if (err) throw err;
                    if (account == null) res.send('email not exist');
                    else{
                        if (account.password == req.body.password){
                            req.session.UserEmail = req.body.email;
                            req.session.UserType = null;
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
