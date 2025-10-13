const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");

const { Admin } = require("../db/index");
const { Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  // check if admin already exists

   Admin.create({
    username: username,
    password: password,
  });
    res.json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware,  async(req, res) => {
  // Implement course creation logic
  const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    // check if course with title already exists

    // create course
   const newCourse=  await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    });
    console.log(newCourse);
    res.json({ message: "Course created successfully", CourseId : newCourse._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
   const courses =  await Course.find({});
    res.json({ courses: courses });
});

module.exports = router;
