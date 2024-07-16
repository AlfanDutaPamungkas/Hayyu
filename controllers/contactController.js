const AppErr = require("../utils/appErr");
const sendEmail = require("../utils/contactUsEmail");

const contactCtrl = async(req,res,next) => {
    const { email, subject, message } = req.body;
    try {
        sendEmail(process.env.EMAIL, email, subject, message);
        req.flash("success", "Message sent successfully !");
        res.redirect("/api/v1/contact");
    } catch (error) {
        next(new AppErr(error));
    }
};

module.exports = contactCtrl;