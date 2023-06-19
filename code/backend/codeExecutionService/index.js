const Language = require("./docker/language/LanguageFactory");
const { WorkerJob, WorkerReponse } = require("./workers/job");
const fs = require('fs');
const { WorkerQueueSingleton, JobData } = require("./workers/queue");

let workerQueue = WorkerQueueSingleton.getInstance();
let jobData = new JobData(2000, 256, Language.SUPPORTED.CPP);

workerQueue.createWorker(jobData);
workerQueue.createWorker(jobData);
workerQueue.createWorker(jobData);
workerQueue.createWorker(jobData);
workerQueue.createWorker(jobData);
workerQueue.createWorker(jobData);
workerQueue.createWorker(jobData);
workerQueue.createWorker(jobData);
workerQueue.createWorker(jobData);
workerQueue.createWorker(jobData);

jobData = new JobData(2000, 256, Language.SUPPORTED.GO);
workerQueue.addJob(jobData);
