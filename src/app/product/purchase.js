
function view_purchase(req,res){
    console.log("abc")
}

module.exports = (app) => {
    app.get("purchase/view", (req,res) => {
        view_purchase(req,res)
    })
}