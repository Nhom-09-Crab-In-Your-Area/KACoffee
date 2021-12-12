const sendEmail = require('./email_transporter');
const email_forms = require('./email_forms');
const model = require('../../models/authentication_model');
const code_generate = require('./code_generator');

send_email = function(email, emailType, account, res){
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
        let email;
        if(req.session.UserEmail) email = req.session.UserEmail;
        else{
            email = req.body.email;
        }

        model.findOne({'email': email}, (err, account) =>{
            if(err) throw err;
            else{
                if (account == null){
                    res.status(404).send(JSON.stringify('email not exist'));
                }
                else{
                    send_email(email, emailType, account ,  res);
                }
            }
        })
        
    })
}