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


exports.addTestcase = async function(req, res) {
    const userId = req.userId;
    const authendedRoles = req.authenedRoles;

    let ownerId = req.userId;
    let isExample = req.body.isExample;
    let explanation = req.body.explanation;
    let inp = req.body.inp;
    let out = req.body.out;
    let problemId = req.body.problemId;

    try {
        let data = {
            ownerId : ownerId,
            isExample : isExample,
            explanation : explanation,
            inp : inp,
            out : out,
            problemId : problemId
        }
        console.log(data);
        let testCase = await Testcase.create(data);
        res.status(200).send({message : "Tạo test case thành công"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message : "Bạn phải tạo Problem trước khi thêm test case"});
    }
}