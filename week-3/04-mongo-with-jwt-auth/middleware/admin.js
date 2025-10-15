const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  const token = req.headers.authorization; // bearer token

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  const words = token.split(" "); //["Bearer" , "token"]
  const jwtToken = words[1]; //token
  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: "You are not authenticated (invalid token payload)",
      });
    }
  } catch (e) {
    res.status(401).json({
      msg: "Invalid or expired token",
    });
  }

  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;
