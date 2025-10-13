const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// secret key for JWT
const SECRET ="mayank-secret"

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)


app.get("/", (req, res) => {
    res.send("welcome to course app");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {app, SECRET};