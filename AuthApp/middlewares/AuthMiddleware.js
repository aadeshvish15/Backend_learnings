const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.AuthMiddleware = (req, res, next) => {
    try {
        //cookies,jwt-header,req.body can be used to fetch token
        const token = req.cookies.token || req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }
        //verify
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(payload);
        // console.log("cookie", req.cookies.token);
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong,while verifying the token"
        });
    };
};

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "You are not a student"
            });
        };
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    };
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "You are not a admin"
            });
        };
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    };
}