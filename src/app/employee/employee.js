const order_model = require("../../models/order_model")
const employee_model = require("../../models/employees_model")

// xem tất cả đơn hàng trong cửa hàng
async function viewOrder(req,res){
    try{
        if(req.session.AccountType == "Employee"){
            const idAccount = req.session.idAccount
            const employee = await employee_model.findById(idAccount)
            if(employee == null)
                res.send(JSON.stringify("Employee not exist!"))
            const storeID = employee.storeID
            //console.log("Abc",storeID)
            const orders = await order_model.find({storeID: storeID}).populate({path: "products.info"})
            res.json(orders)
        }
        else res.send(JSON.stringify("Only employee can access!"))
    }
    catch(err){
        throw err
    }
}
// xem tất cả đơn hàng chờ xác nhận trong cửa hàng
async function viewFilterOrder(req,res){
    try{
        if(req.session.AccountType == "Employee"){
            const { status_order } = req.body
            const idAccount = req.session.idAccount
            const employee = await employee_model.findById(idAccount)
            if(employee == null)
                res.send(JSON.stringify("Employee not exist!"))
            const storeID = employee.storeID
            //console.log("Abc",storeID)
            const orders = await order_model.find({storeID: storeID, status: status_order}).populate({path: "products.info"})
            res.json(orders)
        }
        else res.send(JSON.stringify("Only employee can access!"))
    }
    catch(err){
        throw err
    }
}

async function changeStatus(req,res){
    try{
        if(req.session.AccountType == "Employee"){
            const { id_order, status_order } = req.body
            const idAccount = req.session.idAccount

            const order = await order_model.findById(id_order)
            if(order.status == "Verifying"){
                order.employee = idAccount
            }
            order.status = status_order
            order.save()
            res.json(order)
        }
        else res.send(JSON.stringify("Only employee / admin can access!"))
    }
    catch(err){
        throw err
    }
}

// async function createOrder(req,res){
//     try{
//         if(req.session.AccountType == "Employee"){
//             const { phone, status_order } = req.body
//             const idAccount = req.session.idAccount

//         }
//         else res.send(JSON.stringify("Only employee / admin can access!"))
//     }
//     catch(err){
//         throw err
//     }
// }

module.exports = (app) =>{
    app.get("/store/view_order", (req,res) =>{
        viewOrder(req,res)
    })
    app.post("/store/view_order", (req,res) =>{
        viewFilterOrder(req,res)
    })
    app.put("/store/status_order", (req,res) =>{
        changeStatus(req,res)
    })
    // app.post("/store/create_order", (req,res) =>{
    //     createOrder(req,res)
    // })
}
