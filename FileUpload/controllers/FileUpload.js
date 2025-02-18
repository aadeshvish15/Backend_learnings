const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//Localfileupload -> handler function
exports.localFileUpload = async (req, res) => {
    try {
        //fetch file
        const file = req.files.file;
        console.log("File aagyi->",file);
        
        let path = __dirname + "/files/" + Date.now()+`. ${file.name.split('.')[1]}`;
        console.log("Path-->",path);
        
        file.mv(path, (err) => {
            console.log(err);
        });
        res.json({
            success: true,
            message: 'Local file uploaded successfully'
        });
    } catch (error) {
        console.log(error);
    }
}



function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,height,width) {
    const options = { folder };
    if (width&&height) {
        options.width = width;
        options.height = height;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath,options);
}



//Image upload handler
exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        
        const file = req.files.imageFile;
        // console.log(file);
        
        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).jspn({
                success: false,
                message: "File format not supported",
            });
        }         

        //file format supported hai
        const response = await uploadFileToCloudinary(file, "Codehelp");
        // console.log(response);

        //DB me entry save 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageURL:response.secure_url
        });
        console.log(fileData);
        

        res.status(200).json({
            success: true,
            imageURL:response.secure_url,
            message: "File uploaded successfully to cloudinary",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error uploading file to cloudinary",
        })
    }
}




//Video Upload
exports.videoUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        // console.log(name, tags, email);
        
        const file = req.files.videoFile;
        // console.log(file);
        
        //Validation
        const supportedTypes = ["mov", "mp4"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //TODO  --- add upper limit of 5MB
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).jspn({
                success: false,
                message: "File format not supported",
            });
        }         

        //file format supported hai
        const response = await uploadFileToCloudinary(file, "Codehelp");
        // console.log(response);

        //DB me entry save 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageURL:response.secure_url
        });
        // console.log(fileData);        

        res.status(200).json({
            success: true,
            videoURL:response.secure_url,
            message: "File uploaded successfully to cloudinary",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error uploading file to cloudinary",
        })
    }
}




//Image Size reducer
exports.imageSizeReducer = async (req,res) =>{
    try {
         //data fetch
         const { name, tags, email } = req.body;
         // console.log(name, tags, email);
         
         const file = req.files.imageRedFile;
        console.log(file);
        
         //Validation
         const supportedTypes = ["jpg", "jpeg", "png"];
         const fileType = file.name.split('.')[1].toLowerCase();
 
         //TODO  --- add upper limit of 5MB
         if (!isFileTypeSupported(fileType, supportedTypes)) {
             return res.status(400).jspn({
                 success: false,
                 message: "File format not supported",
             });
         }         
        //height attribite compress
        const height = 500;
        const width = 600;
        // 
        //file format supported hai
        const response = await uploadFileToCloudinary(file, "Codehelp",height,width);
        
         // console.log(response);
 
         //DB me entry save 
         const fileData = await File.create({
             name,
             tags,
             email,
             imageURL:response.secure_url
         });
         // console.log(fileData);        
 
         res.status(200).json({
             success: true,
             videoURL:response.secure_url,
             message: "File uploaded successfully to cloudinary",
         })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error uploading file to cloudinary",
        })
    }
}