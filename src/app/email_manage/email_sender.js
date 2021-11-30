const sendEmail = require('./email_transporter');

module.exports = (app)=>{
    app.route('/send_email')
    .post((req, res) =>{
        let email = req.session.UserEmail;
        let subject = req.body.subject;
        let text = req.body.text;
        try{
            sendEmail(email, subject, text);
            res.send(JSON.stringify("email sended"))
        }
        catch(err){
            res.status(400).send(err);
        }
    })
}