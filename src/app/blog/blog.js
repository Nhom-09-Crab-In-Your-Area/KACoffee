'use strict'

const blogModel = require('../../models/blog_model')

function create(req,res){
    if(req.session['account type'] == 'Admin' || req.session['account type'] == 'Customer'){
        const {title, content, image} = req.body
        // productModel.findOne({'id': id}, function(err, product){
        //     if(err){
        //         res.status(500).json(err)
        //     }
        //     else if(product != null){
        //         res.send("Product id existed")
        //     }
            // else{
        blogModel.create({
            //id,
            title,
            content,
            image
        })
        res.send(JSON.stringify("created"))
    //         }
    //     })
    }
    else{
        res.send(JSON.stringify('Only admin and employees can create products'))
    }
}

function displayAll(req,res){
    blogModel.find((err,blog) => {
        if(err){
            res.status(500).json(err)
        }
        else{
            res.json(blog)
        }
    })
}

function display(req,res){
    const {name} = req.body
    if(name != null){
        blogModel.findOne({name: name}, (err, blog) => {
            if(err){
                res.status(500).json(err)
            }
            else if(blog == null){
                res.send(JSON.stringify("Not found"))
            }
            else{
                res.json(blog)
            }
        })
    }
    else{
        displayAll(req,res)
    }
}
module.exports = (app) => {
    app.post('/blog/create', (req,res) => {
        create(req,res)
    })
    app.post('/blog/view', (req,res) => {
        display(req,res)
    })
    app.get('/blog/view', (req,res) => {
        displayAll(req,res)
    })
}