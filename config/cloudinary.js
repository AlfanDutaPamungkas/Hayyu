const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("./cloudinary_config")

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'jpeg', 'png'],
    params:{
        folder:'hotel',
        transformation:[{width:500, height:500, crop:'limit'}]
    }
});

module.exports = storage;

