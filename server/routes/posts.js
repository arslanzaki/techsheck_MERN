const express = require("express");
const { getFeedPosts, getUserPosts } = require("../controllers/posts");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

module.exports = router;
