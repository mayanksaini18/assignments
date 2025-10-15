const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");

const { Admin , User , Course } = require("../db/index");

const {JWT_SECRET} = require("../config");
const router = Router();
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  
   await Admin.create({
    username,
    password
  })
  res.json({
    message: "Admin created successfully"
  })

});


// Admin Routes
router.post("/signin", async (req, res) => {
  // Implement admin signin logic
  const username = req.body.username;
  const password = req.body.password;
  
  const admin = await Admin.findOne({
    username,
    password
  
  })
  if (admin) {
    const token = jwt.sign({
      username
      }, JWT_SECRET);

    res.json({
      token //return token to user 
    })
  }else{
    res.status(411).json({
      message: "Incorrect email and password"
    })
  }
});



router.post("/courses", adminMiddleware,  async(req, res) => {
  // Implement course creation logic
  const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    

    // create course
   const newCourse=  await Course.create({
         title,
         description,
         price,
         imageLink
    });
    
    console.log(newCourse);

    res.json({ 
      message: "Course created successfully", CourseId : newCourse._id 
    });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
   const courses =  await Course.find({});
    res.json({ courses: courses });
});

module.exports = router;
