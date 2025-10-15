const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// User Routes
router.post("/signin", async (req, res) => {
  // Implement user signin logic
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    res.json({
      token, //return token to user
    });
  } else {
    res.status(411).json({
      message: "Incorrect email and password",
    });
  }
});

router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username,
    password,
  });
  res.json({
    message: "User created successfully",
  });
});

router.get("/courses",  async(req, res) => {
  // Implement listing all courses logic
   const courses =  await Course.find({});
      res.json({ courses: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.username;
  console.log(username);

 const courseId = req.params.courseId;

 
    // Validate the courseId format
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: "Invalid Course ID format" });
    }

   try{
     await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    });

    res.json({ message: "Course purchased successfully" });
   }catch(e){
    res.status(500).json({ message: "Could not purchase course" });
   }


});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic

    const username = req.username;
     const user =  await User.findOne({
        username: username
     })
     const purchasedCourses = await Course.find({
        _id: { $in: user.purchasedCourses }
        });
        res.json({ purchasedCourses: purchasedCourses })

});

module.exports = router;
