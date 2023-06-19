const { Worker } = require("worker_threads");
const fs = require('fs');

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
    /** @type boolean */ isRunning = null;
    /** @type boolean */ canUse = null;
    /** @type {Language.SUPPORTED} */ language = null;

    /** @type {WorkerQueue} */ queue = null;

    /**
     * @param {string} filename 
     * @param {{workerData : {languageType : Language.SUPPORTED, workingDirectory : string}}} options 
     * @param {WorkerQueue} queue
     */
    constructor(filename, options, queue) {
        this.createDirectoryIfNotExists(options.workerData.workingDirectory);
        this.worker = new Worker(filename, options);
        this.isRunning = false;
        this.canUse = false;
        this.language = options.workerData.languageType;
        this.queue = queue

        this.initWorker();
    }

    createDirectoryIfNotExists(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
            console.log(`Directory created: ${directoryPath}`);
        } else {
            console.log(`Directory already exists: ${directoryPath}`);
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

    /**
     * @param {WorkerReponse} response
     */
    handleWorkerResponse(response) {
        console.log(response.type);
        switch (response.type) {
            case WorkerJob.TYPE.CREATE_FILE:
                this.handleCreateFile(response);
                break;

            case WorkerJob.TYPE.COMPILING:
                this.handleCompiling(response);
                break;

            case WorkerJob.TYPE.EXECUTING:
                this.handleRunning(response);
                break;

            case WorkerJob.TYPE.STARTING:
                this.handleStart(response);
                break;

            case WorkerJob.TYPE.STOP_AND_REMOVE:
                this.handleStop(response);
                break;

            default:
                throw "TYPE NÀY CHƯA ĐƯỢC HỖ TRỢ: TYPE = " + response.type
        }

    };

    sendUpdateTimeLimited(newTimeLimited) {
        let send = new WorkerSend();
        send.type = WorkerJob.TYPE.UPDATE_TIME_LIMITED;
        send.data = {
            timeLimited: newTimeLimited
        };

        this.worker.postMessage(send);
    }

    sendCreateFile(bufferData, fileName) {
        let send = new WorkerSend();
        send.type = WorkerJob.TYPE.CREATE_FILE;
        send.data = {
            buffer: bufferData,
            fileName: fileName
        }
        this.worker.postMessage(send);
    }

    sendRunning() {
        let send = new WorkerSend();
        send.type = WorkerJob.TYPE.EXECUTING;
        this.worker.postMessage(send);
    }

    sendStop() {
        let send = new WorkerSend();
        send.type = WorkerJob.TYPE.STOP_AND_REMOVE;
        this.worker.postMessage(send);
    }

    /**
     * @param {WorkerReponse} workerResponse 
     */
    handleCreateFile(workerResponse) {
        if (workerResponse.data === true) {
            this.sendRunning();
            this.isRunning = true;
        } else {
            console.log(workerResponse.data);
        }
    }

    handleCompiling() {

    }

    handleRunning(response) {
        this.isRunning = false;
        console.log(response);
    }

    /**
     * @param {WorkerReponse} workerResponse 
     */
    handleStart(workerResponse) {
        if (workerResponse.data === true) {
            this.canUse = true;
            console.log("START DONE");
            this.queue.runNextJob();
        } else {
            console.log(workerResponse.data);
        }
    }

    handleStop(workerResponse) {
        if (workerResponse.data === true) {
            this.worker.terminate();
            this.canUse = false;
            this.isRunning = false;
            this.queue.removeContainer();
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
    STOP_AND_REMOVE: 'stop_and_remove'
}

module.exports = {
    /** @type WorkerJob */ WorkerJob: WorkerJob,
    /** @type WorkerReponse */ WorkerReponse: WorkerReponse,
    /** @type WorkerSend */ WorkerSend: WorkerSend
}