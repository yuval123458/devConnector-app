const express = require("express");
const User = require("../../models/User");
const { check } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

// sign up new user
router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: "must fill required fields!" });
    }
    const { name, email, password } = req.body;

    let existing;

    try {
      existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "this email already exists" });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const newUser = new User({
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      });

      const salt = await bcrypt.genSalt(10);

      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      const payload = {
        id: newUser.id,
      };

      jwt.sign(
        payload,
        config.get("JWT_SECRET"),
        { expiresIn: "2 days" },
        (err, token) => {
          if (err) {
            throw new Error(err.message);
          }
          console.log(token);
        }
      );

      res.send("user registered into database");
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  }
);

module.exports = router;
