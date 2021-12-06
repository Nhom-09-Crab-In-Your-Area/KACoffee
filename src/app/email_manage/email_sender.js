const sendEmail = require('./email_transporter');
const email_forms = require('./email_forms');
const users_model = require('../../models/users_model');
const employees_model = require('../../models/employees_model');
const code_generate = require('./code_generator');

send_email = function(email, emailType, res){
    //create url
    let url = code_generate(email, emailType);
    //create content
    let content = email_forms(emailType, account['first name'], url);
    try{
        sendEmail(email, content.subject, content.text, res);
        res.status(200).send(JSON.stringify("email sent"))
    }
    catch(err){
        res.status(503).send(err);
    }
}

module.exports = (app)=>{
    app.route('/send_email')
    .post((req, res) =>{
        let emailType = req.body.emailType;
        if(req.session.UserEmail) let email = req.session.UserEmail;
        else{
            email = req.body.email;
        }

        users_model.findOne({'email': email}, (err, account) =>{
            if(err) throw err;
            else{
                if (account == null){
                    employees_model.findOne({'email': email}, (err, account)=>{
                        if(err) throw err;
                        if(account == null) res.status(404).send(JSON.stringify('email not exist'));
                        else{
                            send_email(email, emailType, res);
                        }
                    })
                    
                }
                else{
                    send_email(email, emailType, res);
                }
                
                
            }
        })
        
    })
}