--employeeID = '0e38af30-7a6a4201-9584-42264f2684fc'

--หน้า 24
--แสดงข้อมูลส่วนตัว
SELECT.. FROM Information WHERE employeeID = '..';
--แสดงประวัติการศึกษา
SELECT * FROM Education WHERE employeeID = '..';
--แสดงประวัติการเลื่อนตำแหน่ง
SELECT * FROM PromotionHistory WHERE employeeID = '..';
--แสดงจำนวนครั้งการลา แบ่งตามประเภทการลา
SELECT COUNT(status) FROM LeaveApplication WHERE employeeID = '..' GROUP BY status;
--แสดงจำนวนครั้งที่ขอคำร้อง เอกสาร แบ่งตามสถานะของคำร้อง
SELECT COUNT(status) FROM DocumentRequest WHERE employeeID = '..' GROUP BY status;
--แสดงสรุผจำนวนวัน

--แสดงรายได้ทั้งหมดต่อเดือน ปี ?
SELECT SUM(salary + OT + other) FROM Income WHERE employeeID = '..' GROUP BY month;
--แสดงสรุปจำนวนชั่วโมง/การคำนวณรายได้ ขณะนั้นนับเริ่มจากต้นเดือน

--แสดงชื่อตำแหน่ง
SELECT Position.positionName FROM Position, OverTime WHERE OverTime.positionID = Position.positionID AND OverTime.employeeID = '..';
--แสดงชื่อแผนก ***************ทำไมมันออกมาซ้ำหลายอันจัง***************
SELECT Department.departmentName FROM Department, Position, Information, OverTime WHERE OverTime.positionID = Position.positionID AND POsition.departmentID = Department.departmentID AND OverTime.employeeID = '';


--หน้า 27
-- แท็บ Notification
SELECT content, date FROM Notification
-- แท็บ Send Notification (Manager)
INSERT INTO Notification (senderID, date, status) VALUES ();
-- แท็บ Request Notification (Admin)
SELECT NotificationID FROM Notification WHERE status = 'waiting';



--หน้า 28
-- แถบ Summary
SELECT 
-- ตาราง Log
SELECT date, clockIn, clockOut, type, lateHrs FROM DailyTime WHERE employeeID = '..';

--หน้า 30
-- แท็บ Summary
SELECT employeeID, firstName,  COUNT(status) FROM LeaveApplication WHERE status = 'approved' AND employeeID IN (SELECT employeeID FROM Information WHERE employeeID = '0e38af30-7a6a4201-9584-42264f2684fc');


--หน้า 27
-- แท็บ Notification
SELECT content, date FROM Notification
-- แท็บ Send Notification (Manager)
INSERT INTO Notification (senderID, date, status) VALUES ();
-- แท็บ Request Notification (Admin)
SELECT NotificationID FROM Notification WHERE status = 'waiting';



--หน้า DailyTime
-- แถบ Summary
SELECT 
-- ตาราง Log
SELECT date, clockIn, clockOut, type, lateHrs FROM DailyTime WHERE employeeID = '..';

--หน้า Leave
-- แท็บ Summary
SELECT COUNT(status)
SELECT COUNT(status) FROM LeaveApplication WHERE status = 'approved' AND employeeID = '..';
SELECT COUNT(status) FROM LeaveApplication WHERE status = 'waiting' AND employeeID = '..';
SELECT COUNT(status) FROM LeaveApplication WHERE status = 'rejected' AND employeeID = '..';
-- แท็บ Booking 
--ส่งคำขอลางาน
INSERT INTO LeaveApplication (bookingID, employeeID, leaveID, bookingDate, reason, document, startDate, endDate, status) VALUES ('..','..','..','..','..','..','..','waiting');
--ตรวจสอบว่าในช่วงนั้นมีคนลาพร้อมกันกี่คน
SELECT COUNT() FROM 

