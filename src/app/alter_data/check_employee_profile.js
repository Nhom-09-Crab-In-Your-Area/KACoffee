const employeeModel = require('../../models/employees_model');

module.exports = (app) =>{
    app.route('/check_employee_profile')
    .get((req, res) =>{
        employeeModel.findOne({'email': req.session.UserEmail}, (err, admin) =>{
            if (err) throw err;
            else{
                employeeModel.findMany({'storeID': admin.StoreID}, (err, employees)=>{
                    if (err) throw err;
                    else{
                        res.json(employees);
                    }
                })
            }
        })
    })
}