const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const router = express.Router();
const User = require("../../models/User");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// GET specific user
router.get("/", checkAuth, async (req, res) => {
  let user;
  try {
    user = await User.findById(req.userData).select("-password");
  } catch (err) {
    return res.status(401).json({ msg: "could not find user" });
  }

  res.send({ user: user });
});

// login user
// api/auth
router.post(
  "/",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { email, password } = req.body;

    let existing;

    try {
      existing = await User.findOne({ email });
      if (!existing) {
        return res.status(400).json({ message: "no email found" });
      }

      const isVerified = await bcrypt.compare(password, existing.password);

      if (!isVerified) {
        return res
          .status(400)
          .json({ message: "password is incorrect, please try again" });
      }

      jwt.sign(
        { id: existing.id },
        config.get("JWT_SECRET"),
        { expiresIn: "2 days" },
        (err, token) => {
          if (err) {
            throw new Error(err.message);
          }
          console.log(token);
        }
      );

      res.send("user logged in!");
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  }
);

module.exports = router;
