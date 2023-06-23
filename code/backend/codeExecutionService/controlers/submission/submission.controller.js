const db = require("../../models");
const { WorkerQueueSingleton, JobData } = require("../../workers/queue");

const Submission = db.submission;

exports.initServer = async (req, res) => {
    res.status(200).send({ message: "Hello World" });
}

/**
 * @param {{userId : number, authenedRoles : Array<String>, body : {source : string, problemId : int}, language : String}} req 
 * @param {*} res 
 */
exports.runWithoutStoreData = async (req, res) => {
    let workerQueue = WorkerQueueSingleton.getInstance();
    let jobData = new JobData(2000 /** ms */, 256, req.body.language);
    jobData.source = req.body.source;
    jobData.problemId = req.body.problemId;
    jobData.handleRunFinishCallback = async function (data) {
        res.status(200).send(data);
    }
    workerQueue.addJob(jobData);
}

/**
 * @param {{userId : number, authenedRoles : Array<String>, body : {source : string, problemId : int}}} req 
 * @param {*} res 
 */
exports.runWithStoreData = async (req, res) => {
    let workerQueue = WorkerQueueSingleton.getInstance();
    let jobData = new JobData(2000 /** ms */, 256, req.body.language);
    jobData.source = req.body.source;
    jobData.problemId = req.body.problemId;
    jobData.handleRunFinishCallback = async function(data) {
        try {
            let info = {
                ownerId : req.userId,
                problemId : jobData.problemId,
                source : jobData.source,
                status : JSON.stringify(data),
                language : jobData.languageType
            }
            console.log(info)
            await Submission.create({
                ownerId : req.userId,
                problemId : jobData.problemId,
                source : jobData.source,
                status : JSON.stringify(data),
                language : jobData.languageType
            })
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({message : "Xảy ra lỗi khi thực hiện lưu vào Database"});
        }
    }
    workerQueue.addJob(jobData);
}

/**
 * @param {{userId : number, authenedRoles : Array<String>, body : {source : string, problemId : int}}} req 
 * @param {*} res 
 */
exports.getSubmissionById = async (req, res) => {
    let userId = req.userId;
    let problemId = req.body.problemId;
    if (!problemId) {
        res.status(500).send({message : "problemId không tồn tại"});
        return;
    }
    try {
        let listSubmission = await Submission.findAll({
            where : {
                ownerId : userId,
                problemId : problemId
            }
        })
        let resData = [];
        for (let submission of listSubmission) {
            resData.push(submission.dataValues);
        }
        res.status(200).send({listSubmissions : resData});
    } catch (error) {
        res.status(500).send({message : "Lỗi khi lấy thông tin về Submission"});
    }
}