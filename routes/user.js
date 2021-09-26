const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

//post request /api/users
// register the user

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }
      user = new User({
        name,
        email,
        password,
      });

      const saltRound = await bcrpyt.genSalt(10);
      user.password = await bcrpyt.hash(password, saltRound);
      await user.save();

      //return jsonwebtoken
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
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

module.exports = router;
