const userModel = require("../models/users_model")

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
    userModel.findById({_id : req.body.id}, function(err, user){
        if(err){
            res.status(500).json(err)
        }
        else{
            res.json(user)
        }
    })
}

module.exports = function(app){
    // dev
    app.get("/data/all", function(req,res){
        getAllInfo(res)
    })

    app.post("/data/getById", function(req,res){
        getInfo(req,res)
    })

    app.put("/data/edit", function(req,res){
        var info = req.body
        if(!info.id){
            return res.status(500).send("ID is required")
        }
        else{
            userModel.findOne({'phone': info.phone}, function(err, account){
                if(err) res.status(500).json(err)
                else if(account != null) res.send("Phone exists")
                else{
                    userModel.update(
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
