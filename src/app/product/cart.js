const cart_model = require("../../models/cart_model")
const user_model = require("../../models/users_model")

async function viewCart(req, res){
    try{
        const {id_user} = req.body
        // click view cart: client-server has just id_user, hasn't id_cart
        const user = await user_model.findById(id_user)
        if(user == null)
            return res.send(JSON.stringify("Wrong id user!"))

        const id_cart = user.cart
        //res.json(user)
        if(id_cart == undefined || id_cart == null)
            res.send(JSON.stringify("Shopping cart is empty!"))
        else{
            const cart = await cart_model.findById(id_cart).populate({path: "products.info"})
            res.json(cart.products)
        }
    }catch(err){
        res.send(JSON.stringify("error"))
    }
}

async function addProduct(req, res){
    try{
        // dùng id_user bởi vì có thể chưa có id_cart
        var {id_user, id_product, size, sugar_level, ice_level, amount, storeID} = req.body

        if(id_user == null || id_product == null)
            return res.send(JSON.stringify("id user/ id product is null"))

        const user = await user_model.findById(id_user)
        let id_cart
        if(user.cart == undefined){
            let cart = await cart_model.create({
                user: id_user,
            })
            await user.updateOne({cart: cart})
            id_cart = cart.id
        }
        else{
            id_cart = user.cart
        }

        const cart = await cart_model.findById(id_cart)
        const products = cart.products
        const len = products.length
        for(var i = 0; i < len; i++){
            item = products[i]
            //console.log("i",i)
            if(item.info == id_product && item.size == size && item.sugar_level == sugar_level && item.ice_level == ice_level){
                //console.log("check")
                item.amount += Number(amount)
                await cart.save()
                return res.json(cart)
            }
        }

        await products.push({
                    info: id_product,
                    size: size,
                    sugar_level: sugar_level,
                    ice_level: ice_level,
                    amount: amount
                })//,{ new: true, useFindAndModify: false })
        await cart.save()
        return res.json(cart)
    }catch(err){
        throw err
    }
}

async function changeAmount(req, res){
    try{
        const {id_cart, id_item, amount} = req.body
        if(id_cart == null || id_item == null)
            return res.send(JSON.stringify("id_cart/id_item is null"))
        
        const cart = await cart_model.findById(id_cart)
        const item = cart.products.id(id_item)
        //console.log(item.amount)
        item.amount = amount
        await cart.save()

        return res.json(cart)
    }catch(err){
        res.send(JSON.stringify("error"))
    }
}

async function changeSize(req, res){
    try{
        const {id_cart, id_item, size} = req.body
        if(id_cart == null || id_item == null)
            return res.send(JSON.stringify("id_cart/id_item is null"))
        
        const cart = await cart_model.findById(id_cart)
        const item = cart.products.id(id_item)
        //console.log(item.amount)
        item.size = size
        await cart.save()

        return res.json(cart)
    }catch(err){
        res.send(JSON.stringify("error"))
    }
}

async function deleteProduct(req, res){
    try{
        // dùng id_cart bởi vì đã ở trong giỏ hàng
        const {id_cart, id_item} = req.body
        
        if(id_cart == undefined || id_cart == null)
            return res.send(JSON.stringify("Shopping cart is empty!"))

        const cart = await cart_model.findById(id_cart)
        if(cart.products == null)
            return res.send(JSON.stringify("Shopping cart is empty!"))

        await cart.products.pull({_id: id_item})
        await cart.save()
        res.json(cart)
    }catch(err){
        res.send(JSON.stringify("error"))
    }
}

async function deleteCart(req,res){
    try{
        const {id_user} = req.body
        if(id_user == null){
            return res.send(JSON.stringify("Id is null"))
        }

        const user = await user_model.findById(id_user)
        var id_cart = user.cart
        if(id_cart != undefined){
            user.cart = undefined
            await user.save()
            
            const cart = await cart_model.findByIdAndRemove(id_cart)
        }
        res.json(user)
    }catch(err){
        res.send(JSON.stringify("error"))
    }
}
module.exports = (app) =>{
    app.post("/cart/view", (req, res) => {
        viewCart(req,res)
    })
    app.put("/cart/add_product", (req, res) => {
        addProduct(req,res)
    })
    app.put("/cart/delete_product", (req, res) => {
        deleteProduct(req,res)
    })
    app.put("/cart/change_amount", (req, res) => {
        changeAmount(req,res)
    })
    app.put("/cart/change_size", (req, res) => {
        changeSize(req,res)
    })
    app.delete("/cart/delete_cart", (req, res) => {
        deleteCart(req,res)
    })
}