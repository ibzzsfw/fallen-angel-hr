--employeeID = '0e38af30-7a6a4201-9584-42264f2684fc'

----- หน้า 24 -----
--แสดงข้อมูลส่วนตัว
SELECT employeeID, identificationNo, firstName, lastName, DOB, email, phoneNumber, address, photo FROM Information WHERE employeeID = '..';
--แสดงประวัติการศึกษา
SELECT * FROM Education WHERE employeeID = '..';
--แสดงประวัติการเลื่อนตำแหน่ง
SELECT * FROM PromotionHistory WHERE employeeID = '..';
--แสดงจำนวนครั้งการลา แบ่งตามประเภทการลา
SELECT status, COUNT(status) FROM LeaveApplication WHERE employeeID = '..' GROUP BY status;
--แสดงจำนวนครั้งที่ขอคำร้อง เอกสาร แบ่งตามสถานะของคำร้อง
SELECT status, COUNT(status) FROM DocumentRequest WHERE employeeID = '..' GROUP BY status;
--แสดงสรุปจำนวนวัน เลือกเป็นรายสัปดาห์/เดือน **ไม่แน่ใจว่าเข้าใจถูกไหม** และเวลาเข้าออกงานในวันนั้น ๆ 
SELECT type, COUNT(type) FROM DailyTime WHERE employeeID = '0e38af30-7a6a4201-9584-42264f2684fc' AND date BETWEEN '2022-03-11' AND '2022-03-17' GROUP BY type;
SELECT clockIn, clockOut FROM DailyTime WHERE employeeID = '..' AND date = '..';
--แสดงรายได้ทั้งหมดต่อเดือน ปี ?
SELECT SUM(salary + OT + other) FROM Income WHERE employeeID = '..' GROUP BY month;
--แสดงสรุปจำนวนชั่วโมง/การคำนวณรายได้ ขณะนั้นนับเริ่มจากต้นเดือน
CREATE VIEW OTcalculate AS
SELECT OverTime.*, HOUR(TIMEDIFF(TIME(OverTime.clockOut),Position.clockOut)) AS OTHrs, 
(((Position.salary/30)/8)*1.5)*(HOUR(TIMEDIFF(TIME(OverTime.clockOut),Position.clockOut))) AS OTincome
FROM OverTime INNER JOIN Position ON OverTime.positionID = Position.positionID
LEFT JOIN DailyTime ON OverTime.employeeID = DailyTime.employeeID 
AND DATE(OverTime.clockOut) = DailyTime.date
--
SELECT SUM(OTHrs) FROM OTcalculate WHERE employeeID = '..' AND MONTH(clockOut) = '..' AND YEAR(clockOut) = '..'
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
--แสดงเวลาเข้าและออกงานของวันนั้นน ๆ
SELECT clockIn, clockOut FROM DailyTime WHERE employeeID = '..' AND date = '..';
--สรุปจำนวนการมาทำงาน/มาสายในแต่ละเดือน/ปี
SELECT type, COUNT(type) FROM DailyTime WHERE employeeID = '..' GROUP BY type;

-- ตาราง Log
SELECT date, clockIn, clockOut, type, lateHrs FROM DailyTime WHERE employeeID = '..';


----- หน้า 30 -----
-- แท็บ Summary --
--สรุปวันลา
SELECT DATE(leaveapp.startDate) AS startDate, DATE(leaveapp.endDate) AS endDate, LeaveType.leaveName, 
DATEDIFF(leaveapp.endDate, leaveapp.startDate)+1 AS sumDate FROM LeaveApplication leaveapp 
INNER JOIN LeaveType ON leaveapp.leaveID = LeaveType.leaveID
WHERE leaveapp.status = 'approved' AND leaveapp.employeeID = '..'
GROUP BY leaveapp.leaveID, leaveapp.status;
SELECT COUNT(status) FROM LeaveApplication WHERE status = 'approved' AND employeeID = '..';
--
SELECT COUNT(status) FROM LeaveApplication WHERE status = 'waiting' AND employeeID = '..';
--
SELECT COUNT(LeaveApplication.status) AS rejected, LeaveType.leaveName, LeaveBooking.managerNote FROM LeaveApplication
INNER JOIN LeaveType ON LeaveApplication.leaveID = LeaveType.leaveID
LEFT JOIN LeaveBooking ON LeaveApplication.bookingID = LeaveBooking.bookingID
WHERE LeaveApplication.status = 'rejected' AND LeaveApplication.employeeID = '0e38af30-7a6a4201-9584-42264f2684fc'
GROUP BY LeaveApplication.leaveID, LeaveApplication.status;

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
INSERT INTO DocumentRequest(requestID, documentID, employeeID, purpose, requestDate, status) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]',CURRENT_TIMESTAMP,'waiting');

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


----- หน้า 36 ----- ********** น่าจะได้แค่ Late/EarlyLeave ***********
-- แท็บ Absent -- 
SELECT (pro.salary/30)*(COUNT(NOT EXISTS (SELECT clockIn, clockOut FROM DailyTime))) AS absentDeduct FROM PromotionHistory pro 
INNER JOIN DailyTime daily ON pro.employeeID = daily.employeeID
WHERE pro.stopDate IS NULL AND NOT EXISTS (SELECT clockIn, clockOut FROM DailyTime)
AND pro.employeeID = '0e38af30-7a6a4201-9584-42264f2684fc' AND date BETWEEN '2022-03-15' AND '2022-03-17';

-- แท็บ Late/EarlyLeave --
SELECT daily.*,((((pro.salary/30)/8)/60) * daily.lateHrs) AS lateEarlyDeduct FROM PromotionHistory pro
INNER JOIN DailyTime daily ON pro.employeeID = daily.employeeID
WHERE pro.stopDate IS NULL AND pro.employeeID = '..';

-- แท็บ OverLeave --



----- หน้า 38 -----
--อัพเดตข้อมูลพนักงานปัจจุบัน
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]',NULL,'[value-5]');
--update ตำแหน่งเก่า
UPDATE PromotionHistory SET stopDate = '[value-1]' WHERE employeeID = '..';
--update role ใหม่ (ถ้าเลื่อนยศ)
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
-- ส่งคำขอแจ้งเตือน

-- คำขอลางาน

-- เลื่อนตำแหน่ง
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]',NULL,'[value-5]');
UPDATE PromotionHistory SET stopDate = '..' WHERE employeeID = '';
UPDATE Information SET roleID = '..' WHERE employeeID = '';
-- เพิ่มพนักงาน
INSERT INTO Information(employeeID, roleID, identificationNo, firstName, lastName, DOB, sex, phoneNumber, email, address, photo, sickRemain, personalRemain, vacationRemain, maternityRemain, passwordHash, bankName, bankAccount) 
VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]',
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'sickRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'personalRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'vacationRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'maternityRemain'),'[value-16]','[value-17]','[value-18]');
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]', NULL ,'[value-5]');
-- พนักงานออก
UPDATE Information SET SickRemain = NULL, personalRemain = NULL, vacationRemain = NULL, maternityRemain = NULL, roleID = NULL, passwordHash = NULL WHERE employeeID = '..';
UPDATE PromotionHistory SET stopDate = '..' WHERE employeeID = '..';

----------- Advanced -----------
-- สรุปแต่ละ status + type + managernote
SELECT L.status , Lt.leaveName , COUNT(L.status) AS count, Lb.managerNote AS managerNote FROM LeaveApplication AS L LEFT JOIN LeaveType AS Lt ON L.leaveID = Lt.leaveID  
    LEFT JOIN LeaveBooking AS Lb ON Lb.bookingID = L.bookingID WHERE employeeID = '0e38af30-7a6a4201-9584-42264f2684fc' GROUP BY status;
-- จำนวนคนในแผนกที่ลาพร้อมกันในช่วงที่เลือก

-- Dashboard ของ manager

-- Pay slip

-- คำนวณการขาดงาน

-- คำนวณการมาสายหรืออกก่อนเวลา

-- คำนวณการลางานเกินวันอนูญาต