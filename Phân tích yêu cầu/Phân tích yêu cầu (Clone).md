
# Phân tích yêu cầu
## Yêu cầu chức năng
### 1. Hệ thống quản lý
- Phân quyền chức năng (đăng nhập, đăng xuất)
- Người quản lý có thể đăng bài kèm theo các test case và các yêu cầu liên quan tới tài nguyên
- Người quản lý có thể gắn thẻ cho các bài tập được đăng lên

### 2. Hệ thống chấm thi
- Ghi nhận bài thi từ người dự thi và thực thi bài thi
- Hệ thống phân bố tài nguyên cho các lần thực thi phù hợp
- Hệ thống tính thời gian thực thi, bộ nhớ chiếm dụng của các bài nạp
- Hệ thống thực hiện validate kết quả sau khi đã thực thi các bài thi
- Hệ thống handle các lỗi mắc phải của bài nạp và trả về cho người dùng

### 3. Hệ thống làm bài thi
- Hệ thống có một Editor sử dụng cho người dùng có thể thực hiện dev ngay trên web, có hỗ trợ sugestion và auto complele
- Có hệ thống theo thẻ, thống kê số người đã hoàn thành bài thi, tỉ lệ hoàn thành bài thi, và các bài đã từng được submit lên hệ thống
- Có check lại xem code đã submit có bị trùng lại so với code cũ hay không

## Yêu cầu phi chức năng
### 1. Hệ thống quản lý
- Hỗ trợ nhập markdown đối với hệ thống đề bài, có hỗ trợ nhập công thức sử dụng Latex

### 2. Hệ thống chấm thi
- Hệ thống có thể đảm bảo tính an toàn khi thực thi các file code từ người dùng gửi lên
- Khả năng chịu tải của hệ thống phải đạt được mức lớn số lượng người dự thi một kì thi (đối với đồ án tốt nghiệp, nâng mức lên từ 50.000 - 100.000)

### 3. Hệ thống làm bài thi
- Hệ thống có giao diện dễ tương tác, dễ dàng sử dụng
# Biểu đồ usecase
## Biểu đồ usecase tổng quan
![[Usecase tổng quan.png]]

# Luồng kịch bản
## Người quản lý
### Quản lý bài thi
#### Xem danh sách đề thi sở hữu
	UC : Xem danh sách đề thi sở hữu
	Miêu tả : Người quản lý hiển thị danh sách các đề thi đã được đăng lên từ trước
	Input : Không có
	Output : Danh sách các đề thi đã được đăng lên từ trước
	Tiền điều kiện:
		- Người dùng đăng nhập vào hệ thống 
	Hậu điều kiện : 
		- Hiển thị chi tiết danh sách các đề thi đã được thêm
	Luồng chính : 
		1. Người quản lý đăng nhập vào hệ thống
		2. Hệ thống truy vấn danh sách các đề thi sở hữu và hiển thị
	Luồng phụ : Không có

#### Đăng đề thi
	UC : Đăng đề thi
	Miêu tả : Người dùng thực hiện đăng một đề thi lên hệ thống
	Input : Thông tin về đề thi
		- Đề thi : đường dẫn URL dẫn tới trang PDF
		- Trạng thái đề thi : public/private
		- Yêu cầu hệ thống 
			- Thời gian chạy tối đa : 1s
			- Bộ nhớ truy cập tối đa : 100MB
		- Test case
			- File "tên_file.inp.txt" để thể hiện file đầu vào
			- File "tên_file.out.txt" để thể hiện file đầu ra
			- File đầu vào và đầu ra phải cùng tên
		- Các hiển thị thông tin lỗi
			- Chỉ hiển thị toàn bộ test case nều giải được
			- Sai ở test case nào thì hiển thị các test case trước đó cùng với test case sai
		- Các tag của đề thi đó có liên quan
	Output : 
		- Thông tin được lưu trữ lại trên CSDL thành công
	Tiền điều kiện:
		- Người dùng đăng nhập vào hệ thống 
		- Người dùng được cấp quyền đăng bài thi
	Hậu điều kiện : 
		- Hiển thị thông báo người dùng thêm đề thành công / thất bại
	Luồng chính : 
		1. Người dùng thực hiện thêm đề thi
		2. Hệ thống hiển thị giao diện nhập đề thi
		3. Người dùng điền đề thi vào hệ thống
		4. Người dùng thiết lập trạng thái hệ thống
		5. Người dùng up test case
		6. Người dùng lựa chọn cách hiển thị lỗi
		7. Người dùng submit
		8. Hệ thống kiểm tra và ghi nhận vào hệ thống
	Luồng phụ : 
		3a. Người dùng gửi vào không phải là đường dẫn URL
		3a1. Hệ thống hiển thị thông báo không phải đường dẫn phù hợp
		5a. Người dùng gửi file không hợp lệ
		5a1. Hệ thống hiển thị thông báo file up không hợp lệ


#### Chỉnh sửa đề thi
	UC : Chỉnh sửa đề thi
	Miêu tả : Người dùng lực hiện chỉnh sửa đề thi sau khi đã thực hiện thêm đề thi thành công
	Input : Thông tin đề thi cần chỉnh sửa
		- Đề thi : đường dẫn URL dẫn tới trang PDF
		- Trạng thái đề thi : public/private
		- Yêu cầu hệ thống 
			- Thời gian chạy tối đa : 1s
			- Bộ nhớ truy cập tối đa : 100MB
		- Test case
			- File "tên_file.inp.txt" để thể hiện file đầu vào
			- File "tên_file.out.txt" để thể hiện file đầu ra
			- File đầu vào và đầu ra phải cùng tên
	Output :
		- Hệ thống cập nhật thay đổi mới nhất về đề thi
	Tiền diều kiện :
		- Đề thi có tồn tại
		- Đã đăng nhập và có quyền thay đổi đề thi
	Hậu điều kiện :
		- Hệ thống cập nhật thay đổi đề thi
	Luồng chính :
		1. Người dùng lựa chọn thay đổi đề thi
		2. Hệ thống hiển thị lại thông tin đề thi
		3. Người dùng thực hiện thay đổi 
		4. Người dùng submit
		5. Hệ thống ghi nhận và cập nhật vào cơ sở dữ liệu
	Luồng phụ :
		2a. Người dùng gửi vào không phải là đường dẫn URL
		2a1. Hệ thống hiển thị thông báo không phải đường dẫn phù hợp
		2b. Người dùng gửi file test case không hợp lệ
		2b1. Hệ thống hiển thị thông báo file up không hợp lệ

#### Xóa đề thi
	UC : Chỉnh sửa đề thi
		Miêu tả : Người dùng thực hiện xóa đề thi
	Input : Thông tin đề thi cần chỉnh sửa
		- Đề thi : đường dẫn URL dẫn tới trang PDF
		- Trạng thái đề thi : public/private
		- Yêu cầu hệ thống 
			- Thời gian chạy tối đa : 1s
			- Bộ nhớ truy cập tối đa : 100MB
		- Test case
			- File "tên_file.inp.txt" để thể hiện file đầu vào
			- File "tên_file.out.txt" để thể hiện file đầu ra
			- File đầu vào và đầu ra phải cùng tên
	Output :
		- Hệ thống cập nhật thay đổi mới nhất về đề thi
	Tiền diều kiện :
		- Đề thi có tồn tại
		- Đã đăng nhập và có quyền thay đổi đề thi
	Hậu điều kiện :
		- Hệ thống cập nhật thay đổi đề thi
	Luồng chính :
		1. Người dùng thực hiện xóa đề thi
		2. Hệ thống hiển thị thống báo xác nhận xóa
		3. Người dùng submit
		4. Hệ thống cập nhật xóa thông tin ra khỏi đề thi hiện tại và cập nhật thông tin
	Luồng phụ :
		1a. Đề thi hiện tại đang ở trong một quốc thi
		1a1. Hệ thống hiển thị thông báo không cho phép xóa, bắt buộc phải gỡ bài muốn xóa ra khỏi cuộc thi mới được xóa
		1a2. Bài đang được thực hiện trong một cuộc thi đang diễn ra, không thể xóa, chỉ cho phép chỉnh sửa
		

#### Kiểm tra đề thi
	UC : Kiểm tra đề thi
	Mô tả ngắn : Người dùng muốn thực hiện kiểm tra đề thi của mình có hoạt động không
	Input : 
		- Source code của đề thi là bài giải
	Output :
		- Thông báo chấm thi giống như của người dự thi
	Tiền điều kiện :
		- Người dùng đăng nhập vào hệ thống
		- Người dùng có quyền can thiệp vào bài thi
	Hậu điều kiện : Không có
	Luồng chính :
		1. Người dùng lựa chọn kiểm tra đề thi
		2. Người dùng up file source của đáp án / copy/paste
		3. Click submit
		4. Hệ thống chấm thi thực thi bài nạp của người dùng và trả về kết quả
		5. Hệ thống quản lý hiển thị kết quả
	Luồng phụ : Không có
 
### Quản lý kì thi
#### Tạo kì thi
	UC : Tạo kì thì
	Mô tả ngắn : Người dùng tạo kì thi
	Input: 
		- Tên kì thi
		- Thời gian diễn ra kì thi
	Output:
		- Kì thi được tạo 
	Tiền điều kiện:
		 - Người dùng đăng nhập vào hệ thống
		 - Người dùng có quyền tạo kì thi
	Hậu điều kiện:
		- Cuộc thi được tạo và đưa người dùng tới trang quản lý cuộc thi
	Luồng chính:
		1. Người dùng chọn tạo kì thi
		2. Hệ thống hiển thị màn hình nhập thông tin kì thi
		3. Người dùng nhập tên cuộc thi 
		4. Người dùng nhập thời gian diễn ra cuộc thi
		5. Người dùng submit
		6. Hệ thống ghi nhận và tạo kì thi, lưu vào CSDL
	Luồng phụ:
		4a. Người dùng nhập thời gian trong quá khứ
		4a1. Hệ thống hiển thị thông báo và quay lại bước 4
#### Chỉnh sửa kì thi
	UC : Chỉnh sửa kì thi
	Miêu tả : Người dùng thực hiện chỉnh sửa kì thi
	Input : Các thông tin thay đổi liên quan tới kì thi và bài thi
	Output : Không
	Tiền điều kiện:
		- Người dùng phải đăng nhập hệ thống
		- Người dùng có quyền can thiệp vào kì thi
	Hậu điều kiện
		- Nếu cuộc thi đang diễn ra, các thông báo thay đổi được gửi tới những người tham gia cuộc thi
	Luồng chính :
		1. Người dùng thực hiện chỉnh sửa kì thi
		2. Hệ thống hiển thị trang quản lý kì thi
		3. Người dùng thực hiện chỉnh sửa
		4. Người dùng submit
		5. Hệ thống ghi nhận và lưu vào CSDL
	Luồng phụ : Không có
#### Thêm người quản lý vào kì thi
	UC : Thêm người quản lý vào kì thi
	Miêu tả : Người dùng thực hiện thêm người quản lý vào kì thi của mình
	Tiền điều kiện:
		- Người dùng đã đăng nhập vào hệ thống
		- Người dùng có quyền tương tác với kì thi (quyền thêm người)
	Hậu điều kiện:
		- Người dùng được thêm vào có thể tương tác và nhìn thầy kì thi tại danh sách hiển thị các kì thi
	Input : 
		 - Tên người dùng được thêm vào hệ thống
		 - Các quyền người dùng có thể tương tác với kì thi
	Output :
		- Người dùng được thêm có quyền tương tác với kì thi của mình
	Luồng chính:
		1. Người dùng thực hiện thêm người vào kì thi
		2. Hệ thống hiển thị những người có thể thêm
		3. Người dùng lựa chọn / nhập đầy đủ tên
		4. Người dùng submit
		5. Hệ thống ghi nhận và lưu vào database
	Luồng phụ:
		4a. Người dùng nhập tên không tồn tại trong hệ thống
		4a1. Hệ thống hiển thị thông báo và quay lại bước 1
#### Import bài thi vào kì thi
	UC : Import bài thi vào kì thi
	Miêu tả : Người dùng đã tạo được bài thi đó từ trước và muốn sử dụng lại 
	Tiền điều kiện :
		- Bài thi đã có sẵn
		- Người dùng đăng nhập vào hệ thống
		- Người dùng có quyền thêm bài thi
	Hậu điều kiện :
		- Tạo ra một bản clone của đề thi đó và hoạt động độc lập
	Input : 
		- Bài thi có sẵn đã được tạo từ trước
	Output :
		- Bài thi được clone ra một bản mới
	Luồng chính:
		1. Người dùng thực hiện thêm đề thi vào kì thi
		2. Hệ thống gợi ý bài thi người dùng có thể thêm được
		3. Người dùng lựa chọn đề thi muốn thêm vào hệ thống
		4. Người dùng submit
		5. Hệ thống xác nhận và lưu vào cơ sở dữ liệu
	Luồng phụ
		3a. Người dùng lựa chọn một đề thi không có
		3a1. Hệ thống hiển thị thông báo không thể thêm

## Người dự thi
#### Danh sách lịch sử nạp bài
	UC : Xem danh sách lịch sử nạp bài
	Miêu tả : Người dùng muốn xem lịch sử nộp bài của mình
	Tiền điều kiện:
		- Người dùng đăng nhập vào hệ thôgns
	Hậu điều kiện: Không có
	Input: Không
	Output : Danh sách hiển thị các thông tin liên quan đến lịch sử nộp bài của thí sinh
		- Mã nộp
		- Tên đề bài được nộp
		- Trạng thái của bài nộp
		- Thời gian chạy của bài nộp
		- Bộ nhớ chiếm dụng của bài nộp
		- Thông tin chi tiết về test case nào bị lỗi
#### Làm bài thi
	UC : Làm bài thi
	Miêu tả : Người dùng thực hiện làm bài thi 
	Tiền điều kiện :
		- Người dùng đăng nhập hệ thống
	Hậu điều kiện : Không có
	Input : 
		- Bài làm của người dùng (file / dạng source code)
	Output :
		- Bài làm được thực thi và chấm qua các test case, hiển thị thông báo
	Luồng chính :
		1. Người dùng lựa chọn 1 đề bài
		2. Người dùng thực hiện nạp file / source code
		3. Hệ thống ghi nhận và lưu và CSDL
		4. Hệ thống máy chấm thực thi và trả kết quả 
		5. Hệ thống hiển thị thông tin về bài nạp
	Luồng phụ : Không có
#### Xem danh sách kì thi
	UC : Xem danh sách kì thi
	Miêu tả : Người dùng thực hiện xem được danh sách các kì thi hiện tại đang được public
	Tiền điều kiện : Không có
	Hậu điều kiện : Không có
	Input : Không có
	Output : Danh sách các kì thi được hiển thị
		- Tên kì thi
		- Thời gian đếm ngược tới kì thi
		- Số lượng người đã đăng kí
	Luồng chính :
		1. Người dùng thực hiện xem danh sách các kì thi hiện đang đươc public
		2. Hệ thống hiển thị danh sách các kì thị đang được public
#### Tham gia kì thi
	UC : Người dùng tham gia kì thi
	Miêu tả : Người dùng thực hiện đăng kí và tham gia vào các kì thi
	Tiền điều kiện : Người dùng đã đăng nhập
	Hậu điều kiện : Không có
	Input : Không
	Output : Người dùng tham gia và thực hiện giải bài được
	Luồng chính:
		1. Người dùng thực hiện đăng kí tham gia kì thi muốn tham gia
		2. Hệ thống ghi nhận người dùng đăng kí
		3. Người dùng thực hiện làm bài thi
		4. Hệ thống hiển thị kết quả và cập nhật bảng rank của kì thi hiện tại


#### Xem bảng rank của kì thi
	UC : Xem bảng rank của kì thi
	Miêu tả : Người dùng muốn xem bảng rank của kì thi
	Input : Không có
	Output : Người dùng thấy được thông tin về bảng rank hiện tại của kì thi
		- Tên người tham gia
		- Thông tin về các bài đã làm được
		- Thứ tự của người đó trong bản xếp hạng
	Tiền điều kiện : Người dùng đang ở trong trang quản lý của cuộc thi hiện tại
	Hậu điều kiện : Không có
	Luồng chính :
		1. Người dùng thực hiện xem bảng rank của kì thi hiện tại 
		2. Hệ thống cập nhật bảng rank hiện tại của quốc thi
	Luồng phụ : Không có
#### Xem danh sách các bài thi
	UC : Xem danh sách các bài thi
	Miêu tả : Người dùng muốn xem danh sách các bài thi hiện tại đang đươc public
	Input : Không có
	Output : Danh sách toàn bộ bài thi có trong hệ thống được publiic
		Hiển thị theo từng trang, mỗi trang 10 đề thi, các đề thi bao gồm
		- Mã đề thi
		- Tên đề thi
		- Các tag được phân loại của đề thi đó
		- Số lượng người submit đề thi đó
	Tiền điều kiện : Không có
	Hậu điều kiện : Không có
	Luồng chính : 
		1. Người dùng muốn xem danh sách các bài thi hiện tại 
		2. Hệ thống hiển thị danh sách các bài thi hiện tại
#### Filter đề thi 
	UC : Filter đề thi
	Miêu tả : Người dùng muốn thực hiện filter danh sách các bài thi có liên quan
	Input : 
		- Tên cuộc thi liên quan
		- Tên các tag liên quan
		- Sắp xếp theo số lượng người giải được
	Output : Danh sách đã được filter
	Tiều điều kiện : Người dùng đang hiển thị danh sách các đề thi
	Hậu điều kiện : Không có
	Luồng chính :
		1. Người dùng thực hiện filter
		2. Hệ thống hiển thị bảng filter để người dùng lựa chọn
		3. Người dụng nhập thông tin 
		4. Hệ thống thực hiện hiển thị theo các yêu cầu
	Luồng phụ : Không có
	


--- 

## Hệ thống máy chấm
#### Chấm bài
	UC : Chấm bài
	Mô tả ngắn : Máy chấm thực hiện chấm bài của người dùng nạp lên
	Input: 
		- Testcase dựa vào bài mà người dùng đã chọn để nạp
		- File bài nạp của người dùng
	Output:
	 	- Kết quả của bài chấm và các thông tin liên quan:
	 		- Lỗi xảy ra trong quá trình chấm
	 		- Số lượng testcase pass qua
	 		- Kết quả của bài test (pass/fail)
	 		- Thời gian chạy của bài thi
	Tiền điều kiện:
		- Không có tiền điều kiện, thí sinh bắt buộc phải đăng nhập
	Hậu điều kiện:
		- Kết quả được cập nhật vào lịch sử chấm bài của người dùng
	Luồng chính:
		1. Hệ thống quản lý nhận được bài chấm của người dùng
		2. Hệ thống quản lý lưu vào cơ sở dữ liệu của người dùng
		3. Hệ thống chấm kiểm tra file
		4. Hệ thống chấm được thực hiện gọi để bắt đầu chấm
		5. Hệ thống chấm bài trả kết quả lại cho hệ thống
		6. Hệ thống quản lý lưu kết quả bài chấm
	Luồng phụ:
		Không có luồng phụ xảy ra ở đây
		
#### Xuất thông tin về bài chấm
	 UC : Xuất thông tin bài chấm
	 Mô tả ngắn : Hệ thống xuất thông tin về bài vừa 
	 Input:
	 Output:
	 Tiền điều kiện:
	 Hậu diều kiện
	 Luồng chính:
	 Luồng phụ:

#### Tạo máy ảo chấm bài
	 UC : Xuất thông tin bài chấm
	 Mô tả ngắn : 
	 Input:
	 Output:
	 Tiền điều kiện:
	 Hậu diều kiện
	 Luồng chính:
	 Luồng phụ:

#### Quản lý máy chấm
	 UC : Xuất thông tin bài chấm
	 Mô tả ngắn : 
	 Input:
	 Output:
	 Tiền điều kiện:
	 Hậu diều kiện
	 Luồng chính:
	 Luồng phụ:

# Quy trình hoạt động
## Người quản lý
### Quản lý bài thi
#### Đăng đề thi
![[Đăng đề thi.png]]
#### Chỉnh sửa đề thi
![[Chỉnh sửa đề thi.png]]
#### Xóa đề thi
![[Xóa đề thi.png]]
#### Kiểm tra đề thi
![[Kiểm tra đề thi.png]]
### Quản lý kì thi
#### Tạo kì thi
![[Tạo kì thi.png]]
#### Chỉnh sửa kì thi
![[Chỉnh sửa kì thi.png]]
#### Thêm người quản lý vào kì thi
![[Thêm người quản lý vào kì thi.png]]
#### Import bài thi vào kì thi
![[Import bài thi vào kì thi 1.png]]
## Người dự thi
#### Danh sách lịch sử nạp bài
![[Danh sách lịch sử nạp bài.png]]
#### Làm bài thi
![[Làm bài thi.png]]
#### Xem danh sách kì thi
![[Xem danh sách kì thi.png]]
#### Tham gia kì thi
![[Tham gia kì thi.png]]
#### Xem các bảng rank của kì thi
![[Xem bảng rank của kì thi.png]]
#### Xem danh sách các bài thi
![[Xem danh sách các bài thi.png]]
#### Filter đề thi
![[Filter đề thi.png]]

---
# Biểu đồ sequence
## Người sử dụng
### Danh sách lịch sử nạp bài
![[Danh sách lịch sử nạp bài 1.png]]
### Filter đề thi
![[Filter đề thi 1.png]]
### Làm bài thi
![[Làm bài thi 1.png]]
### Tham gia kì thi
![[Tham gia kì thi 1.png]]
### Xem bảng rank của kì thi
![[Xem bảng rank của kì thi 1.png]]
### Xem danh sách các đề thi
![[Xem danh sách các đề thi.png]]
### Xem danh sách kì thi
![[Xem danh sách kì thi 1.png]]
## Quản lý bài thi
### Đăng đề thi
![[Đăng đề thi 1.png]]
### Xóa đề thi
![[Xóa đề thi 1.png]]
### Kiểm tra đề thi
![[Kiểm tra đề thi 1.png]]
### Chỉnh sửa đề thi
![[Chỉnh sửa đề thi 1.png]]

## Quản lý kì thi
### Chỉnh sửa kì thi

### Import bài thi vào kì thi
### Tạo kì thi
![[Tạo kì thi 1.png]]
### Thêm người quản lý vào kì thi

---
# Biểu đồ giao tiếp

---
# Biểu đồ lớp phân tích

---
# Biểu đồ lớp thiết kế

---

