const cart_model = require("../../models/cart_model")
const user_model = require("../../models/users_model")
const order_model = require("../../models/order_model")


async function createOrder(req,res){
    try{
        const {id_cart} = req.body
        if(id_cart == null){
            res.send(JSON.stringify("Shopping cart is empty!"))
        }

        let status, typeOrder = 1, idAccount = req.session.idAccount

        if(req.session.AccountType == "Customer") {
            status = "Verifying"
            idAccount = undefined // là khách hàng thì chưa gán employee
        }
        else status = "Processing"

        const cart = await cart_model.findById(id_cart)
        const id_user = cart.user
        if(id_user == null) typeOrder = 0 // 0 means offline, 1 means online
        let order = await order_model.create({
            user: id_user,
            products: cart.products,
            storeID: cart.storeID,
            price: cart.priceTotal,
            status: status,
            type: typeOrder,
            employee: idAccount
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

// Trả về tất cả đơn hàng của khách hàng
async function viewOrder(req,res){
    try{
        const id_user = req.session.idAccount
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
        // res.json(user)
    }
    catch(err){
        throw err
    }

}

// khách hàng xóa đơn hàng đang ở trạng thái verifying
async function cancelOrder(req,res){
    try{
        const {id_order} = req.body
        if(id_order == null){
            res.send(JSON.stringify("Id order is null"))
        }
        const order = await order_model.findById(id_order)
        if(order.status == "Verifying"){
            order.status = "Canceled"
            res.send(JSON.stringify("Your order canceled!"))
            await order.save()
        }
        else{
            res.send(JSON.stringify("Your order can not cancel!"))
        }
    }
    catch(err){
        throw err
    }
}

module.exports = (app) => {
    app.get("/order/view", (req,res) => {
        viewOrder(req,res)
    })
    app.post("/order/create", (req,res) => {
        createOrder(req,res)
    })
    app.put("/order/cancel", (req,res) => {
        cancelOrder(req,res)
    })
}
