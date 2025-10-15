const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
// Middleware for handling auth

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);

        if (decodedValue.username) {
            req.username = decodedValue.username;
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            });
        }
    } catch (err) {
        res.status(401).json({ msg: "Invalid or expired token" });
    }
}

module.exports = userMiddleware;