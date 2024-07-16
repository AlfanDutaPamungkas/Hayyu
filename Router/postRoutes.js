const express = require('express');
const multer = require('multer');
const isAuthenticated = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');
const postRoutes = express.Router();
const storage = require('../config/cloudinary');
const { createPostCtrl, getAllPostCtrl, getPostCtrl, updatePostCtrl, deletePostCtrl, getUpdateBlogFormCtrl } = require('../controllers/postController');

const upload = multer({
    storage,
    limits : 1024 * 1024 * 3
});

postRoutes.post(
    "/",
    isAuthenticated,
    isAdmin,
    upload.single('file'),
    createPostCtrl
);

postRoutes.get("/", getAllPostCtrl);

postRoutes.get(
    "/add-blog",
    isAuthenticated,
    isAdmin,
    (req, res) => {
        res.render("blogs/add-blog");
    }
);

postRoutes.get(
    "/update-blog-form/:id",
    isAuthenticated,
    isAdmin,
    getUpdateBlogFormCtrl
);

postRoutes.get("/:id", getPostCtrl);

postRoutes.put(
    "/:id",
    isAuthenticated,
    isAdmin,
    upload.single('file'),
    updatePostCtrl
);

postRoutes.delete("/:id", deletePostCtrl);

module.exports = postRoutes;

