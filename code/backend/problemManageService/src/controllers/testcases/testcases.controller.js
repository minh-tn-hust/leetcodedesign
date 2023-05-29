const db = require('../../models');
const upload = require('../../middlewares/uploadFile');
const e = require("express");

const Testcase = db.testcase;
const Problem = db.problem;
const TestcaseFile = db.uploadTestcaseFile;


exports.uploadTestcaseFile = async function(req, res) {
    upload.single('file')(req, res, async (error) => {
        if (error) {
            console.error(error);
            return  res.status(400).json({message : "Error uploading, please try again later"});
        }

        if (!req.file) {
            return res.status(400).json({message : "No file was uploaded"});
        }

        try {
            const fileData = {
                filename : req.file.filename,
                originalFile : req.file.originalname,
                mimetype : req.file.mimetype,
                path: req.file.path
            };
            console.log(JSON.stringify(req.file));

            let createdFile = await TestcaseFile.create(fileData);
            return res.status(200).json({ message: 'File uploaded successfully!', file: createdFile });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to upload file!', error: error.message });
        }
    })
}

exports.editTestcaseFile = async function(req, res) {

}

exports.addTestcase = function(req, res) {

}