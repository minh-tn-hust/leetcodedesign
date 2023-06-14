# create Container 
```js
const Docker = require('dockerode');

// Tạo một đối tượng Docker từ Dockerode
const docker = new Docker();

// Tạo một options object để cấu hình container
const options = {
  Image: 'gcc',                // Tên hình ảnh Golang
  Tty: true,                      // Gắn terminal để xem đầu ra
  HostConfig: {
    Binds: [`${__dirname}:/go/src/app`],  // Mount thư mục hiện tại vào container
    Memory: 256 * 1024 * 1024       // Giới hạn bộ nhớ của container (256MB)
  },
  WorkingDir: '/go/src/app'        // Đặt thư mục làm việc trong container
};

// Tạo container từ options đã cấu hình
docker.createContainer(options, (err, container) => {
  if (err) {
    console.log('Đã xảy ra lỗi khi tạo container:', err);
    return;
  }

  // Bắt đầu container
  container.start((err, data) => {
    if (err) {
      console.log('Đã xảy ra lỗi khi khởi động container:', err);
      return;
    }

    // Thực thi lệnh trong container để chạy file Go
    const execOptions = {
      Cmd: ['g++', 'A.cpp', '-o', 'A'],   // Lệnh chạy file Go trong container
      AttachStdout: true,              // Kết nối đầu ra stdout
      AttachStderr: true               // Kết nối đầu ra stderr
    };

    container.exec(execOptions, (err, exec) => {
      if (err) {
        console.log('Đã xảy ra lỗi khi thực thi lệnh trong container:', err);
        return;
      }

      // Gắn kết nối đến đầu ra stdout và stderr của lệnh
      exec.start({ hijack: true, stdin: true }, (err, stream) => {
        if (err) {
          console.log('Đã xảy ra lỗi khi gắn kết nối đến đầu ra của lệnh:', err);
          return;
        }

        // Ghi đầu ra của lệnh vào console
        container.modem.demuxStream(stream, process.stdout, process.stderr);
      });
    });

  });
});

```

# Host Config
- Memory : biến interger sử dụng để biểu thị lượng tài nguyên mà container có thể sử dụng 
- CpuPeriod : 

# Memory Reservation