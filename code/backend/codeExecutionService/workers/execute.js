const { parentPort, workerData } = require('worker_threads');
const Language = require('../docker/language/LanguageFactory');
const LanguageContainer = require('../docker/executable');
const { WorkerJob, WorkerSend, WorkerReponse } = require('./job');
const { defaultMaxListeners } = require('events');
const client = require('../grpc/index');

let /** @type LanguageContainer */ dockerContainer;
let /** @type Array<String> */ inps;
let /** @type Array<String> */ outs;

function createWorkerResponse(type) {
  return new WorkerReponse(type, dockerContainer.id, null);
}

async function createContainer(wokerData) {
  console.log("STEP 1: Create Container")
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
      runCode(message.data);
      break;

    case WorkerJob.TYPE.STOP_AND_REMOVE:
      stopAndRemove();
      break;

    case WorkerJob.TYPE.RECREATE_CONTAINER:
      createContainer(message.data);
      break;

    default:
      console.log("Unknow type: " + message.type);
  }
}

/**
 * @param {{buffer : string, fileName : string}} data 
 */
async function createFile(data) {
  console.log("STEP 2: Create Source file")
  let response = createWorkerResponse(WorkerJob.TYPE.CREATE_FILE);
  try {
    await dockerContainer.createFileWithBuffer(data.buffer.replaceAll("\\n", "\\\\n"), data.fileName);
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

async function runCode(data) {
  console.log("STEP 3: Compile && Run code")
  let response = createWorkerResponse(WorkerJob.TYPE.EXECUTING);
  try {
    await getTestCase(data.problemId);
    await dockerContainer.compile();
    let listTestInfo = [];
    for (let index in inps) {
      let runInfo = await dockerContainer.run(inps[index], outs[index]);
      listTestInfo.push(runInfo);
      if (runInfo.status === false) {
        break;
      }
      await dockerContainer.handleFinishCompile(); // restart container to check memory
    }
    response.data = {
      status: true,
      runInfo: listTestInfo
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

async function getTestCase(problemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await new Promise((resolve, reject) => {
        client.getTestCase({ problemId: problemId }, (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data)
          }
        });
      });

      inps = result.inps;
      outs = result.outs;
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}

parentPort.on('message', async function (/** @type WorkerSend */ data) {
  handleSendMessage(data);
})

createContainer(workerData);