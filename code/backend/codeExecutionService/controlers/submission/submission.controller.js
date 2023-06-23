const db = require("../../models");
const { WorkerQueueSingleton, JobData } = require("../../workers/queue");

const Submission = db.submission;

exports.initServer = async (req, res) => {
    res.status(200).send({message : "Hello World"});
}

/**
 * @param {{userId : number, authenedRoles : Array<String>, body : {source : string, problemId : int}, language : String}} req 
 * @param {*} res 
 */
exports.runWithoutStoreData = async (req, res) => {
    let workerQueue = WorkerQueueSingleton.getInstance();
    let jobData = new JobData(2000 /** ms */, 256, req.body.language);
    jobData.source = req.body.source;
    jobData.handleRunFinishCallback = function(data) {
        res.status(200).send(data);
    }
    workerQueue.addJob(jobData);
}

/**
 * @param {{userId : number, authenedRoles : Array<String>, body : {source : string, problemId : int}}} req 
 * @param {*} res 
 */
exports.runWithStoreData = async (req, res) => {
    res.status(200).send({message : "Run With Saving"});
}