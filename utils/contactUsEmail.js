const nodemailer = require('nodemailer');

const sendEmail = async(to, from, subject, messageContent) => {
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user: process.env.CONTACT_EMAIL,
            pass: process.env.PASSWORD_CONTACT_EMAIL
        }
    });

    const message = {
        to,
        subject: `Message from ${from}`,
        text : `User : ${from}\nSubject : ${subject}\nMessage : \n ${messageContent}`
    };

    await transporter.sendMail(message);
}

module.exports = sendEmail;

