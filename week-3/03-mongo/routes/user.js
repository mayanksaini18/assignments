const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const mongoose = require("mongoose");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
     const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ message: "User with this username already exists" });
    }

    try {
        await User.create({
            username: username,
            password: password
        });
        res.json({ message: "User created successfully" });
    } catch (e) {
        res.status(500).json({ message: "Could not create user" });
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json({ courses: courses });

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
 
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

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
     const user =  await User.findOne({
        username: username
     })
     const purchasedCourses = await Course.find({
        _id: { $in: user.purchasedCourses }
        });
        res.json({ purchasedCourses: purchasedCourses });
});

module.exports = router