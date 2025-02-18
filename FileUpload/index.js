//app create
const express = require("express");
const app = express();

//port find kara hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add karna hai
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

//DB connect karna hai
const db = require("./config/database");
db.connect();

//cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mounting
const Upload = require("./routes/fileUpload");
app.use("/api/v1/upload", Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});