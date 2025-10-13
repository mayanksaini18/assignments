const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("welcome to course app");
});
app.use("/admin", adminRouter);
app.use("/users", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
