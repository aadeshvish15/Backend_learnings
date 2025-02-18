const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
    {
        //createtodo jo control mapping me create me karunga ie createtodo object banao aur usse db me insert kardo 
        title: {
            type: String,
            required: true,
            maxLength:50
        },
        description :{
            type: String,
            required: true,
            maxLength: 50
        },
        createdAt : {
            type: Date,
            required:true,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now(),
        }   
    }
);

module.exports = mongoose.model("Todo", todoSchema);