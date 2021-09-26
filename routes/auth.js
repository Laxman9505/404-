const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

//get request /api/auth
//get the user details that is currently logged in

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("server error");
  }
});

//post request /api/auth
// login the user and returns the token

router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "invalid credentials from passwords" }] });
    }
    //return json web token

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWTsecretkey,
      { expiresIn: 360000 },
      (error, token) => {
        if (error) {
          throw error;
        }
        res.json({ token });
      }
    );
  }
);

module.exports = router;
