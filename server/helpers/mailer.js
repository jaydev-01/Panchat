const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASSWORD,
    }
})

module.exports = transport;