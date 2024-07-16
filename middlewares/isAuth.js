const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies ? req.cookies.token : null;
    if (!token) {
        return res.redirect("/api/v1/users/login");
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.redirect("/api/v1/users/login");
        req.userData = decoded;
        next();
    });
};

module.exports = isAuthenticated;

