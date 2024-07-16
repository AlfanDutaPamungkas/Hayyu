const express = require('express');
const contactCtrl = require('../controllers/contactController');
const contactRoutes = express.Router();

contactRoutes.get("/", (req, res) => {
    res.render("contact-us", { messages : req.flash("success") });
});

contactRoutes.post("/", contactCtrl);

module.exports =  contactRoutes;

