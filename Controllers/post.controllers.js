import { Post } from "../Models/post.model.js";
import cloudinary from "cloudinary"; 

export const CreatePost = async (req, res) => {
  try {
    const {
      name,
      category,
      location,
      price,
      sqft,
      bed,
      bath,

      admin,
    } = req.body;
    const file = req.files.postImages
    console.log(file);

    // if (!name || !category || !location || !price || !sqft || !bed || !bath) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "all fields required",
    //   });
    // }

    const uploader = await cloudinary.v2.uploader.upload(file, {
      folder: "makaan",
    });
    console.log(uploader);

    let post = await Post.create({
      name,
      category,
      location,
      price,
      sqft,
      bed,
      bath,
      postImages: {
        public_id: uploader.public_id,
        url: uploader.secure_url,
      },
      admin,
    });
    res.status(201).json({
      success: true,
      message: "post created Success",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeletePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    // const uploader = await cloudinary.v2.uploader.upload(postImages, {
    //   folder: "makaan",
    // });

    await post.deleteOne();
    res.status(200).json({
      success: true,
      message: "post has been deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdatePost = async (req, res) => {
  try {
    const { name, category, location, price, sqft, bed, bath, admin } =
      req.body;
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    await post.updateOne({
      name,
      category,
      location,
      price,
      sqft,
      bed,
      bath,
      admin,
    });
    await post.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "post has been updated",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetAllPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({
      success: true,
      message: "post created Success",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const SearchPost = async (req, res) => {
  try {
    const post = await Post.find({
      $or: [
        { name: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ],
    });
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
