
const authenticationModel = require('../models/authentication_model')

module.exports = (app)=> {  
    app.route('/log_in')
        .post((req, res)=> {
            try{
                //check log in info  
                authenticationModel.findOne({'email': req.body.email}, (err, account)=>{
                    if (err) throw err;
                    if (account == null) res.send(JSON.stringify('email not exist'));
                    else{
                        if (account.password == req.body.password){
                            req.session.UserEmail = account.email;
                            req.session['account type'] = account['account type'];
                            if(req.body.remember_me) req.session.cookie.expires = false;
                            res.send(JSON.stringify('log in accepted'));
                        }
                        else{
                            res.send(JSON.stringify('wrong password'));
                        }
                    }
                })
            }
            catch (err){
                res.status(500).send(err);
            }
        }
    )
};
