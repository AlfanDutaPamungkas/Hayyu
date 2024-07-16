const express = require('express');
const multer = require('multer');
const isAuthenticated = require('../middlewares/isAuth');
const { addHotelCtrl, getAllHotelCtrl, getHotelCtrl, updateHotelCtrl, deleteHotelCtrl, getUpdateFormCtrl } = require('../controllers/hotelController');
const isAdmin = require('../middlewares/isAdmin');
const storage = require('../config/cloudinary');
const hotelRoutes = express.Router();

const upload = multer({
    storage,
    limits : 1024 * 1024 * 3
});

hotelRoutes.get(
    "/add-hotel", 
    isAuthenticated,
    isAdmin,
    (req, res) => {
        res.render("hotels/add-hotel");
    }
);

hotelRoutes.post(
    "/add-hotel", 
    isAuthenticated, 
    isAdmin,
    upload.single("file"),
    addHotelCtrl
)

hotelRoutes.get(
    "/",
    getAllHotelCtrl
);

hotelRoutes.get("/update-hotel-form/:id",
    isAuthenticated,
    isAdmin,
    getUpdateFormCtrl
);

hotelRoutes.get(
    "/:id",
    getHotelCtrl
);

hotelRoutes.put(
    "/:id",
    isAuthenticated, 
    isAdmin,
    upload.single("file"),
    updateHotelCtrl
);

hotelRoutes.delete(
    "/:id",
    isAuthenticated, 
    isAdmin,
    deleteHotelCtrl
);

module.exports = hotelRoutes;

