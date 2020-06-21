const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// Auth Middleware
const auth = require("../../middlewares/auth");

// @route POST /api/auth
// @desc Authenticate a user
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the details",
    });
  }

  //Check for existing user
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });

  // Compare the given password and hashed password from db
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });

  // Passwords also matched, now sign a new jwt token and send it
  const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
    expiresIn: 600,
  });
  return res.status(200).json({
    success: true,
    token,
    data: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  });
});

// @route GET api/auth/user
// @desc GET user auth data
// @access private
router.get("/user", auth, async (req, res) => {
  // Get user id from req.user
  const userData = await User.findById(req.user.id).select("-password");
  if (userData)
    return res.status(200).json({
      success: true,
      data: userData,
    });
  else
    return res.status(401).json({
      success: false,
      message: "No user found with the token",
    });
});

module.exports = router;
