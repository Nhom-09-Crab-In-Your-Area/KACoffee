const voucherModel = require("../../models/voucher_model")


const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
const charactersLength = characters.length;
const codeLength = 7
// code generator
function codeGenerator(){
    var result = []
    for ( var i = 0; i < codeLength; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join("")
}

function create(req, res) {
  if (req.session.AccountType == "Admin") {
    const { activeDate, expireDate, minPaid, money, activeRank } = req.body;
    let isExist = false
    do{
        let code = codeGenerator()
        console.log(code)
        voucherModel.create({
            code: code,
            activeDate: activeDate,
            expireDate: expireDate,
            minPaid: minPaid,
            money: money,
            activeRank: activeRank
        }, (err) => {
            if(err){
                if(err.name === "MongoError" && err.code === 11000){
                    isExist = true
                }
                else{
                    console.log(err)
                }
            }
        })
    }
    while(isExist)

    res.send(JSON.stringify("created"));

  } else {
    res.send(JSON.stringify("Only admin can create vouchers"));
  }
}

function displayAll(req, res) {
  voucherModel.find((err, voucher) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(voucher);
    }
  });
}

// function display(req, res) {
//   const { id, name, type } = req.body;
//   if (type != null) {
//     voucherModel.find({ type: type }, (err, voucher) => {
//       //console.log(voucher)
//       if (err) {
//         res.status(500).json(err);
//       } else if (voucher.length == 0) {
//         console.log("type not exist");
//         res.status(404).json("type not exist");
//       } else {
//         res.json(voucher);
//       }
//     });
//   } else if (name != null) {
//     voucherModel.find({ name: name }, (err, voucher) => {
//       if (err) {
//         res.status(500).json(err);
//       } else if (voucher.length == 0) {
//         console.log("name not exist");
//         res.status(404).json();
//       } else {
//         res.json(voucher);
//       }
//     });
//   } else {
//     displayAll(req, res);
//   }
// }

function remove(req, res) {
  if (req.session.AccountType == "Admin") {
    const { id, name } = req.body;
    if (id == null) {
      res.status(404).json();
    } else {
      voucherModel.findOne({ _id: id }, (err, voucher) => {
        if (err) {
          res.status(500).json(err);
        } else if (voucher == null) {
          console.log("Not found");
          res.status(404).json();
        } else {
          voucherModel.deleteOne({ _id: id }, () => {
            res.send(JSON.stringify("deleted"));
          });
        }
      });
    }
  } else {
    res.send(JSON.stringify("Only admin can create vouchers"));
  }
}

module.exports = (app) => {
  app.post("/voucher/create", (req, res) => {
    create(req, res);
  });
  app.post("/voucher/view", (req, res) => {
    display(req, res);
  });
  app.put("/voucher/update", (req,res) => {
    update(req,res);
  })
  app.post("/voucher/delete", (req, res) => {
    remove(req, res);
  });
};
