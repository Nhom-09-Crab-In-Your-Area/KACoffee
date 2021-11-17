const productModel = require('../../models/product_model')

function create(req,res){
    if(req.session['account type'] == 'Admin'){
        const {name, price, type, description, image} = req.body
        // productModel.findOne({'id': id}, function(err, product){
        //     if(err){
        //         res.status(500).json(err)
        //     }
        //     else if(product != null){
        //         res.send("Product id existed")
        //     }
            // else{
        productModel.create({
            //id,
            name,
            price,
            type,
            description,
            image
        })
        res.send(JSON.stringify("created"))
    //         }
    //     })
    }
    else{
        res.send(JSON.stringify('Only admin can create products'))
    }
}
function displayAll(req,res){
    productModel.find((err,product) => {
        if(err){
            res.status(500).json(err)
        }
        else{
            res.json(product)
        }
    })
}
function display(req,res){
    const {id, name, type} = req.body
    if(type != null){
        productModel.find({type: type}, (err, product) => {
            //console.log(product)
            if(err){
                res.status(500).json(err)
            }
            else if(product.length == 0){
                console.log("type not exist")
                res.status(404).json("type not exist")
            }
            else{
                res.json(product)
            }
        })
    }
    else if(name != null){
        productModel.find({name: name}, (err, product) => {
            if(err){
                res.status(500).json(err)
            }
            else if(product.length == 0){
                console.log("name not exist")
                res.status(404).json();
            }
            else{
                res.json(product)
            }
        })
    }
    else{
        displayAll(req,res)
    }
}
function remove(req,res){
    if(req.session['account type'] == 'Admin'){
        const {id, name} = req.body
        if(id == null){
            res.status(404).json();
        }
        else{
            productModel.findOne({_id: id}, (err, product) =>{
                if(err){
                    res.status(500).json(err)
                }
                else if(product == null){
                    console.log("Not found")
                    res.status(404).json();
                }
                else{
                    productModel.deleteOne({_id: id}, () =>{
                        res.send(JSON.stringify("deleted"))
                    })
                }
            })
        }
    }
    else{
        res.send(JSON.stringify('Only admin can create products'))
    }
}
module.exports = (app) => {
    app.post('/product/create', (req,res) => {
        create(req,res)
    })
    app.post('/product/view', (req,res) => {
        display(req,res)
    })
    app.get('/product/view', (req,res) => {
        displayAll(req,res)
    })
    app.post('/product/delete', (req,res) => {
        remove(req,res)
    })
}