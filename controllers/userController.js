const bcrypt = require("bcryptjs");
const AppErr = require("../utils/appErr");
const User = require("../model/User");
const generateToken = require("../utils/generateToken");

const registerCtrl = async(req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        if (!firstname || !email || !password) {
            return next(new AppErr("Please provide all fields", 400));
        }

        const userFound = await User.findOne({email});
        if (userFound) {
            return next(new AppErr("User already exist", 400));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        res.redirect("/api/v1/users/login");

    } catch (error) {
        next(new AppErr(error));
    }
};

const loginCtrl = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return next(new AppErr("Please provide all fields", 400));
        }
        
        const userFound = await User.findOne({email});

        if (userFound && await bcrypt.compare(password, userFound.password)) {
            const token = generateToken(userFound._id, userFound.role);
            res.cookie("token",token,{
                maxAge : 1 * 24 * 60 * 60 * 1000,
                httpOnly : true
            });

            res.redirect("/");
        }else{
            req.flash("invalid", "Invalid email or password");
            res.redirect("/api/v1/users/login");
        }

    } catch (error) {
        next(new AppErr(error));
    }
};

const profileCtrl = async(req, res, next) => {
    try {
        const id = req.userData ? req.userData.id : null;
        const user = await User.findById(id);
        res.json({
            firstname : user.firstname,
            lastname: user.lastname,
            email: user.email
        });
    } catch (error) {
        next(new AppErr(error));
    }
}

const logoutCtrl = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};

module.exports = {
    registerCtrl,
    loginCtrl,
    profileCtrl,
    logoutCtrl
};