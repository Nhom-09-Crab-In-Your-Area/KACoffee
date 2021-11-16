const check_employee_profile = require('./check_employee_profile');
const check_manager_profile = require('./check_manager_profile');
const check_self_profile = require('./check_self_profile');
const remove_employee = require('./remove_employee');

module.exports = (app)=>{
    check_employee_profile(app);
    check_manager_profile(app);
    check_self_profile(app);
    remove_employee(app);
}