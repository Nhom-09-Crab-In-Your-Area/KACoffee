const productModel = require('../../models/product_model')
function create(req,res){
    if(req.session['account type'] == 'Admin'){
        const {name, price, type, image} = req.body
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
            image
        })
        res.send("created")
    //         }
    //     })
    }
    else{
        res.send('Only admin can create products')
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
    const {name} = req.body
    if(name != null){
        productModel.findOne({name: name}, (err, product) => {
            if(err){
                res.status(500).json(err)
            }
            else if(product == null){
                res.send("Not found")
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
}