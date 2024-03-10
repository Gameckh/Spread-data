const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { extractData } = require('../services/extractData');
let router = express.Router();

// Set up multer to handle file uploads
// This configuration stores files on disk
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Make sure this uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('excelFile'), async function (req, res) {
    console.log('start uploading... ');
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const result = await extractData(req.file);
    console.log(result);
    res.send(result);
});

module.exports = router;