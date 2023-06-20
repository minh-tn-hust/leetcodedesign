const db = require("../../models");

const Submission = db.submission;

exports.initServer = async (req, res) => {
    res.status(200).send({message : "Hello World"});
}