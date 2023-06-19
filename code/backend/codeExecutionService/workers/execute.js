const { parentPort, workerData } = require('worker_threads');
const Language = require('../docker/language/LanguageFactory');
const LanguageContainer = require('../docker/executable');
const { WorkerJob, WorkerSend, WorkerReponse } = require('./job');
const { defaultMaxListeners } = require('events');

function createWorkerResponse(type) {
  return new WorkerReponse(
    type,
    dockerContainer.id,
    null
  );
}

let /** @type LanguageContainer */ dockerContainer;
async function createContainer(wokerData) {
  console.log(workerData);
  const /** @type Language.SUPPORTED */ languageType = wokerData.languageType;
  const timeLimited = wokerData.timeLimited;
  const executionPath = workerData.workingDirectory;
  const language = Language.create(languageType, executionPath);

  try {
    dockerContainer = new LanguageContainer(language, timeLimited);
  } catch (error) {
    response.data = error;
  }

  let response = createWorkerResponse(WorkerJob.TYPE.STARTING);
  try {
    await dockerContainer.initContainer();
    response.data = true;
  } catch (error) {
    response.data = error;
  }

  parentPort.postMessage(response);
}

/**
 * @param {WorkerSend} message 
 */
function handleSendMessage(message) {
  switch (message.type) {
    case WorkerJob.TYPE.UPDATE_TIME_LIMITED:
      updateTimeLimited(message.data);
      break;
    case WorkerJob.TYPE.CREATE_FILE:
      createFile(message.data)
      break;

    case WorkerJob.TYPE.EXECUTING:
      runCode();
      break;

    case WorkerJob.TYPE.STOP_AND_REMOVE:
      stopAndRemove();
      break;

    default:
      console.log("Unknow type: " + message.type);
  }
}


/**
 * @param {{buffer : string, fileName : string}} data 
 */
async function createFile(data) {
  let response = createWorkerResponse(WorkerJob.TYPE.CREATE_FILE);
  try {
    await dockerContainer.createFileWithBuffer(JSON.parse(data.buffer).replaceAll("\\n", "\\\\n"), data.fileName);
    updateFileName(data.fileName);
    response.data = true;
  } catch (error) {
    response.data = error;
  }
  parentPort.postMessage(response);
}

function updateFileName(fileName) {
  let language = dockerContainer.language;
  language.updateFilename(fileName);
}

async function runCode() {
  let response = createWorkerResponse(WorkerJob.TYPE.EXECUTING);
  try {
    await dockerContainer.compile();
    let runInfo = await dockerContainer.run();
    response.data = {
      status: true,
      runInfo: runInfo
    };
  } catch (error) {
    response.data = {
      status: false,
      runInfo: error
    };
  }
  parentPort.postMessage(response);
}

async function stopAndRemove() {
  console.log("START REMOVE");
  let response = createWorkerResponse(WorkerJob.TYPE.STOP_AND_REMOVE);
  try {
    await dockerContainer.stopAndRemoveContainer();
    response.data = true;
  } catch (error) {
    response.data = error;
  }

  parentPort.postMessage(response);
}

/**
 * @param {{timeLimited : number}}
 */
function updateTimeLimited(data) {
  dockerContainer.updateTimelimited(data.timeLimited);
}

createContainer(workerData);

parentPort.on('message', async function (/** @type WorkerSend */ data) {
  handleSendMessage(data);
})