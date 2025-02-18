const bcrypt = require("bcrypt");
const User = require("../models/Usermodel");
const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler
exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        
        //check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success:false,
                message: "Email already exist"
            });
        }

        //secure password
        let hashedPassword;
        try {
             hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing function"
            });
        }

        //create entry for User
        const user = await User.create({
            name, email, password: hashedPassword, role
        });
        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"User cannot be registered",
        })
}
}

//Login
exports.login = async (req,res) => {
    try {
        //data fetch
        const { email, password } = req.body;
        //email and password validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully",
            });
        }

        //check for registered user
        let user = await User.findOne({ email });
        //if not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            });
        }
        const payload = {
            email: user.email,
            id: user._id,
            role:user.role,            
        }
        //verify password & generate a JWT token
        if (await bcrypt.compare(password, user.password)) {
            //password match
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn:"2h",
                                }
            );
            user = user.toObject(); //You can't directly modify certain properties due to Mongoose's internal tracking.toObject() converts Mongoose document to plain JavaScript object Plain objects can be freely modified
            // This removes Mongoose's wrapper and special behaviors
            user.token = token;
            user.password = undefined;
            // console.log(user);
            
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }
            // res.cookie("token", token, options).status(200).json({
            //     success: true,
            //     token,
            //     user,
            //     message:"User logged in successfully"
            // })
            res.status(200).json({
                success: true,
                token,
                user,
                message:"User logged in successfully"
            })
        }
        else {
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login failure"
        });
    }
}