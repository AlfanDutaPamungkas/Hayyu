const isAdmin = (req, res, next) => {
    const role = req?.userData?.role === "admin";
    if (role) {
        return next();
    } else {
        res.redirect("/api/v1/users/login");
    }
};

module.exports = isAdmin;

