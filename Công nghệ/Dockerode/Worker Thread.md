# Tương tác
```js
const { Worker } = require('worker_threads');

// Số lượng worker threads cần tạo
const numWorkers = 20;

// Mảng chứa các worker threads
const workers = [];

// Callback được gọi khi worker thread gửi message về
function onWorkerMessage(workerIndex, message) {
  console.log(`Worker ${workerIndex} message:`, message);
}

// Callback được gọi khi worker thread hoàn thành công việc
function onWorkerExit(workerIndex, code) {
  console.log(`Worker ${workerIndex} exited with code ${code}`);
}

// Tạo và khởi chạy các worker threads
for (let i = 0; i < numWorkers; i++) {
  const worker = new Worker('./workers/woker.js', {workerData : "Hello world from main thread"});

  // Gán callback cho sự kiện 'message' của worker thread
  worker.on('message', message => {
    onWorkerMessage(i, message);
  });

  // Gán callback cho sự kiện 'exit' của worker thread
  worker.on('exit', code => {
    onWorkerExit(i, code);
  });

  // Lưu worker thread vào mảng
  workers.push(worker);
}

// Gửi message tới từng worker thread
for (let i = 0; i < numWorkers; i++) {
  const worker = workers[i];
  worker.postMessage(`Hello from Worker ${i}`);
}

// Kết thúc các worker threads
for (let i = 0; i < numWorkers; i++) {
  const worker = workers[i];
  worker.postMessage('exit');
}
```



# Đoạn code tưởng chừng có thể hoạt động được
```js
class ContainerManagement {
  /** @type Array<Worker> */ listContainer = null;

  constructor() {
    this.listContainer = {};
  };


  createNewContainer(languageType) {
    let languageConfig = Language.create(languageType, __dirname);
    let container = new LanguageContainer(languageConfig);
    return container;
  }

  /**
   * @param {Language.SUPPORT} languageType 
   * @param {*} container 
   */
  async updateLanguageConfig(languageType, container) {

  }

  /**
   * @param {Language.SUPPORT} languageType 
   */
  getContainerWithLanguage(languageType) {
    let /** @type Array<LanguageContainer> */ poolContainer = this.listContainer[languageType];

    if (poolContainer) {
      const availableContainer = poolContainer.find(container => !container.isExecuting);

      if (availableContainer) {
        return availableContainer;
      }
    }

    let newContainer = this.createNewContainer(languageType);
    console.log(newContainer);
    if (!newContainer) {
      return null;
    }

    if (poolContainer) {
      poolContainer.push(newContainer);
      return newContainer;
    }

    this.listContainer[languageType] = [newContainer];
    return newContainer;
  }
};
```
Đoạn code trên tưởng chừng có thể hoạt động được để kiểm soát việc khởi tạo và chạy các Docker Container cho đến khi biết được wokerData chỉ thực hiện clone() chứ không phải là sử dụng instance từ `MainThread`
# Stuck with multithreading in NodeJS


# Fucking shit with ' and " in Linux echo command