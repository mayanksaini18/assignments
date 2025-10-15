const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
// Middleware for handling auth

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken,JWT_SECRET);

    if (decodedValue.username) {
        req.username = decodedValue.username;
        req.randomData = "Adsadsadsadssd";
        next();
    }
    else{
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;