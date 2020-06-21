const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route POST /api/users
// @desc Register a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the details",
    });
  }

  //Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });

  const userToSave = new User({
    name,
    email,
    password,
  });

  // Create a salt and hash for the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      userToSave.password = hash;
      userToSave.save().then((user) => {
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
    });
  });
});

module.exports = router;
