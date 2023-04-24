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

# Go
## Giá trị trả về được đặt tên
>Go trả về các giá trị có thể đặt tên. Bởi vậy, chúng được đối xử như là các biến được định nghĩa ở top của hàm. Những biến này nên được sử dụng để chú thích cho ý nghĩa của biến được trả về

Đối với câu lệnh `return` trong một hàm mà không trả về tham số nào, nó sẽ trả về các giá trị được trả về đã được đặt tên. Điều này được xem như là các một các `return trần trụi (naked return)`
Hạn chế trả về kiểu này, chỉ được sử dụng trong các hàm ngắn, như ví dụ được show dưới đây. Chúng có thể phá hoại khả năng đọc được của các function dài hon
```go
package main

import "fmt"

func split(sum int) (x int, y int) {
	x = sum * 4 / 9
	y = sum - x
}

func main() {
	fmt.Println(split(17))
}
```
## Biến
Câu lệnh `var` khai báo danh cách nhiều biến, như trong danh sách tham số của hàm, `TYPE` sẽ được đặt ở cuối
Câu lệnh `var` có thể sử dụng được ở cả package hoặc function
```go
package main
import "fmt"

var c, python, java bool

func main() {
	var i int
	fmt.Println(i, c, python, java)
}
```


## Biến với giá trị khở tạo
Một `var` khai bác bao gồm khởi tạo, cho từng biến một.
Nếu được khởi tạo, `TYPE` có thể được bỏ qua. Biến sẽ lấy type theo khởi tạo
```go
package main

import "fmt"

var i, j int = 1, 2

func main() {
	var c, python, java = true, false, "no!"
fmt.Println(i, j, c, python, java)
}
```

## Khai báo nhanh
Trong một hàm, câu lệnh khai báo nhah `:=` có thể được sử dụng trong trường hợp thay thế cho khai bảo `var` với kiểu tường minh

Bên ngoài hàm, mỗi câu lệnh bắt đầu với keyword (`var`, `func`...) bởi vậy, khởi tạo `:=` không được phép

```go
package main

import "fmt"
h := 4 // <----- lỗi ngay tại chỗ này
func main() {
	var i, j int = 1, 2
	k := 3
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java)
}
```


## Các type cơ bản
Các kiểu dữ liệu cơ bản trong Go là
```go
bool
string

int int8 int16 int32 int64
uint unit8 unit16 unit32 unit64 unitptr

byte // alias for unit8

rune // giống với int32, sử dụng đe biểu diễn Unicode

float32 float64

complex64 complex128
```

Check ví dụ dưới đây
```go
package main

import (
	"fmt"
	"math/cmplx"
)

var (
	ToBe bool = false
	MaxInt unit64 = 1<<64 - 1
	z complex128 = complx.Sqrt(-5 + 12i)
)

func main() {
	fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)
	fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt)
	fmt.Printf("Type: %T Value: %v\n", z, z)
}
```

Như ví dụ trên, việc khai báo biến chúng ta cũng có thể khai bác thành các block giống như import


## Giá trị Zero
Biến được khai báo mà không có giá trị tường minh sẽ được gán bằng `zero value`

Giá trị của `zero`
```go
0 dành cho các kiểu số
false dành cho kiểu bool
"" dành cho các xâu trống
```


## Ép kiểu
Biểu thức `T(v)` chuyển giá trị `v` về kiểu `T`
Một số ép kiểu kiểu số:
```go
var i int = 42
var f float64 = float64(i)
var f float64 = i // <----- lỗi luôn dòng này
var u uint = uint(f)

```

Không giống như C, trong Go khai báo giữa các item khác type yêu cầu ép kiểu tường mình.



## Type inference
Khi khai báo một biến mà không chỉ định kiểu tường mình (kể cả sử dụng cú pháp `:=` hoặc là cú pháp `var = `), kiểu của biến sẽ được suy luận từ gái trị ở bên tay phải
```go
var i int
j := i // j lúc này sẽ có kiểu giống i là kiểu int
```

**Nhưng** khi bên tay phải chứa các hằng số không định kiểu kiểu số, một biến mới có thể có thể là một `int`, `float64` hoặc là `complex128` tùy thuộc vào tính rõ ràng của hằng số
```go
i := 42 // --> lúc này i sẽ là int
f := 3.142 // --> lúc này f sẽ là float64
g :== 0.867 + 0.5i // --> lúc này g sẽ là keieur complex
```


## Hằng số
Hằng số được khai báo như là biến, nhưng với từ khóa `const`

Hằng số có thẻ là kí tự, chuỗi, boolean, hoặc là số

Hằng osos không thể  khai báo với cú pháp `:=`

```go
package main

import "fmt"

const Pi = 3.14

func main() {
	const World = "Thế giới"
	fmt.Println("Hello", World)
	fmt.Println("Happy", Pi, "Day")

	const Truth = true
	fmt.Println("Go rules?", Truth)
	fmt.Println("%T", Pi)
}
```

```console
Hello Thế giới
Happy 3.14 Day
Go rules? true
%T 3.14
```




## Hằng số
Hằng số là những giá trị có độ chính xác ca
Một hằng số không được địn kiểu, sẽ lấy kiểu nó cần trong trường từng ngữ cảnh
```go
package main

import "fmt"

const (
	// Create a huge number by shifting a 1 bit left 100 places.
	// In other words, the binary number that is 1 followed by 100 zeroes.
	Big = 1 << 100
	// Shift it right again 99 places, so we end up with 1<<1, or 2.
	Small = Big >> 99
)

func needInt(x int) int { return x*10 + 1 }
func needFloat(x float64) float64 {
	return x * 0.1
}

func main() {
	fmt.Println(needInt(Small))
	fmt.Println(needFloat(Small))
	fmt.Println(needFloat(Big))
	
	fmt.Println("=================================")
	fmt.Println(uint64(needInt(Big)))
}

```

## Vòng lặp
Go chỉ có duy nhất một cấu trúc vòng lặp đó chính la vòng lặp `for`
Cơ bản vòng lặp `for` có 3 thành phần được ngăn cách bởi các dấu chấm phẩy:
- Câu lệnh khởi đầu: thực thi trước khi được duyệt lần đầu tiên
- Biểu thức điều kiện: được đánh giá sau mỗi lần duyệt
- Câu lệnh sau cùng: thực thi khi end mỗi lần lặp

Câu lệnh khởi đầu thường là một biến được khai báo ngắn, và biến được khai báo ở chỗ này chỉ có thể sử dụng trong phạm vị của vòng lặp `for`

**NOTE** Không giống như các ngôn ngữ khác như C, Java hoặc JS, ở đây không có dấu đóng ngoặc ở xung quanh 3 thành phần của câu lệnh `for` và dẫu `{` `}` luôn luôn được yêu cầu

```go
package main
import "fmt"

func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}

	for (i := 0; i < 10; i++) {
		sum += i
	}

	fmt.Println(sum)
}
```

## For trong Go như là while
```go
package main

import "fmt"

func main() {
	sum := 1
	for (sum < 1000) {
		sum += sum
	}
}
```

## For mãi mãi
```go
package main

func main() {
	for {
	}
}
```

## Câu lệnh if
Giống như câu lệnh vòng lặp for; biểu hức không cần phải có xung quanh các ngoặc `()` nhưng `{}` luôn luôn phải được yêu cầu
```go
package main

import (
	"fmt"
	"math"
)

func sqrt(x float64) (string) {
	if x < 0 {
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}

func main() {
	fmt.Println(sqrt(2), sqrt(-4))
}
```
## Lệnh if với một câu lệnh ngắn
Giống như `for`, câu lệnh `if` có thể bắt đầu với một câu lệnh ngắn để thực thi trước điều kiện

Biến được khoải tạo bằng câu lệnh ở đây chỉ có phạm vi cho tới cuối vòng if
```go
package main
import (
	"fmt"
	"math"
)

func pow(x, n, lim float64) (float64) {
	if v:=math.Pow(x, n); v < lim {
		fmt.Println("0h v = %d", v)
	}
	fmt.Println("0h v = %d", v)
	return lim
}

func main() {
	fmt.Println(
		pow(3, 2, 10),
		pow(3, 3, 20)
	)
}
```

## If và else
Biến được khai bảo ở trong câu lệnh ngắn `if` cũng khả dụng bên trong bất kì block `else` nào
```go
package main
import (
	"fmt"
	"math"
)

func pow(x, n, lim float64) (float64) {
	if v := math.Pow(x, n); v < lim {
		return v
	} else if (true) {
		fmt.Printf("1%g >= %g\n", v, lim)
	} else if (true) {
		fmt.Printf("2%g >= %g\n", v, lim);
	}

	return lim
}
```


## Câu lệnh switch
```go
func main() {
	fmt.Print("Go runs on")
	os := runtime.GOOS;
	switch os {
		case "darwin":
			fmt.Println("OS X")

		case "linux":
			fmt.Println("Linux")

		default:
			fmt.Printf("%s\n", os)
	}
}
```

Đối với câu lệnh `switch\case`, trong `Go` sẽ tự động bổ sung câu lệnh `break`
Câu lệnh `switch\case` thực thi từ trên xuoogns dưới, dùng lại khi mà gặp được trường hợp đúng
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Prinln("When's Saturday?")
	today := time.Now().Weekday()
	switch timeSaturday {
		case today + 0:
			fmt.Println("Today")
		case today + 1:
			fmt.Println("Tomorrow")
		case today + 2:
			fmt.Prinln("In tow days")
		default:
			fmt.Println("Too far away")
	}
}
```

## Switch không có điều kiện
Switch không có điều kiện giống như `switch true`

Cấu trúc này la một các sạch sẽ để viết một `if-then-else` dài

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	t := time.Now()
	switch {
		case t.Hour() < 12:
			fmt.Println("Good morning!")
		case t.Hour() < 17:
			fmt.Println("Good afternoo.")
		default:
			fmt.Println("Good evenning")
	}
}
```


## Defer
Một câu lệnh trì hoãng là sự thực thi một hàm cho tới khi hàm đó trả về
Các đối số được trì hoãn cho tới khi lệnh đó trả về. Tại vị trí gọi `defer` giá trị của các biến sẽ được lưu đúng như lúc đó
```go
package main

import "fmt"

func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
}
```

## Chồng defer
Những lời gọi hàm defer đưuọc đẩy vào bên trong Stack. khi một hàm trả về, các lời gọi defer sẽ được thưc thi theo thứ tự last-in-fist-out