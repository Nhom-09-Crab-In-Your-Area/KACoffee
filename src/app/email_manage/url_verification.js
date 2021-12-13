const path = require("path");
const code_verification_model = require('../../models/code_verification_model');
const html_path_dict ={
    'password_change': path.join(__dirname + '../../../views/login'),
    'email_verify': path.join(__dirname + '../../../views/login'),
}

module.exports = (app)=>{
    app.get('/code_verify', (req, res)=>{
        let code = req.query.code;
        let email = req.query.email;
        let service_type = req.query.service_type;
        code_verification_model.findOne({'email': email}, (err, authen)=>{
            if (err) throw err;
            else{
                if (authen == null){
                    res.status(404).send(JSON.stringify('can not verify'));
                }
                else{
                    if(authen.code == code){
                        res.status(200).render(html_path_dict[service_type], {});
                    }
                    else{
                        res.status(404).send(JSON.stringify('can not verify'));
                    }
                }
            }
        })
    })
}