# Import package
Sau khi sử dụng câu lệnh import để có thể thực hiện sử dụng một package nào đó, để `Go` có thể download và thêm nó vào, cần sử dụng câu lệnh
```bash
go mod tidy
```

Câu lệnh này tiến hành tìm và download các import có trong source code, và thêm nó vào go.mod

# Tạo module

Sử dụng Module được khởi tạo Local
## Bước 1: Tạo module
Khởi tạo module tại vị trí đặt source code bằng
```bash
go mod init <tên_package>
```

## Bước 2: Sử dụng
Tại vị trí muốn sử dụng, tiến hành import:
```
import "tên_package"
```

Lúc này Go không thể chạy được package đã được import bởi vì Go tools sẽ chỉ download được các package đã được publish. Để có thể làm điều này local, mình phải chỉ cho Go biết package chạy local đó là package nào bằng câu lệnh dưới đây
```bash
go mod edit -repace <tên_package>=<đường_dẫn_tới_package>
```

