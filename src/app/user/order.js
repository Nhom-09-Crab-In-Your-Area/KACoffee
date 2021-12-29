const cart_model = require("../../models/cart_model")
const user_model = require("../../models/users_model")
const order_model = require("../../models/order_model")

const PERCENT = 0.03
const rankList = [0, 300000, 800000, 1500000]

async function createOrder(req,res){
    try{
        const {id_cart, address, point_used, voucher} = req.body
        if(id_cart == null){
            return res.send(JSON.stringify("Shopping cart is empty!"))
        }
        const cart = await cart_model.findById(id_cart)
        const id_user = cart.user
        let status, typeOrder, idAccount = req.session.idAccount
        // set up attribute's order
        if(req.session.AccountType == "Customer") {
            status = "Verifying"
            idAccount = undefined // là khách hàng thì chưa gán employee
            typeOrder = 1 // 0 means offline, 1 means online
        }
        else{
            status = "Completed"
            typeOrder = 0
        }

        // create order
        let order = await order_model.create({
            user: id_user,
            products: cart.products,
            storeID: cart.storeID,
            price: cart.priceTotal,
            point_used: Number(point_used),
            status: status,
            type: typeOrder,
            NbItem: cart.NbItem,
            employee: idAccount,
            address: address,
        })

        // update user info
        if(id_user != null){ 
            const user = await user_model.findById(id_user)
            await user.orders.push(order._id)
            
            // nếu như cancel thì cần back lại giá trị cũ
            // update total money
            user.totalMoney += (order.price - order.point_used)
            user.NbItem += order.NbItem
            // update point 
            var pointBonus = Math.floor(PERCENT*order.price/1000)*1000
            //console.log(pointBonus)
            user.point += (pointBonus - Number(order.point_used))
            // update rank
            for(var i = rankList.length - 1; i >= 0; --i){
                if(user.totalMoney > rankList[i]){
                    user.rank = i
                    break
                }
            }
            
            await user.save()
        }

        res.status(200).send(order)
    }
    catch(err){
        res.json(err)
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
        res.json(err)
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
            // update order
            order.status = "Canceled"
            res.send(JSON.stringify("Your order canceled!"))
            await order.save()

            // update user
            var user = await user_model.findById(order.user)

            // update total money
            user.totalMoney -= (order.price - order.point_used)
            user.NbItem -= order.NbItem
            // update point 
            var pointBonus = Math.floor(PERCENT*order.price/1000)*1000
            //console.log(pointBonus)
            user.point -= (pointBonus - Number(order.point_used))
            // update rank
            for(var i = rankList.length - 1; i >= 0; --i){
                if(user.totalMoney > rankList[i]){
                    user.rank = i
                    break
                }
            }

            await user.save()
            res.send(JSON.stringify("Your order canceled!"))
        }
        else{
            res.send(JSON.stringify("Your order can not cancel!"))
        }
    }
    catch(err){
        throw err
    }
}


async function receivedOrder(req, res){
    try{
        const {id_order} = req.body
        const order = await order_model.findById(id_order)
        order.status = "Completed"
        res.send(JSON.stringify("Order completed!"))
    }
    catch(err){
        res.json(err)
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
    app.get("/order/received", (req,res) => {
        receivedOrder(req,res)
    })
}
