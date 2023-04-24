![[Pasted image 20230421161101.png]]
## WMC
WMC(TripReservationScreen) = 6 (đếm số phương thức có trong một lớp, cái ni dệ)

## RFC
Dự vô biểu đồ SD, đếm số lượng các phương thức có mũi tên đến lớp đó
RFC(TripReservationScreen) = 3
RFC(TripReservationController) = 3
RFC(Trip) = 3
RFC(Rểvation) = 1

## LCOM
LCOM(TripReservation)  = 0
LCOM(Trip) = 3 (3C2 - 0)
LCOM(TripReservationScreen) = 0
LCOM(Reservation) = 0


## CBO
Đếm số lượng vũi tên ra của một lớp (ngược lại với RFC)
Dễ, tự làm

## DIT
Không dùng kế thừa nên tất cả DIT đều = 0

## NOC
Không dùng kế thừa nên tất cả NOC đều = 0


Khi thay đổi:
Dễ dàng thay đổi số lượng chỗ ngồi của xe, vì lớp Car có biến lưu trữ số lượng chỗ ngồi
Dễ dàng thay đổi vì lớp Car có chứa loại xe + giá vé