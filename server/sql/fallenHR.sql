--employeeID = '0e38af30-7a6a4201-9584-42264f2684fc'

----- หน้า 24 -----
--แสดงข้อมูลส่วนตัว
SELECT employeeID, identificationNo, firstName, lastName, DOB, email, phoneNumber, address, photo FROM Information WHERE employeeID = '..';
--แสดงประวัติการศึกษา
SELECT * FROM Education WHERE employeeID = '..';
--แสดงประวัติการเลื่อนตำแหน่ง
SELECT * FROM PromotionHistory WHERE employeeID = '..';
--แสดงจำนวนครั้งการลา แบ่งตามประเภทการลา
SELECT COUNT(status) FROM LeaveApplication WHERE employeeID = '..' GROUP BY status;
--แสดงจำนวนครั้งที่ขอคำร้อง เอกสาร แบ่งตามสถานะของคำร้อง
SELECT COUNT(status) FROM DocumentRequest WHERE employeeID = '..' GROUP BY status;
--แสดงสรุปจำนวนวัน
******************************************
--แสดงรายได้ทั้งหมดต่อเดือน ปี ?
SELECT SUM(salary + OT + other) FROM Income WHERE employeeID = '..' GROUP BY month;
--แสดงสรุปจำนวนชั่วโมง/การคำนวณรายได้ ขณะนั้นนับเริ่มจากต้นเดือน
******************************************
--แสดงชื่อตำแหน่ง
SELECT positionName FROM PromotionHistory WHERE employeeID = '..' AND stopDate IS NULL;
--แสดงชื่อแผนก
SELECT departmentName FROM Department
INNER JOIN Position ON Department.departmentID = Position.departmentID
LEFT JOIN PromotionHistory ON Position.positionName = PromotionHistory.positionName
WHERE PromotionHistory.employeeID = '..' AND PromotionHistory.stopDate IS NULL;


----- หน้า 27 -----
-- แท็บ Notification --
SELECT content, date FROM Notification;

-- แท็บ Send Notification (Manager) --
INSERT INTO Notification(senderID, status, date, content) VALUES ('[value-1]','waiting',CURRENT_DATE,'[value-4]');

-- แท็บ Request Notification (Admin) --
SELECT * FROM Notification WHERE status = 'waiting';
UPDATE Notification SET status = 'approved';


----- หน้า 28 -----
-- แถบ Summary --
SELECT clockIn, clockOut FROM DailyTime WHERE employeeID = '..' AND date = '..';
SELECT type, COUNT(type) FROM DailyTime WHERE employeeID = '..' GROUP BY type;

-- ตาราง Log
SELECT date, clockIn, clockOut, type, lateHrs FROM DailyTime WHERE employeeID = '..';


----- หน้า 30 -----
-- แท็บ Summary --
--สรุปวันลา
SELECT COUNT(status) FROM LeaveApplication WHERE status = 'approved' AND employeeID = '..';
SELECT COUNT(status) FROM LeaveApplication WHERE status = 'waiting' AND employeeID = '..';
SELECT COUNT(status) FROM LeaveApplication WHERE status = 'rejected' AND employeeID = '..';
********
SELECT employeeID, COUNT(status) FROM LeaveApplication 
WHERE status = 'waiting' AND employeeID IN (SELECT employeeID FROM Information WHERE employeeID = '..');
--แจ้งวันลาที่เหลืออยู่
SELECT sickRemain, personalRemain, vacationRemain, maternityRemain FROM information WHERE employeeID = '..';

-- แท็บ Booking --
--ส่งคำขอลางาน
SELECT leaveName FROM LeaveType;
INSERT INTO LeaveApplication(bookingID, employeeID, leaveID, bookingDate, reason, document, startDate, endDate, status) VALUES ('[value-1]','[value-2]','[value-3]',CURRENT_TIMESTAMP,'[value-5]','[value-6]','[value-7]','[value-8]','waiting');
UPDATE Information INNER JOIN LeaveApplication ON Information.employeeID = LeaveApplication.employeeID AND LeaveApplication.status = 'approved' SET sickRemain = sickRemain-1;
--ในแผนกมีคนลาพร้อมกันกี่คน กี่วัน
SELECT COUNT(LeaveApplication.status), DATEDIFF(LeaveApplication.endDate, LeaveApplication.startDate) FROM LeaveApplication 
INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
AND Position.departmentID = '..'
WHERE LeaveApplication.status = 'approved' GROUP BY LeaveApplication.bookingDate, LeaveApplication.status;

-- แท็บ Status --
--รายละเอียดแต่ละคำขอลา
SELECT * FROM LeaveApplication WHERE employeeID = '..';


----- หน้า 32 -----
-- แท็บ DashBoard Manager --
--มีพนักงานในแผนกลากี่คน **
SELECT COUNT(LeaveApplication.status), LeaveApplication.endDate - LeaveApplication.startDate FROM LeaveApplication 
INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
AND Position.departmentID = '..'
WHERE LeaveApplication.status = 'approved' GROUP BY LeaveApplication.bookingDate, LeaveApplication.status;
--มีขอลากี่ booking **
SELECT COUNT(LeaveApplication.status) FROM LeaveApplication 
INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
AND Position.departmentID = '..'
WHERE LeaveApplication.status = 'waiting' GROUP BY LeaveApplication.bookingDate, LeaveApplication.status;
--มาสายกี่คน
SELECT COUNT(type) FROM DailyTime WHERE type = 'late' GROUP BY date;

-- แท็บ LeaveRequest --
SELECT LeaveApp.* FROM LeaveApplication LeaveApp
INNER JOIN PromotionHistory ON LeaveApp.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
AND Position.departmentID = 'HR000'
WHERE LeaveApp.status = 'waiting';
--
INSERT INTO LeaveBooking(bookingID, confirmation, managerNote) VALUES ('[value-1]','[value-2]','[value-3]');


----- หน้า 33 -----
-- แท็บ Request --
--แสดงตัวเลือก
SELECT documentName FROM Document;
--ส่งคำขอเอกสารจากรายชื่อ เหตุผล
INSERT INTO DocumentRequest(requestID, documentID, employeeID, purpose, requestDate, status) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]');

-- แท็บ Status --
SELECT confirmationDate, status, managerNote FROM RequestBooking WHERE employeeID = '..';


----- หน้า 34 -----
--แสดงคำขอเอกสาร
SELECT * FROM DocumentRequest WHERE status = 'waiting';
INSERT INTO RequestBooking(requestID, confirmationDate, status, managerNote) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]');


----- หน้า 35 -----
-- แท็บ Banking --
--แสดงรายละเอียดข้อมูลเกี่ยวกับธนาคาร
SELECT bankName, bankAccount FROM Information WHERE employeeID = '..';

-- แท็บ get PaySlip --
--ข้อมูลส่วนตัว
SELECT info.employeeID, info.firstName, info.lastName, info.phoneNumber, info.bankName, info.bankAccount, dpm.departmentName, pro.positionName FROM Information info 
INNER JOIN PromotionHistory pro ON info.employeeID = pro.employeeID AND pro.stopDate IS NULL
LEFT JOIN Position pos ON pro.positionName = pos.positionName
LEFT JOIN Department dpm ON pos.departmentID = dpm.departmentID
WHERE info.employeeID = '0e38af30-7a6a4201-9584-42264f2684fc';
--การเงิน
******************************************


----- หน้า 36 -----
-- แท็บ Absent --
******************************************

-- แท็บ Late/EarlyLeave --
******************************************

-- แท็บ OverLeave --
******************************************


----- หน้า 38 -----
--อัพเดตข้อมูลพนักงานปัจจุบัน
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]');
UPDATE PromotionHistory SET stopDate = '[value-4]' WHERE employeeID = '..';
UPDATE Information SET roleID = '[value-1]' WHERE employeeID = '..';

----- หน้า 40 -----
--แท็บ AddEmployee --
--แอดมินเพิ่มรายละเอียดพนักงานใหม่
INSERT INTO Information(employeeID, roleID, identificationNo, firstName, lastName, DOB, sex, phoneNumber, email, address, photo, sickRemain, personalRemain, vacationRemain, maternityRemain, passwordHash, bankName, bankAccount) 
VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]',
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'sickRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'personalRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'vacationRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'maternityRemain'),'[value-16]','[value-17]','[value-18]');
--
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]');

--แท็บ RemoveEmployee --
DELETE * WHERE employeeID = '..';
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]');

----------- Complex -----------
-- เลื่อนตำแหน่ง
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]');
UPDATE PromotionHistory SET positionName = '..' WHERE employeeID = '';
UPDATE Information SET roleID = '..' WHERE employeeID = '';
-- พนักงานออก
UPDATE Information SET SickRemain = NULL, personalRemain = NULL, vacationRemain = NULL, maternityRemain = NULL, roleID = NULL;
DELETE FROM Password WHERE employeeID = '..' 

-- Advanced -- 
-- สรุปแต่ละ status + type + managernote
SELECT L.status , Lt.leaveName , COUNT(L.status) AS count, Lb.managerNote AS managerNote FROM LeaveApplication AS L LEFT JOIN LeaveType AS Lt ON L.leaveID = Lt.leaveID  
    LEFT JOIN LeaveBooking AS Lb ON Lb.bookingID = L.bookingID WHERE employeeID = '0e38af30-7a6a4201-9584-42264f2684fc' GROUP BY status;

