const cloudinary = require("../config/cloudinary_config");
const Booking = require("../model/Booking");
const Hotel = require("../model/Hotel");
const AppErr = require("../utils/appErr");

const addHotelCtrl = async(req, res, next) => {
    const { name, address, description, price } = req.body;
    try {
        if (!name || !address || !description || !price || !req.file) {
            return next(new AppErr("Please provide all fields", 400));
        }

        const hotel = await Hotel.create({
            name,
            address,
            description,
            price,
            image: req.file.path
        });

        res.redirect("/");

    } catch (error) {
        next(new AppErr(error));
    }
};

const getAllHotelCtrl = async(req, res, next) => {
    try {
        const hotels = await Hotel.find();

        res.json({
            status:"success",
            data: hotels
        });
    } catch (error) {
        next(new AppErr(error));
    }
}

const getHotelCtrl = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const bookingData = await Booking.find({hotel, user: res.locals.user});
        res.render("hotels/details-page", {hotel, bookingData});
    } catch (error) {
        next(new AppErr(error));
    }
};

const updateHotelCtrl = async(req, res, next) => {
    const { name, address, description, price } = req.body;
    try {
        const hotel = await Hotel.findById(req.params.id);
        const hotelImage = hotel.image;
        
        if (req.file) {
            const imageID = hotelImage.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(imageID);
        }
        
        await Hotel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                address,
                description,
                price,
                image:req.file ? req.file.path : hotelImage
            }, {new:true}
        );
        
        res.redirect("/");
    } catch (error) {
        next(new AppErr(error));
    }
};

const deleteHotelCtrl = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const image = hotel.image;
        const imageID = image.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(imageID);

        await Hotel.findByIdAndDelete(req.params.id);

        res.redirect("/");
    } catch (error) {
        next(new AppErr(error));
    }
}

const getUpdateFormCtrl = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.render('hotels/update-hotel', {hotel});
    } catch (error) {
        next(new AppErr(error));
    }
};

module.exports = {
    addHotelCtrl,
    getAllHotelCtrl,
    getHotelCtrl,
    updateHotelCtrl,
    deleteHotelCtrl,
    getUpdateFormCtrl
}
