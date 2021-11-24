const cfg = require('./email_cfg')
const nodemailer = require("nodemailer");
const user = cfg.user;
const password = cfg.password;

const sendEmail = async (email, subject, text) => {
    try {
        let smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
                user: user,
                pass: password
            }
        });
        let mailOptions = {
            from: user,
            to: email, 
            subject: subject,
            text: text
        }
        smtpTransport.sendMail(mailOptions, function(error, res){
            if(error){
                throw err;
            }
        });
    }
    catch(err){
        throw err;
    }
};
  
module.exports = sendEmail;