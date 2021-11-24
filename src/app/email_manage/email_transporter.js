const cfg = require('./email_cfg')
const nodemailer = require("nodemailer");
const user = cfg.user;
const password = cfg.password;
const smtpPool = require('nodemailer-smtp-pool');

const sendEmail = async (email, subject, text) => {
    try {
        let transporter = nodemailer.createTransport(smtpPool({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: user,
                password: password,
            },
            maxConnections: 5,
            maxMessages: 100,
        }))
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
        });
        console.log('email sent')
    }
    catch(err){
        throw err;
    }
};
  
module.exports = sendEmail;