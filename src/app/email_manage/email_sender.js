const sendEmail = require('./email_transporter');

module.exports = (app)=>{
    app.route('/send_email')
    .post((req, res) =>{
        let email = 'haiminhnguyen2001@gmail.com';
        let subject = 'test';
        let text = 'test';
        try{
            sendEmail(email, subject, text);
            res.status(200).send(JSON.stringify("email sent"))
        }
        catch(err){
            res.status(503).send(err);
        }
    })
}