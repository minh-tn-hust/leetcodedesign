const Language = require("./docker/language/LanguageFactory");
const { WorkerJob, WorkerReponse } = require("./workers/job");
const fs = require('fs');

console.log(__dirname);


let TYPE = [
  Language.SUPPORTED.CPP,
  Language.SUPPORTED.GO
]

for (let i = 0; i < 10; i++) {
  let languageType = TYPE[Math.round(Math.random() * 1000) % 2];

  let inputFileSource;
  let outputFileName;

  if (languageType === Language.SUPPORTED.CPP) {
    inputFileSource = './A.cpp';
    outputFileName = 'TEST_CPP.cpp';
  } else {
    inputFileSource = './abc.go';
    outputFileName = 'TEST_GO.go';
  }


  let workerJob = new WorkerJob('./workers/execute.js', {
    workerData: {
      languageType: languageType,
      workingDirectory: __dirname + '/source/' + Math.round(Math.random() * 1000)
    }
  });

  setTimeout(function () {
    let readStream = fs.createReadStream(inputFileSource, 'ascii');
    let buffer = "";
    readStream.on('data', function (chunk) {
      buffer += chunk;
      workerJob.sendCreateFile(JSON.stringify(buffer), outputFileName);
    }.bind(this));
  }, 5000);
}