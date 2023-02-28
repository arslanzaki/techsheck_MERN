const express = require("express");
const getUser = require("../controllers/users");
const verifyToken = require("../middlewares/auth");


const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser);

module.exports = router;
