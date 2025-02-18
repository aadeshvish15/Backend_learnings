const express = require('express');
const router = express.Router();

// imageUpload, videoUpload, imageReducerUpload,
const { localFileUpload, imageUpload, videoUpload,imageSizeReducer } = require('../controllers/fileUpload');
//f errror do research
//api route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;