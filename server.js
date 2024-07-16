require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const methodOverride = require("method-override");
const dbConnect = require('./config/dbConnect');
const userRoutes = require('./Router/userRoutes');
const globalErrHandler = require('./middlewares/globalHandler');
const hotelRoutes = require('./Router/hotelRoutes');
const postRoutes = require('./Router/postRoutes');
const bookingRoutes = require('./Router/bookingRoutes');
const Hotel = require('./model/Hotel');
const truncatePost = require('./utils/truncatePost');
const contactRoutes = require('./Router/contactRoutes');

const app = express();
const PORT = process.env.PORT;

dbConnect();

app.locals.truncatePost = truncatePost;

app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());
app.use(methodOverride("_method"))

app.use((req, res, next)=>{
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                res.locals.isLoggedIn = false;
                res.locals.isAdmin = false;
                res.locals.user = null;
            } else {
                res.locals.isLoggedIn = true;
                res.locals.isAdmin = user.role === "admin";
                res.locals.user = user.id;
            }
            next();
        });
    } else {
        res.locals.isLoggedIn = false;
        res.locals.isAdmin = false;
        res.locals.user = null;
        next();
    }
});

app.get("/", async(req, res) => {
    const hotels = await Hotel.find();
    res.render("index", {hotels});
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/hotels", hotelRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/contact", contactRoutes);

app.use(globalErrHandler);

app.listen(PORT, console.log(`Server is running on ${PORT}`));

