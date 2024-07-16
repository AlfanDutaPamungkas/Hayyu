const express = require('express');
const { registerCtrl, loginCtrl, profileCtrl, logoutCtrl } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuth');
const userRoutes = express.Router();

userRoutes.get("/register", (req, res) => {
    res.render("users/register");
});

userRoutes.post("/register", registerCtrl);

userRoutes.get("/login", (req, res) => {
    res.render("users/login", { messages: req.flash("invalid") });
});

userRoutes.post("/login", loginCtrl);

userRoutes.get("/profile", isAuthenticated, profileCtrl)

userRoutes.get("/logout", logoutCtrl);

module.exports = userRoutes;

