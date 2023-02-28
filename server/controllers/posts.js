const Post = require("../models/Post");
const User = require("../models/User");

// CREATE POST

const createPost = async (req, res) => {
  try {
    const { userId, title, description, category, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstname: user.firstname,
      lastname: user.lastname,
      category,
      title,
      description,
      picturePath,
      userPicturePath: user.picturePath,
    });
    await newPost.save();
    const post = await Post.find(newPost._id);
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// READ POST
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// READ USER POSTS
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getFeedPosts, getUserPosts, createPost };
