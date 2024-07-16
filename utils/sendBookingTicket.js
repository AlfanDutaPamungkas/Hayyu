const nodemailer = require('nodemailer');

const sendBookingTicket = async(to, ticketPath) => {
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASS_SEND_TICKET
        }
    });

    const message = {
        to,
        subject:"Your Booking Confirmation",
        text:"Please find your booking confirmation attached.",
        attachments: [
            {
                filename: 'ticket.pdf',
                path: ticketPath
            }
        ]
    }

    await transporter.sendMail(message);
};

module.exports = sendBookingTicket;

