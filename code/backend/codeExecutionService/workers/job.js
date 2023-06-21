const { Worker } = require("worker_threads");
const fs = require('fs');
const Language = require("../docker/language/LanguageFactory");

class WorkerReponse {
    /** @type WorkerJob.TYPE */ type = null;
    /** @type containerId */ containerId = null;
    /** @type Object */ data = null;

    constructor(type, containerId, data) {
        this.containerId = containerId;
        this.type = type;
        this.data = data;
    }
}

class WorkerSend {
    /** @type WorkerJob.TYPE*/ type = null;
    /** @type Object */ data = null;
}


class WorkerJob {
    /** @type {Worker} */ worker = null;
    /** @type {WorkerJob.STATUS} */ status = null;

    /** @type {WorkerQueue} */ queue = null;
    /** @type {JobData} */ data = null;

    /**
     * @param {WorkerJob.STATUS} status 
     */
    setStatus(status) {
        this.status = status;
    }

    /**
     * @param {JobData} data 
     */
    setData(data) {
        this.data = data;
    }

    runJob() {
        let inputFileSource;
        let outputFileName;

        if (this.data.languageType === Language.SUPPORTED.CPP) {
            inputFileSource = './A.cpp';
            outputFileName = 'TEST_CPP.cpp';
        } else {
            inputFileSource = './abc.go';
            outputFileName = 'TEST_GO.go';
        }

        let readStream = fs.createReadStream(inputFileSource, 'ascii');
        let buffer = "";
        readStream.on('data', function (chunk) {
            buffer += chunk;
            this.sendCreateFile(JSON.stringify(buffer), outputFileName);
        }.bind(this));
    }

    /**
     * @param {string} filename 
     * @param {{workerData : {languageType : Language.SUPPORTED, workingDirectory : string}}} options 
     * @param {WorkerQueue} queue
     */
    constructor(filename, options, queue) {
        this.createDirectoryIfNotExists(options.workerData.workingDirectory);
        console.log("Worker Options: " + JSON.stringify(options));
        this.worker = new Worker(filename, options);
        this.queue = queue;
        this.setStatus(WorkerJob.STATUS.CREATING);

        this.initWorker();
    }

    createDirectoryIfNotExists(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }
    }

    initWorker() {
        this.worker.on('message', function (data) {
            this.handleWorkerResponse(data);
        }.bind(this));

        this.worker.on('exit', function (exitCode) {
            console.log('Worker exit with code: ' + exitCode);
        });
    }

    sendRecreateNewContainer(workerData) {
        this.setStatus(WorkerJob.STATUS.CREATING);
        let send = new WorkerSend();
        send.type = WorkerJob.TYPE.RECREATE_CONTAINER;
        send.data = workerData;
        this.worker.postMessage(send);
    }

    sendUpdateTimeLimited(newTimeLimited) {
        this.setStatus(WorkerJob.STATUS.RUNNING);
        let send = new WorkerSend();
        send.type = WorkerJob.TYPE.UPDATE_TIME_LIMITED;
        send.data = {
            timeLimited: newTimeLimited
        };

        this.worker.postMessage(send);
    }

    sendCreateFile(bufferData, fileName) {
        this.setStatus(WorkerJob.STATUS.RUNNING);
        let send = new WorkerSend();
        send.type = WorkerJob.TYPE.CREATE_FILE;
        send.data = {
            buffer: bufferData,
            fileName: fileName
        }
        this.worker.postMessage(send);
    }

    sendRunning() {
        this.setStatus(WorkerJob.STATUS.RUNNING);
        let send = new WorkerSend();
        send.type = WorkerJob.TYPE.EXECUTING;
        this.worker.postMessage(send);
    }

    sendStop() {
        this.setStatus(WorkerJob.STATUS.STOP);
        let send = new WorkerSend();
        send.type = WorkerJob.TYPE.STOP_AND_REMOVE;
        this.worker.postMessage(send);
    }

    /**
     * @param {WorkerReponse} response
     */
    handleWorkerResponse(response) {
        switch (response.type) {
            case WorkerJob.TYPE.CREATE_FILE:
                this.handleCreateFileFinish(response);
                break;

            case WorkerJob.TYPE.COMPILING:
                this.handleCompilingFinish(response);
                break;

            case WorkerJob.TYPE.EXECUTING:
                this.handleRunningFinish(response);
                break;

            case WorkerJob.TYPE.STARTING:
                this.handleStartFinish(response);
                break;

            case WorkerJob.TYPE.STOP_AND_REMOVE:
                this.handleStopFinish(response);
                break;

            default:
                throw "TYPE NÀY CHƯA ĐƯỢC HỖ TRỢ: TYPE = " + response.type
        }

    };

    /**
     * @param {WorkerReponse} workerResponse 
     */
    handleCreateFileFinish(workerResponse) {
        if (workerResponse.data === true) {
            this.sendRunning();
            this.setStatus(WorkerJob.STATUS.RUNNING);
        } else {
            console.log(workerResponse.data);
        }
    }

    handleCompilingFinish() {

    }

    handleRunningFinish(response) {
        this.setStatus(WorkerJob.STATUS.AVAILABLE);
        this.setData(null);
        console.log(response);
        this.queue.runNextJob();
    }

    /**
     * @param {WorkerReponse} workerResponse 
     */
    handleStartFinish(workerResponse) {
        if (workerResponse.data === true) {
            this.setStatus(WorkerJob.STATUS.RUNNING);
            this.runJob()
        } else {
            console.log(workerResponse.data);
        }
    }

    async handleStopFinish(workerResponse) {
        if (workerResponse.data === true) {
            try {
                this.status = WorkerJob.STATUS.STOP;
                this.queue.removeContainer();
            } catch (error) {
                console.log("STOP ERRROR : " + error);
            }
        } else {
            console.log(workerResponse.data);
        }
    }
}

WorkerJob.TYPE = {
    STARTING: 'starting',
    CREATE_FILE: 'createa_file',
    EXECUTING: 'executing',
    UPDATE_TIME_LIMITED: 'update_time_limited',
    STOP_AND_REMOVE: 'stop_and_remove',
    RECREATE_CONTAINER : 'recreate_container'
}

WorkerJob.STATUS = {
    CREATING: 'creating',
    AVAILABLE: 'ready_for_use',
    RUNNING: 'running',
    STOP: 'stop',
    TERMINATE : 'terminate'
}

module.exports = {
    /** @type WorkerJob */ WorkerJob: WorkerJob,
    /** @type WorkerReponse */ WorkerReponse: WorkerReponse,
    /** @type WorkerSend */ WorkerSend: WorkerSend
}