const Language = require("./docker/language/LanguageFactory");
const { WorkerJob, WorkerReponse } = require("./workers/job");
const fs = require('fs');

console.log(__dirname);


let workerJob = new WorkerJob('./workers/execute.js', {
  workerData: {
    languageType: Language.SUPPORTED.GO,
    workingDirectory: __dirname + '/source/' + Math.round(Math.random() * 1000)
  }
});

setTimeout(function () {
  let readStream = fs.createReadStream('./abc.go', 'ascii');
  let buffer = "";
  readStream.on('data', function (chunk) {
    buffer += chunk;
    workerJob.sendCreateFile(JSON.stringify(buffer), 'A.go');
  }.bind(this));
}, 5000);