const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Invalid token, authorization denied" });
  }
  try {
    const user = jwt.verify(token, process.env.JWTsecretkey);
    req.user = user.user.id;

    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: "Invalid token,authorzation denieds" });
  }
};
