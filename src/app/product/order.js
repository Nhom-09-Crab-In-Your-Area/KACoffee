const cart_model = require("../../models/cart_model")
const user_model = require("../../models/users_model")
const order_model = require("../../models/order_model")

async function createOrder(req,res){
    try{
        const {id_cart} = req.body
        if(id_cart == null){
            res.send(JSON.stringify("Shopping cart is empty!"))
        }

        const cart = await cart_model.findById(id_cart)
        const id_user = cart.user
        let order = await order_model.create({
            user: id_user,
            products: cart.products,
            storeID: cart.storeID,
            status: "Payment Received",
            price: cart.price
        })
        await user_model.findByIdAndUpdate(
            id_user,
            {$addToSet: {orders: order._id}},
            {new: true, useFindAndModify: false})
        
        res.status(200).send(JSON.stringify("Order created!"))
    }
    catch(err){
        throw err
    }
}

async function viewOrder(req,res){
    try{
        const {id_user} = req.body
        if(id_user == null){
            res.send(JSON.stringify("Id user is null!"))
        }

        //case 1
        const user = await user_model.findById(id_user).populate({
            path: 'orders',
            populate: {
                path: 'products.info',
                model: 'Product'
            }
        })
        res.json(user.orders)

        // case 2
        // const user = await user_model.findById(id_user).populate("orders")
        // res.json(user.orders)
    }
    catch(err){
        throw err
    }

}

module.exports = (app) => {
    app.post("/order/view", (req,res) => {
        viewOrder(req,res)
    })
    app.post("/order/create", (req,res) => {
        createOrder(req,res)
    })
}