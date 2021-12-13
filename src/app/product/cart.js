const cart_model = require("../../models/cart_model")
const user_model = require("../../models/users_model")
const employee_model = require("../../models/employees_model")
const users_model = require("../../models/users_model")

async function viewCart(req, res){
    try{
        const id_user = req.session.idAccount
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
            res.json(cart)
        }
    }catch(err){
        throw err
    }
}

// employee creates new cart
async function createCart(req, res){
    try{
        const {phone} = req.body
        const {idAccount, AccountType} = req.session
        if(AccountType == "Employee"){
            const user = await users_model.findOne({phone: phone})
            let id_cart

            if(user == null) id_cart = null
            else id_cart = user.id
            
            const cart = await cart_model.create({
                user: id_cart
            })
            res.json(cart)
        }
        else res.send(JSON.stringify("Only employee can access!"))
    }
    catch(err){
        throw err
    }
}

async function addProduct(req, res){
    try{
        // dùng id_user bởi vì có thể chưa có id_cart
        const id_user = req.session.idAccount
        var {id_cart, id_product, size, sugar_level, ice_level, amount, storeID, price} = req.body
        let cart

        if(id_product == null)
            return res.send(JSON.stringify("id product is null"))

        if(req.session.AccountType == "Customer"){
            const user = await user_model.findById(id_user)
            if(user.cart == undefined){
                cart = await cart_model.create({
                    user: id_user,
                })
                await user.updateOne({cart: cart})
            }
            else{
                cart = await cart_model.findById(user.cart)
            }
        }
        else if(req.session.AccountType == "Employee"){
            cart = await cart_model.findById(id_cart)
        }

        // modify cart
        const products = cart.products
        const len = products.length
        cart.priceTotal += Number(amount)*price
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
                    amount: amount,
                    price: price
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
        cart.priceTotal += (Number(amount) - item.amount)*item.price
        item.amount = amount
        await cart.save()

        return res.json(cart)
    }catch(err){
        throw err
    }
}

async function changeSize(req, res){
    try{
        const {id_cart, id_item, size, price} = req.body
        if(id_cart == null || id_item == null)
            return res.send(JSON.stringify("id_cart/id_item is null"))
        
        const cart = await cart_model.findById(id_cart)
        const item = cart.products.id(id_item)
        //console.log(item.amount)
        cart.priceTotal += Number(item.amount)*(price - item.price)
        item.price = price
        item.size = size
        await cart.save()

        return res.json(cart)
    }catch(err){
        throw err
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
        
        const item = cart.products.id(id_item) 
        cart.priceTotal -= item.amount*item.price
        await cart.products.pull({_id: id_item})
        await cart.save()
        res.json(cart)
    }catch(err){
        throw err
    }
}

async function deleteCart(req,res){
    try{
        const {id_cart} = req.body
        const id_user = req.session.idAccount
        

        if(req.session.AccountType == "Customer"){
//             if(id_user == null){
//                 return res.send(JSON.stringify("Id is null"))
//             }
            const user = await user_model.findById(id_user)
            var id_cart = user.cart
            if(id_cart != undefined){
                user.cart = undefined
                await user.save()

                const cart = await cart_model.findByIdAndRemove(id_cart)
            }
            res.json(user)
        }
        
        else if(req.session.AccountType == "Employee"){
            if(id_cart == null){
                return res.send(JSON.stringify("Id is null"))
            }
            await cart_model.findByIdAndRemove(id_cart)
        }
        
        
    }catch(err){
        throw err
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
