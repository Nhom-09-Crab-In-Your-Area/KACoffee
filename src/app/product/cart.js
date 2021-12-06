const cart_model = require("../../models/cart_model")
const user_model = require("../../models/users_model")
const product_model = require("../../models/product_model")

async function createCart (req, res){
    const {id_user, id_product} = req.body

    if(id_user == null)
        return res.send(JSON.stringify("id is null"))

    const new_cart = await cart_model.create({
        user: id_user,
    })
    if(id_product != null)
        new_cart.productList.append(id_product)

    await new_cart.save()
    // console.log(new_cart)
    const userById = await user_model.findById(id_user)
    await userById.updateOne({cart: new_cart})

    return res.json(new_cart);
}

async function viewCart(req, res){
    const {id_cart} = req.body
    if(id_cart == null)
        res.send(JSON.stringify("Shopping cart is empty!"))
    else{
        const cart = await cart_model.findById(id_cart).populate("productList")
        res.json(cart.productList)
    }

    // const {id_user} = req.body

    // const user = await user_model.findById(id_user).populate("cart")
    // res.json(user)
}

async function addProduct(req, res){
    const {id_cart, id_product} = req.body

    const cart = await cart_model.findByIdAndUpdate(
        id_cart,
        { $addToSet: {productList: id_product}},
        { new: true, useFindAndModify: false })

    res.json(cart)
}

async function deleteProduct(req, res){
    const {id_cart, id_product} = req.body

    const cart = await cart_model.findByIdAndUpdate(
        id_cart,
        {$pull: {productList: id_product}},
        { safe: true, upsert: true })

    res.json(cart)
}

async function deleteCart(req,res){
    const {id_user, id_cart} = req.body
    if(id_cart == null || id_user == null){
        res.send(JSON.stringify("Id is null"))
    }
    else{
        const user = await user_model.findById(id_user)
        user.cart = null
        await user.save()
        
        const cart = await cart_model.findByIdAndRemove(id_cart)

        res.json(user)
    }
}

module.exports = (app) =>{

    app.post("/cart/view", (req, res) => {
        viewCart(req,res)
    })
    app.post("/cart/create", (req, res) => {
        createCart(req,res)
    })
    app.put("/cart/add_product", (req, res) => {
        addProduct(req,res)
    })
    app.put("/cart/delete_product", (req, res) => {
        deleteProduct(req,res)
    })
    app.delete("/cart/delete_cart", (req, res) => {
        deleteCart(req,res)
    })
}