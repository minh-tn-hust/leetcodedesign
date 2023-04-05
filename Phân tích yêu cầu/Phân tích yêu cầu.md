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
## Quản lý đề thi
### Thêm đề thi
	UC : Thêm đề thi
	Miêu tả : Người dùng thực hiện đăng một đề thi lên hệ thống
	Input : Thông tin về đề thi
		- Đề thi : đường dẫn URL dẫn tới trang PDF
			- Mở đầu đề thi
			- Các test case ví dụ
			- Các điều kiện ràng buộc
		- Yêu cầu hệ thống 
			- Thời gian chạy tối đa : 1s
			- Bộ nhớ truy cập tối đa : 100MB
		- Test case
			- File "tên_file.inp.txt" để thể hiện file đầu vào
			- File "tên_file.out.txt" để thể hiện file đầu ra
			- File đầu vào và đầu ra phải cùng tên
		- Cài đặt hiển thị testcase
			- Chỉ hiển thị toàn bộ test case nều giải được
			- Sai ở test case nào thì hiển thị các test case trước đó cùng với test case sai
		- Các tag của đề thi đó có liên quan
	Output : 
		- Thông tin được lưu trữ lại trên CSDL thành công
	Tiền điều kiện:
		- Người dùng đăng nhập vào hệ thống 
	Hậu điều kiện : 
		- Hiển thị thông báo người dùng thêm đề thành công / thất bại
	Luồng chính : 
		1. Người dùng chọn chức năng "Thêm đề thi" trên giao diện của hệ thống
		2. Hệ thống hiển thị giao diện nhập đề thi
		3. Người dùng cung cấp các thông tin về đề thi
		4. Người dùng lựa chọn cách hiển thị thông báo lỗi (nếu có)
		5. Người dùng xác nhận và submit thống tin lên hệ thống thi
		6. Hệ thống kiểm tra và ghi nhận vào hệ thống
			- Nếu thông tin hợp lệ, hệ thống lưu trữ đề thi và hiển thị thông báo "Thêm đề thi thành công".
			- Nếu thông tin không hợp lệ, hệ thống hiển thị thông báo lỗi tương ứng
	Luồng phụ : 
		3a. Người dùng gửi vào không phải là đường dẫn URL
		3a1. Hệ thống hiển thị thông báo không phải đường dẫn phù hợp
		5a. Người dùng gửi file không hợp lệ
		5a1. Hệ thống hiển thị thông báo file up không hợp lệ

### Sửa đề thi
	UC : Chỉnh sửa đề thi
	Miêu tả : Người dùng lực hiện chỉnh sửa đề thi sau khi đã thực hiện thêm đề thi thành công
	Input : Thông tin đề thi cần chỉnh sửa
		- Đề thi : đường dẫn URL dẫn tới trang PDF
			- Mở đầu đề thi
			- Các test case ví dụ
			- Các điều kiện ràng buộc
		- Yêu cầu hệ thống 
			- Thời gian chạy tối đa : 1s
			- Bộ nhớ truy cập tối đa : 100MB
		- Test case
			- File "tên_file.inp.txt" để thể hiện file đầu vào
			- File "tên_file.out.txt" để thể hiện file đầu ra
			- File đầu vào và đầu ra phải cùng tên
		- Cài đặt hiển thị testcase
			- Chỉ hiển thị toàn bộ test case nều giải được
			- Sai ở test case nào thì hiển thị các test case trước đó cùng với test case sai
		- Các tag của đề thi đó có liên quan
	Output :
		- Hệ thống cập nhật thay đổi mới nhất về đề thi
	Tiền diều kiện :
		- Đề thi có tồn tại
		- Đã đăng nhập và có quyền thay đổi đề thi
	Hậu điều kiện :
		- Hệ thống cập nhật thay đổi đề thi
	Luồng chính :
		1. Người dùng lựa chọn thay đổi đề thi
		2. Hệ thống hiển thị lại thông tin hiện tại đề thi
		3. Người dùng thực hiện thay đổi 
		4. Người dùng bấm nút Submit
		5. Hệ thống ghi nhận và cập nhật vào cơ sở dữ liệu
	Luồng phụ :
		2a. Người dùng gửi vào không phải là đường dẫn URL
		2a1. Hệ thống hiển thị thông báo không phải đường dẫn phù hợp
		2b. Người dùng gửi file test case không hợp lệ
		2b1. Hệ thống hiển thị thông báo file up không hợp lệ
### Xóa đề thi
	UC : Xóa đề thi
	Miêu tả : Người dùng thực hiện xóa đề thi
	Input : Đề thi cần chỉnh sửa
	Output :
		- Hệ thống cập nhật thay đổi mới nhất về đề thi
	Tiền diều kiện :
		- Đề thi có tồn tại trong DB
		- Đã đăng nhập
	Hậu điều kiện :
		- Hệ thống cập nhật thay đổi đề thi
	Luồng chính :
		1. Người dùng thực hiện xóa đề thi
		2. Hệ thống hiển thị thống báo xác nhận xóa
		3. Người dùng submit
		4. Hệ thống cập nhật kiểm tra quyền truy cập của người dùng và thực hiện xóa thông tin ra khỏi đề thi hiện tại và cập nhật thông tin
	Luồng phụ :
		1a. Đề thi hiện tại đang ở trong một quốc thi
		1a1. Hệ thống hiển thị thông báo không cho phép xóa, bắt buộc phải gỡ bài muốn xóa ra khỏi cuộc thi mới được xóa
		1a2. Bài đang được thực hiện trong một cuộc thi đang diễn ra, không thể xóa, chỉ cho phép chỉnh sửa
### Thêm Testcase
	UC : Thêm Testcase vào đề thi
	Miêu tả : Người dùng có thể thêm Test case vào đề thi đã có
	Input : 
		- Test case mới:
			File "tên_file.inp.txt" để thể hiện file đầu vào
			File "tên_file.out.txt" để thể hiện file đầu ra
			File đầu vào và đầu ra phải cùng tê
	Output :
		- Hệ thống cập nhật thay đổi mới nhất về đề thi
	Tiền diều kiện :
		- Người dùng đã đăng nhập và có quyền thêm Test case cho đề thi đã có
	Hậu điều kiện :
		- Hệ thống cập nhật thay đổi đề thi
	Luồng chính :
		1. Người dùng chọn thêm Test case vào đề thi.
		2. Hệ thống hiển thị lại thông tin đề thi.
		3. Người dùng thêm Test case mới và điền đầy đủ thông tin cho Test case đó.
		4. Người dùng submit.
		5. Hệ thống xác nhận thông tin Test case mới và cập nhật vào cơ sở dữ liệu
	Luồng phụ :
		2b. Người dùng gửi file Test case không hợp lệ.
		2b1. Hệ thống hiển thị thông báo file up không hợp lệ
### Sửa Testcase
	UC : Sửa Testcase đã tồn tại trong đề thi
	Miêu tả : Người dùng sửa testcase tồn tại trong đề thi
	Input : 
		- Test case mới:
			  Dữ liệu đầu vào mới cho file cần chỉnh sửa
			  Dữ liệu output mới cho file cần chỉnh sửa
	Output :
		- Hệ thống cập nhật thay đổi mới nhất về đề thi
	Tiền diều kiện :
		- Người dùng đã đăng nhập và có quyền thêm Test case cho đề thi đã có
	Hậu điều kiện :
		- Hệ thống cập nhật thay đổi đề thi
	Luồng chính :
		1. Người dùng chọn chức năng sửa Testcase trong đề thi.
		2. Hệ thống hiển thị lại thông tin về Testcase hiện tại, bao gồm cặp dữ liệu đầu vào và đầu ra.
		3. Người dùng thực hiện cập nhật thông tin mới cho Testcase.
		Người dùng nhấn nút Submit để hoàn tất quá trình sửa đổi.
		Hệ thống xác nhận thông tin mới của Testcase và cập nhật vào cơ sở dữ liệu của đề thi
	Luồng phụ :
		2b. Người dùng gửi file Test case không hợp lệ.
		2b1. Hệ thống hiển thị thông báo file up không hợp lệ
  
### Xóa Testcase
	UC: Xóa Testcase trong đề thi
	Mô tả: Người dùng thực hiện xóa một testcase trong đề thi đã tạo.
	Input:
		Thông tin đề thi cần xóa testcase:
		ID của đề thi: số nguyên dương
		ID của testcase: số nguyên dương
	Output:
		Hệ thống cập nhật đề thi mới sau khi đã xóa testcase
	Tiền điều kiện:
		Đề thi đã được tạo.
		Đã đăng nhập và có quyền xóa testcase trong đề thi.
	Hậu điều kiện:
		Hệ thống cập nhật đề thi mới sau khi đã xóa testcase.
	Luồng chính:
		1. Người dùng chọn chức năng xóa testcase.
		2. Hệ thống hiển thị danh sách các testcase trong đề thi.
		3. Người dùng chọn testcase muốn xóa.
		4. Hệ thống yêu cầu xác nhận xóa testcase.
		5. Người dùng xác nhận xóa testcase.
		6. Hệ thống cập nhật đề thi mới sau khi đã xóa testcase.
	Luồng phụ:
		2a. Nếu không có testcase nào trong đề thi.
		2a1. Hệ thống hiển thị thông báo không có testcase nào trong đề thi.
		3a. Nếu người dùng không chọn testcase để xóa.
		3a1. Hệ thống hiển thị thông báo yêu cầu chọn testcase để xóa.
		5a. Nếu người dùng không xác nhận xóa testcase.
		5a1. Hệ thống không thực hiện xóa testcase và hiển thị trang chủ
### Kiểm thử đề thi
	UC : Kiểm thử đề thi
	Miêu tả : Sau khi người dùng đã thực hiện thêm đề thi và các testcase thành công, hệ thống chấm thử dựa vào bài nạp của người ra đề và bộ testcase được cung cấp
	Input :
		- Source code của người ra đề
		- Testcase đã được lưu
	Output :
	   - Hiển thị thông tin về bài chấm, các thông tin bao gồm
	Tiền diều kiện :
		- Đề thi có tồn tại trong DB
		- Đã đăng nhập
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

## Người dùng
### Thống kê các bài tập
	UC : Thống kê các bài tập
	Miêu tả : Thống kê các bài tập mà người dùng có thể nhìn thấy được
	Input : Không có
	Output : Danh sách các bài thi hiện tại người dùng có thể làm được, thông tin bao gồm
		- Tên bài thi
		- Số thứ tự
		- Các category gán cho đề thi
		- Tỉ lệ hoàn thành của bài thi
		- Mức độ khó của bài thi
	Tiền diều kiện : Không có
	Hậu điều kiện : Không có
	Luồng chính :
		 1. Người dùng vào trang chủ
		 2. Hệ thống hiển thị danh sách các bài thi hện tại
	Luồng phụ : Không có

### Thống kê các lần nạp bài
	UC : Thống kê các bài nạp của người dùng
	Miêu tả : Người dùng thống kê lại các bài nạp đã/đang được chấm
	Input : ID của người dùng && Đề thi người dùng đang xem
	Output : Danh sách các thông tin liên quan tới bài nạp của người dùng, mỗi bài nạp bao gồm các thông tin sau
	 - Thời gian nạp
	 - Trạng thái của bài nạp (đang được chấm/chưa chấm/đã chấm xong)
	 - Kết quả được chấm
	 - Thông tin lỗi kèm theo
	 - Thời gian chạy của code
	 - Bộ nhớ chiếm dụng của code
	 - Source code người dùng đã submit
	Tiền diều kiện : Người dùng đăng nhập vào hệ thống
	Hậu điều kiện : Hiển thị thành công danh sách các lần nạp bài
	Luồng chính :
		1. Người dùng bâm nút "My Submission"
		2. Hệ thống kiểm tra thực hiện lấy dữ liệu về các bài nạp của người dùng
		3. Hệ thống hiển thị danh sách các bài nạp
	Luồng phụ :
	   2a. Không có id đề thi
	   2a1. Hiển thị danh sách tất cả các lần submit người dùng đã submit
	   2b. Có id đề thi
	   2b1. Hiển thị danh sách các lần submit của người dùng về đề thi tương ứng
	
### Làm bài
	UC : Người dùng làm bài thi
	Miêu tả : Người dùng lựa chọn một đề thi nào đo rồi thực hiện làm và chấm điểm bài làm
	Input : 
		- ID của người dùng
		- Code người dùng đã code 
		- ID đề bài của người dùng
	Output : Thông tin về đoạn code đã được thực thi, các thông tin bao gồm
	 - Thời gian nạp
	 - Trạng thái của bài nạp (đang được chấm/chưa chấm/đã chấm xong)
	 - Kết quả được chấm
	 - Thông tin lỗi kèm theo
	 - Thời gian chạy của code
	 - Bộ nhớ chiếm dụng của code
	 - Source code người dùng đã submit
	Tiền diều kiện : Người dùng đăng nhập vào hệ thống
	Hậu điều kiện : Hiển thị thành công danh sách các lần nạp bài
	Luồng chính :
		1. Người dùng lựa chọn đề thi muốn chấm
		2. Người dùng cung cấp source code để giải quyết bài toán
		3. Người dùng nhấn nút Submit
		4. Hệ thống kiểm tra và ghi nhận bài nộp
		5. Hệ thống thực hiện chấm bài
		6. Hệ thống trả kết quả bài chấm
	Luồng phụ :
	   3a. Người dùng nộp trung sourcecode đã được nộp trước đó
	   3a1. Hiển thị thống báo nộp trùng source code
### Chấm bài
	UC : Chấm bài khi người dùng thực hiện submit
	Miêu tả : Người dùng thực hiện Submit code và hệ thống bắt chấm để lấy kết quả
	Input : 
		 - ID đề thi
		 - Source code cửa người nạp
	Output :
		- Thông tin về bài chấm đã được chấm xong, các thông tin bao gồm
			- Số testcase đúng/sai
			- Lỗi trong quá trình thực thi code
			- Quá thời gian chạy cho phép
			- Quá bộ nhớ tối đa cho phép
   
	Tiền diều kiện : Người dùng đăng nhập vào hệ thống và thực hiện submit bài thi
	Hậu điều kiện : Hiển thị kết qur bài đã 
	Luồng chính :
		1. Người dùng Submit code lên hệ thống
		2. Hệ thống validate code để tránh thực thi các mã nguồn có hại cho hệ thống
		3. Hệ thống kiểm tra số lượng máy chấm ảo đang hoạt động và lấy ra một máy chấm đang rảnh
		4. Hệ thống thực thi source code trên máy chấm được lựa chọn
		5. Hệ thống ghi nhận kết quả thực thi code và lưu vào cơ sở dữ liệu
	Luồng phụ :
	   3a. Không còn máy ảo nào đang hoạt động, hệ thống đưa vào hàng chờ 


# Biểu đồ hoạt động
## Quản lý đề thi
### Thêm đề thi
![[Thêm đề thi.png]]
### Sửa đề thi
![[Chỉnh sửa đề thi.png]]
### Xóa đề thi
![[Xóa đề thi.png]]
### Thêm Testcase
![[Thêm Testcase.png]]
### Sửa Testcase
![[Chỉnh sửa testcase.png]]
### Xóa Testcase
![[Xóa Tescase.png]]
### Kiểm thử đề thi
![[Kiểm thử testcase.png]]
## Người dùng
### Thống kê các bài tập
![[Thống kê bài tập.png]]
### Thông kê các lần nạp bài
![[Thống kê các lần nộp bài.png]]
### Làm bài
![[Làm bài thi.png]]
### Chấm bài
![[Chấm bài thi.png]]

# Biểu đồ sequence

# Thiết kế Database
![[Database.png]]