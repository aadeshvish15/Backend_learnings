const express = require("express"); 
const router = express.Router();

const { login, signup } = require("../controllers/Auth");
const { authmid, isStudent, isAdmin } = require("../middlewares/authmid");

router.post("/login", login);
router.post("/signup", signup);


//testing protected routes for single middleware
router.get("/test", authmid, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for test",
    });
});


//Protected routes
router.get("/student", authmid, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for students",
    });
});

router.get("/admin", authmid, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for admins",
    });
});


module.exports = router;