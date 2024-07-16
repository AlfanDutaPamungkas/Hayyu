const Booking = require('../model/Booking');
const Hotel = require('../model/Hotel');
const User = require('../model/User');
const AppErr = require('../utils/appErr');
const createBookingTicket = require('../utils/createBookingTicket');
const generateConfirmationNumber = require('../utils/generateConfNumber');
const sendBookingTicket = require('../utils/sendBookingTicket');

const bookingCtrl = async(req, res, next) => {
    const { name, checkin, checkout } = req.body;
    try {
        if (!name || !checkin || !checkout) {
            return next(new AppErr("Please provide all fields", 400));
        }

        const hotel = await Hotel.findById(req.params.id);
        const hotelName = hotel.name;
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const nights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
        const cost = nights * hotel.price;

        const bookingData = {
            hotel: req.params.id,
            name,
            checkin: checkinDate,
            checkout: checkoutDate,
            cost,
            nights,
            hotelName
        }

        res.render("booking/payment", {bookingData});
        
    } catch (error) {
        next(new AppErr(error));
    }
};

const confirmationCtrl = async (req, res, next) => {
    const { name, checkin, checkout, cost, hotel, nights, hotelName } = req.body;
    try {
        const user = await User.findById(req.userData.id);
        const booking = await Booking.create({
            name,
            checkin,
            checkout,
            cost,
            hotel,
            nights,
            user: req.userData.id,
            confirmationNumber: generateConfirmationNumber()
        });

        const ticketPath = await createBookingTicket(name, checkin, checkout, cost, hotelName, nights, booking.confirmationNumber);
        
        await sendBookingTicket((await User.findById(user)).email, ticketPath);
        
        user.booking.push(booking._id);
        await user.save();

        res.render("booking/success");
    } catch (error) {
        next(new AppErr(error));
    }
};

module.exports = {
    bookingCtrl,
    confirmationCtrl
};

