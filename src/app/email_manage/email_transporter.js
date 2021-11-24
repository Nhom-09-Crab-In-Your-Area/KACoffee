const cfg = require('./email_cfg')
const nodemailer = require("nodemailer");
const user = cfg.user;
const password = cfg.password;

const sendEmail = async (email, subject, text) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: user,
              pass: password,
            },
          });
          
        let mailOptions = {
            from: user,
            to: email, 
            subject: subject,
            text: text
        }
        transporter.sendMail(mailOptions, function(error, res){
            if(error){
                throw error;
            }
            else{
                console.log('email sent');
            }
        });
    }
    catch(err){
        throw err;
    }
};
  
module.exports = sendEmail;