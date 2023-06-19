const Language = require("../docker/language/LanguageFactory");
const { WorkerJob, default: job } = require("./job");
const fs = require('fs');

class JobData {
    timeLimited = null;
    memoryLimited = null;
    languageType = null;

    constructor(timeLimited, memoryLimited, languageType) {
        this.languageType = languageType;
        this.timeLimited = timeLimited;
        this.memoryLimited = memoryLimited;
    }
}

class WorkerQueue {
    /** @type {Array<JobData>} */ queueJob = null;
    /** @type {Array<WorkerJob>} */ workers = null;
    /** @type {number} */ maxWorker = null;

    /**
     * @param {{maxWoker : number}} config 
     */
    constructor(config) {
        this.maxWorker = config.maxWoker;
        this.workers = [];
        this.queueJob = [];
    };

    /**
     * @param {JobData} jobData 
     */
    createWorker(jobData) {
        if (this.workers.length === this.maxWorker) {
            return;
        }
        let worker = new WorkerJob(
            './workers/execute.js',
            {
                workerData: {
                    languageType: jobData.languageType,
                    timeLimited: jobData.timeLimited,
                    workingDirectory: "C:\\Users\\minht\\OneDrive\\Desktop\\ĐỒ ÁN TỐT NGHIỆP\\code\\backend\\codeExecutionService\\" + '/source/' + Math.round(Math.random() * 1000),
                },
            },
            this
        )

        this.workers.push(worker);
        return worker;
    }

    /**
     * @param {JobData} jobData
     * @return {WorkerJob}
     */
    getAvailableWorker(jobData) {
        for (let /** @type WorkerJob */ worker of this.workers) {
            if (jobData.languageType === worker.language && !worker.isRunning && worker.canUse === true) {
                return worker;
            }
        }

        this.findContainerAndReplace();

        return null;
    }

    findContainerAndReplace() {
        let index = 0;
        for (let /** @type WorkerJob */ worker of this.workers) {
            if (worker.isRunning === false && worker.canUse === true) {
                console.log("STOP WORKER");
                worker.sendStop();
                break;
            }
            index++;
        }
    }

    removeContainer() {
        for (let i = 0; i < this.workers.length; i++) {
            if(this.workers[i].canUse === false) {
                this.workers.splice(i, 1);
                i--;
            }
        }
        console.log("REMOVE CONTAINER DONE");
        this.runNextJob();
    }

    /**
     * @param {JobData} job 
     */
    addJob(job) {
        this.queueJob.push(job);
        console.log("ADD JOB DONE");
        this.runNextJob();
    }

    runNextJob() {
        console.log("CALLING RUN NEXT JOB");
        let nextJob = this.queueJob[0];

        if (!nextJob) {
            console.log("1");
            return;
        }

        let availableWorker = this.getAvailableWorker(nextJob);

        if (!availableWorker || availableWorker.canUse === false) {
            this.createWorker(nextJob);
            return;
        }

        this.queueJob.shift();

        // DEBUG
        let inputFileSource;
        let outputFileName;
        
        if (nextJob.languageType === Language.SUPPORTED.CPP) {
            console.log("CPP LANGUAGE");
            inputFileSource = './A.cpp';
            outputFileName = 'TEST_CPP.cpp';
        } else {
            console.log("GO LANGUAGE");
            inputFileSource = './abc.go';
            outputFileName = 'TEST_GO.go';
        }

        let readStream = fs.createReadStream(inputFileSource, 'ascii');
        let buffer = "";
        readStream.on('data', function (chunk) {
            buffer += chunk;
            availableWorker.sendCreateFile(JSON.stringify(buffer), outputFileName);
        }.bind(this));
        // END DEBUG
    }
}

var WorkerQueueSingleton = (function () {
    var instance;

    function createInstance() {
        instance = new WorkerQueue({ maxWoker: 10 });

        return instance;
    }

    return {
        /**
         * @returns {WorkerQueue}
         */
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = {
    WorkerQueueSingleton: WorkerQueueSingleton,
    JobData: JobData,
    WorkerQueue: WorkerQueue
}