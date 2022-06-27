const config = require("config");
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "no token found, auth failed!" });
  }

  try {
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));

    req.userData = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "user not verified for that action" });
  }
};

module.exports = checkAuth;
