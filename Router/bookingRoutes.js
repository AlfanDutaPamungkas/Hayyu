const express = require('express');
const { bookingCtrl, confirmationCtrl } = require('../controllers/bookingController');
const isAuthenticated = require('../middlewares/isAuth');
const bookingRoutes = express.Router();

bookingRoutes.post("/confirm", isAuthenticated, confirmationCtrl);

bookingRoutes.post("/:id", isAuthenticated, bookingCtrl);

module.exports = bookingRoutes;

