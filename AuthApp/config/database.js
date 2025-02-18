const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("DB connected successfully")
        })
        .catch((err) => {
            console.log("Error connecting to DB", err);
            console.error(err);
            process.exit(1);
        });
}