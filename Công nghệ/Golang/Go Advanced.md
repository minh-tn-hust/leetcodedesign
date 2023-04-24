## Con trỏ
Go có các con trỏ. Một con trỏ nắm dữ địa chỉ bộ nhớ của một giá trị
Kiểu `*T*` là một con trỏ của giá trị kiểu `T`. Giá trị `Zero` của nó là `nil`
```go
var p *int
```

Toán tử `&` sinh ra một con trỏ tới toán hạng của nó
```go
i := 42
p = &i
```

Toán tử `*` biểu thị giá trị cơ bản của con trỏ
```go
fmt.Println(*p*) // đọc i thông qua con trỏ p
*p = 21 // thiết lập i thông qua con trỏ p
```

Không giống như C, trong G không thể thực hiện các toán tử toán học đốiv với pointer

## Structs
Một `struct` là một tập các trường
```go
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	fmt.Println(Vertext{1, 2})
}
```

## Các trường của Struct
Truy cập các trường của `Struct` sử dụng `.`
```go
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertext{1, 2}
	v.X = 4
	fmt.Println(v.X)
}
```

## Con trỏ tới struct
Các trường của `struct` cũng có thể được truy cập thông qua một con trỏ struct

Để truy cập tới trường `X` của một `struct` khi chúng ta con có con trỏ `struct` `p` chúng ta có thể viết `(*p).X`. Tuy nhiên, cú pháp như vậy khá là vương víu, bở vậy, ngôn ngũ cho phép chúng ta thay vì như thế có thể chỉ cần viết `p.X`
```go
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v
	p.X = 1e9
	fmt.Println(v)
}
```

## Struct Literal
Một `struct literal` định nghĩa một các cấp pháp các giá trị mới bằng danh sách các gí trị của các trường của nó

Bạn có thể chỉ cần liệt kê một tập con của các trường sử dụn cú pháp `Name:`

Kí tự đặc biết phía trước `&` trả về một con trỏ tới giá trị của struct

```go
package main

import "fmt"

type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}
	v2 = Vertex{X : 1}
	v3 = Vertex{}
	p = &Vertex{1, 2}
)

func main() {
	fmt.Println(v1, p, v2, v3)
}
```


## Mảng
Kiểu `[n]T` là một mảng n giá trị của kiểu `T`

Biểu thức
```go
var a [10]int
```
khai báo một biến a như làm một mảng 10 phần tử nguyên

Độ dài cảu mảng là một phần của kiểu, bởi vậy mảng không thể được tái kích thước (không thẻ thay dổi kích thước). Cái này dường như là một giới hạn, đừng lo, Go cung cấp một các thuận tiện để làm việc với mảng
```go
package main

import "fmt"

func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Prinln(primes)
}
```

## Slices
Mảng sẽ có sẵn kích thước. Một slice, nó có kích thước động, xem linh hoạt vào các phần tử của một mảng. Slices thường phổ biến hơn mảng

Kiểu `[]T` là một `Slice` với các phần tử thuộc kiểu `T`

Một slice được tổ chức bằng cách chỉ ra 2 vị trí, một thấp, một cao, ngắn cách bằng dâu hai chấm
```go
a[low : high]
```

Các lựa chọn một nữa khoảng mở với bao gồm phần tử bắt đầu và không bao gồm phần tử ở cuối

Xem ví dụ vè tạo một slice bao gồm các phần tử từ  đến 3 của mảng `primes`

```go
package main

import "fmt"

func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]

	fmt.Println(s)
}
```

## Slice giống như tham chiếu tới mảng
Một `Slice` không lưu trữ bất kì data nào cả, nó chỉ miêu tả một bộ phận của một mảng cơ bản

Thay đổi các thành phần của mộ slice sẽ thay đổi các phần tử tương ứng có trong mảng

Check ví dụ dưới đây
```go
package main

import "fmt"

func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo"
	}
	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)
}
```

## Khởi tạo slice
Một khởi tạo slice gioogns như khởi tạo mảng mà không có độ dài
Dưới đây là khởi tạo mảng:
```go
[3]bool{true, true, false}
```

Và tương tự, chúng ta có thể xây dựng một slice như sau
```go
[]bool{true, true, false}
```

Check ví dụ dưới đây
```go
package main

import "fmt"

func main() {
	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(q)

	r := []bool{true, false, true, false, true}
	fmt.Println(r)

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
}
```

## Slice mặc định
Khi `Slicing`, bắt có thể quên mất giá trị `high` hoặc `low` để sử dụng giá trị mặc định

Giá trị mặc định là `zero` đối với `low` và độ dài của slice đối với `high`
Với mảng
```go
var a [10]int
```

các biểu thức slice dưới đây là tương đương
```go
a[0:10]
a[:10]
a[0:]
a[:]
```

Check ví dụ
```go
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11}

	s = s[1:4]
	fmt.Println(s)

	s = s[:2]
	fmt.Println(s)

	s = s[1:]
	fmt.Println(s)
}
```


## Độ dài slice và dung lượng
Một `Slice` có cả độ dài và dung lượng

Độ dài của một slice là số lượng phần tử mà nios chứa

Dung lượng của một slice là số lượng phần tử có trong mảng gốc, tính từ phần tử đầu tiên của slice

Độ dài và dung lượng của `Slice` `s` có thẻ lấy được sử dụng biểu thức `len(s)` và `cap(s)`

Bạn có thể mở rộng độ dài cảu một slice bằng cách re-slice nó, miễn là nó đủ dung lượng. 

```go
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	s = s[:0]
	printSlice(s)

	s = s[:4]
	printSlice(s)

	s = s[2:]
	printSlice(s)
}
func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

## Nil Slices
Giá trị `Zero` của slice là `nil`
```go
package main

import "fmt"

func main() {
	var s[]int
	fmt.Println(s, len(s), cap(s))
	if s == nil {
		fmt.Println("nil!")
	}
}
```

## Tạo Slice mới `make`

`Slice` có thẻ được tạo bằng một hàm dựng sẵn `make`; đây là cách để  có thể tạo một mảng có kích thước động

Hàm `make` cấp phát một mảng `Zero` và trả về một slice liên quan tới mảng đó:
```go
a := make([]int, 5) // len(a) = 5
```

Để chỉ định dung lượng, thêm vào tham số thứ 3:
```go
b := make([]int, 0, 5)

b = b[:cap(b)]
b = b[1:]
```

Check ví dụ dưới đây
```go
package main

import "fmt"

func main() {
	a := make([]int, 5)
	printSlice("a", a)

	b := make([]int, 0, 5)
	printSlice("b", b)

	c := b[:2]
	printSlice("c", c)

	d := c[2:5]
	printSlice("d", d)
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n", s, len(x), cap(x), x)
}
```

## Slices của slices
Slices có thể chứa bất kì kiểu gì, bao gồm cả những slice khác
```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	board := []([]string){
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	board[0][0] = "X"
	board[2][2] = "0"
	board[1][2] = "X"
	board[1][0] = "0"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\n", strings.Join(board[i], " "))
	}
}
```


## Thêm vào đít của slice
Việc thêm vào đít của slice là một điều thường gặp, và trong Go cũng cấp hàm `append`. Chú thích của miêu tả hàm `append` như sau
```go
func append(s []T, vs ...T) []T
```

Tham số đầu tiên `s` là một slice kiểu `T`, phần còn lại là các gái trị kiểu `T` để thêm vào đít

Kết quả của `append` là một slice chứa tất cả các phần tử ban đầu + các phần tử được thêm vào

Nếu như mảng `s` quá nhỏ để có thể chứa được hết tất cả các giá trị, một mảng lớn hơn sẽ được cấp phát. Slice trả về sẽ trỏ tới mảng mới được cấp pháp

```go
package main

import "fmt"

func main() {
	var s []int
	printSlice(s)

	s = append(s, 0)
	printSlice(s)

	s = append(s, 1)
	printSlice(s)

	s = append(s, 2, ,3 , 4)
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v \n", len(s), cap(s), s)
}
```

## Range
Dạng `range` của một vòng lặp `for` duyệt qua từng phần của của một slice hoặc map

Khi di chuyển trên một slice, hai giá trị được trả về mỗi lần duyệt. Giá trị đầu tiên là vị trí index, giá trị thứ 2 là giá trị copy của phần tử tại vị trí index
```go
packaage main

import "fmt"

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}

	// bỏ qua giá trị nào thì _ giá trị đó
	for _, v := range pow {
	}

	// nếu chỉ lấy mỗi index thì bỏ qua luôn giá trị 2
	for i := range pow {
	}
}
```



