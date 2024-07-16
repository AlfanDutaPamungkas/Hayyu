const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        checkin: {
            type: Date,
            required: true
        },
        checkout: {
            type: Date,
            required: true
        },
        cost: {
            type: Number,
        },
        nights: {
            type: Number,
        },
        confirmationNumber: {
            type: String,
            unique: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
        },
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

