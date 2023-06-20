const Language = require("./docker/language/LanguageFactory");
const { WorkerJob } = require("./workers/job");
const {JobData, WorkerQueueSingleton} = require("./workers/queue");

var workerQueue = WorkerQueueSingleton.getInstance();


for (let i = 0; i < 30; i++) {
    let random = Math.floor(Math.random() *10000)  % 2;
    if (random === 0) {
        workerQueue.addJob(new JobData(2000, 256, Language.SUPPORTED.CPP));
    } else {
        workerQueue.addJob(new JobData(2000, 256, Language.SUPPORTED.GO));
    }
}
