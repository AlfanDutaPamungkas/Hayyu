const cloudinary = require("../config/cloudinary_config");
const Post = require("../model/Post");
const AppErr = require("../utils/appErr");

const createPostCtrl = async(req, res, next) => {
    const { title, description } = req.body;
    try {
        if (!title || !description || !req.file) {
            return next(new AppErr("Please provide all fields", 400));
        }

        const post = await Post.create({
            title,
            description,
            image: req.file.path
        });

        res.redirect("/api/v1/posts/")
        
    } catch (error) {
        next(new AppErr(error));
    }
};

const getAllPostCtrl = async(req, res, next) => {
    try {
        const posts = await Post.find();
        res.render("blogs/blog", {posts});
    } catch (error) {
        next(new AppErr(error));
    }
};

const getPostCtrl = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        res.render("blogs/post-details", {post});
    } catch (error) {
        next(new AppErr(error));
    }
};

const updatePostCtrl = async(req, res, next) => {
    const { title, description } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        const postImage = post.image;

        if (req.file) {
            const imageID = postImage.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(imageID);
        }

        await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                image:req.file ? req.file.path : postImage
            }, {new:true}
        );

        res.redirect("/api/v1/posts/")
    } catch (error) {
        next(new AppErr(error));
    }
};

const deletePostCtrl = async(req, res, next)=>{
    try {
        const post = await Post.findById(req.params.id);

        const image = post.image;
        const imageID = image.split('/').slice(-2).join('/').split('.')[0];

        await cloudinary.uploader.destroy(imageID);

        await Post.findByIdAndDelete(req.params.id);

        res.redirect("/api/v1/posts/")
    } catch (error) {
        next(appErr(error.message));
    }
};

const getUpdateBlogFormCtrl = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('blogs/update-post', {post});
    } catch (error) {
        next(new AppErr(error));
    }
};

module.exports = {
    createPostCtrl,
    getAllPostCtrl,
    getPostCtrl,
    updatePostCtrl,
    deletePostCtrl,
    getUpdateBlogFormCtrl
};

