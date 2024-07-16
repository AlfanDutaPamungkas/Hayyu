const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const createBookingTicket = async(name, checkin, checkout, cost, hotelName, nights, confirmationNumber) => {
    const ticketsDir = path.join(__dirname, '..', 'tickets');

    if (!fs.existsSync(ticketsDir)) {
        fs.mkdirSync(ticketsDir);
    }

    const ticketHtml = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .ticket {
                    border: 1px solid #000;
                    padding: 20px;
                    width: 600px;
                    margin: 0 auto;
                }
                .header {
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                }
                .details {
                    margin-top: 20px;
                    font-size: 18px;
                }
            </style>
        </head>
        <body>
            <div class="ticket">
                <div class="header">Booking Confirmation</div>
                <div class="details">
                    <p>Name: ${name}</p>
                    <p>Hotel: ${hotelName}</p>
                    <p>Check-in: ${checkin}</p>
                    <p>Check-out: ${checkout}</p>
                    <p>Nights: ${nights}</p>
                    <p>Cost: Rp ${cost.toLocaleString()}</p>
                    <p>Confirmation Number: ${confirmationNumber}</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
    const ticketPath = path.join(ticketsDir, `${confirmationNumber}.pdf`);

    const browser = await puppeteer.launch({
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 60000
    });
    
    const page = await browser.newPage();
    await page.setContent(ticketHtml, { waitUntil: 'networkidle0' });
    await page.pdf({ path: ticketPath, format: 'A4' });
    await browser.close();
    
    return ticketPath;

};

module.exports = createBookingTicket

