const userModel = require("../models/users_model")
const employeeModel = require('../models/employees_model');
// admin
function getAllInfo(res){
    userModel.find(function(err, user){
        if(err){
            res.status(500).json(err)
        }
        else{
            res.json(user)
        }
    })
}

function getInfo(req, res){
    if(req.session['account type'] == 'Customer'){
        userModel.findOne({email : req.session.UserEmail}, function(err, account){
            if(err){
                res.status(500).json(err)
            }
            else if(account == null){
                res.redirect("/")
            }
            else{
                res.json(account)
            }
        })
    }
    else{
        employeeModel.findOne({email : req.session.UserEmail}, function(err, account){
            if(err){
                res.status(500).json(err)
            }
            else if(account == null){
                res.redirect("/")
            }
            else if(req.session['account type'] == 'Admin'){
                // personal info
                res.json(account)
                // employee info

            }
            else if(req.session['account type'] == 'Employee'){
                // personal info
                res.json(account)
                // phone and email's admin
                
            }
        })
    }
}

module.exports = function(app){
    // dev
    app.get("/account/all", function(req,res){
        getAllInfo(res)
    })

    app.get("/account/profile", function(req,res){
        getInfo(req,res)
    })

    app.put("/account/edit", function(req,res){
        var info = req.body
        if(!info.id){
            return res.status(500).send("ID is required")
        }
        else{
            userModel.findOne({'phone': info.phone}, function(err, account){
                if(err) res.status(500).json(err)
                else if(account != null) res.send("Phone exists")
                else{
                    userModel.updateOne(
                        {_id: info.id}
                        , {'address': info.address, 'phone': info.phone, 'last name': info['last name'], 'first name': info['first name'] }
                        , function(err, user){
                            if(err){
                                return res.status(500).json(err)
                            }
                            else{   
                                getInfo(req,res)
                            }
                        }
                    )
                }
            }) 
        }
    })

}
