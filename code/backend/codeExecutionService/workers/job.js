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
    /** @type Worker */ worker = null;
    /** @type isRunning */ isRunning = null;

    /**
     * @param {string} filename 
     * @param {WorkerOptions} options 
     */
    constructor(filename, options) {
        this.createDirectoryIfNotExists(options.workerData.workingDirectory);
        this.worker = new Worker(filename, options);
        this.isRunning = false;
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

            default:
                throw "TYPE NÀY CHƯA ĐƯỢC HỖ TRỢ: TYPE = " + response.type
        }

    };

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

    /**
     * @param {WorkerReponse} workerResponse 
     */
    handleCreateFile(workerResponse) {
        if (workerResponse.data === true) {
            this.sendRunning();
        } else {
            console.log(workerResponse.data);
        }
    }

    handleCompiling() {

    }

    handleRunning(response) {
        console.log(response);
    }

    /**
     * @param {WorkerReponse} workerResponse 
     */
    handleStart(workerResponse) {
        console.log("Create and start container success with id = " + workerResponse.containerId);
    }
}

WorkerJob.TYPE = {
    STARTING: 'starting',
    CREATE_FILE: 'createa_file',
    EXECUTING: 'executing'
}

module.exports = {
    WorkerJob: WorkerJob,
    WorkerReponse: WorkerReponse,
    WorkerSend : WorkerSend
}