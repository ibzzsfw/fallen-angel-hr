--0e38af30-7a6a-4201-9584-42264f2684fc
--1ac39e28-8e18-4a54-b56a-14a53fac104c DailyTime

----- หน้า 24 Profile page -----
--แสดงข้อมูลส่วนตัว /
SELECT employeeID, identificationNo, firstName, lastName, DOB, email, phoneNumber, address, photo FROM Information WHERE employeeID = '..';
--แสดงประวัติการศึกษา /
SELECT * FROM Education WHERE employeeID = '..';
--แสดงประวัติการเลื่อนตำแหน่ง /
SELECT * FROM PromotionHistory WHERE employeeID = '..';
--แสดงจำนวนครั้งการลา แบ่งตามประเภทการลา /

SELECT status, COUNT(status) FROM LeaveApplication WHERE employeeID = '..' GROUP BY status;
--แสดงจำนวนครั้งที่ขอคำร้อง เอกสาร แบ่งตามสถานะของคำร้อง /
SELECT status, COUNT(status) FROM DocumentRequest WHERE employeeID = '..' GROUP BY status;

--แสดงสรุปจำนวนวัน เลือกเป็นรายสัปดาห์/เดือน และเวลาเข้าออกงานในวันนั้น ๆ /

SELECT type, COUNT(type) FROM DailyTime WHERE employeeID = '..' AND date BETWEEN '2022-03-11' AND '2022-03-17' GROUP BY type;
SELECT date, TIME(clockIn), TIME(clockOut) FROM DailyTime WHERE employeeID = '..' AND date = '..';
--แสดงรายได้ทั้งหมดต่อเดือน ปี /
SELECT PromotionHistory.salary, OTcalculate.OTincome,SUM(PromotionHistory.salary + OTcalculate.OTincome) AS income FROM PromotionHistory
INNER JOIN OTcalculate ON PromotionHistory.employeeID = OTcalculate.employeeID 
WHERE PromotionHistory.employeeID = '..' AND PromotionHistory.stopDate IS NULL AND DATE(OTcalculate.clockOut) BETWEEN '..' AND '..';
--แสดงสรุปจำนวนชั่วโมง/การคำนวณรายได้ ขณะนั้นนับเริ่มจากต้นเดือน /
CREATE VIEW OTcalculate AS
SELECT OverTime.*, HOUR(TIMEDIFF(TIME(OverTime.clockOut),Position.clockOut)) AS OTHrs, 
(((Position.salary/30)/8)*1.5)*(HOUR(TIMEDIFF(TIME(OverTime.clockOut),Position.clockOut))) AS OTincome
FROM OverTime INNER JOIN Position ON OverTime.positionID = Position.positionID
LEFT JOIN DailyTime ON OverTime.employeeID = DailyTime.employeeID 
AND DATE(OverTime.clockOut) = DailyTime.date;

SELECT SUM(OTHrs) FROM OTcalculate WHERE employeeID = '..' AND MONTH(clockOut) = '..' AND YEAR(clockOut) = '..';
--แสดงชื่อตำแหน่ง /
SELECT positionName FROM PromotionHistory WHERE employeeID = '..' AND stopDate IS NULL;

--แสดงชื่อแผนก /
SELECT departmentName FROM Department
INNER JOIN Position ON Department.departmentID = Position.departmentID
LEFT JOIN PromotionHistory ON Position.positionName = PromotionHistory.positionName
WHERE PromotionHistory.employeeID = '..' AND PromotionHistory.stopDate IS NULL;

----- หน้า 27 Nottification -----
-- แท็บ Notification -- /
SELECT content, date FROM Notification;

-- แท็บ Send Notification (Manager) -- /

INSERT INTO Notification(senderID, status, date, content) VALUES ('[value-1]','waiting',CURRENT_DATE,'[value-4]');

-- แท็บ Request Notification (Admin) -- /
SELECT * FROM Notification WHERE status = 'waiting';
UPDATE Notification SET status = 'approved' WHERE notifficationID = '..';


----- หน้า 28 DailyTime page -----
-- แถบ Summary --
--แสดงเวลาเข้าและออกงานของวันนั้นน ๆ /
SELECT clockIn, clockOut FROM DailyTime WHERE employeeID = '..' AND date = '..';
--สรุปจำนวนการมาทำงาน/มาสายในแต่ละเดือน/ปี /
SELECT type, COUNT(type) FROM DailyTime WHERE employeeID = '..' AND date BETWEEN '2022-03-01' AND '2022-03-31' GROUP BY type ;

-- ตาราง Log /
CREATE VIEW DailyTime_view AS
SELECT daily.*, (
CASE
    WHEN daily.type = 'late' THEN MINUTE(TIMEDIFF(TIME(daily.clockIn),pos.clockIn))
	WHEN daily.type = 'earlyLeave' THEN MINUTE(TIMEDIFF(pos.clockOut,TIME(daily.clockOut)))
END) AS lateHrs 
FROM PromotionHistory pro
INNER JOIN DailyTime daily ON pro.employeeID = daily.employeeID
LEFT JOIN Position pos ON pro.positionName = pos.positionName
WHERE pro.stopDate IS NULL;

SELECT DailyTime_view.date, TIME(DailyTime_view.clockIn) AS clockIn, TIME(DailyTime_view.clockOut) AS clockOut, DailyTime_view.type AS type, 
CAST((((pro.salary/30)/8)/60) * DailyTime_view.lateHrs AS DECIMAL(10,2)) AS lateEarlyDeduct, OTcalculate.OTincome FROM DailyTime_view 
INNER JOIN PromotionHistory pro ON DailyTime_view.employeeID = pro.employeeID
LEFT JOIN OTcalculate ON DailyTime_view.employeeID = OTcalculate.employeeID AND DailyTime_view.date = DATE(OTcalculate.clockOut)
WHERE DailyTime_view.employeeID = '1b08fc14-d18c-4738-ba76-287285ab79d2' AND DailyTime_view.type NOT IN ('absent') GROUP BY DailyTime_view.date;


----- หน้า 30 Leave page -----
-- แท็บ Summary --

--สรุปวันลา /

SELECT DATE(leaveapp.startDate) AS startDate, DATE(leaveapp.endDate) AS endDate, LeaveType.leaveName, 
DATEDIFF(leaveapp.endDate, leaveapp.startDate)+1 AS sumDate FROM LeaveApplication leaveapp 
INNER JOIN LeaveType ON leaveapp.leaveID = LeaveType.leaveID
WHERE leaveapp.status = 'approved' AND leaveapp.employeeID = '..'
GROUP BY leaveapp.leaveID, leaveapp.status;
SELECT COUNT(status) AS approved FROM LeaveApplication WHERE status = 'approved' AND employeeID = '..';

--
SELECT COUNT(status) AS waiting FROM LeaveApplication WHERE status = 'waiting' AND employeeID = '..';
--
SELECT COUNT(LeaveApplication.status) AS rejected, LeaveType.leaveName, LeaveBooking.managerNote FROM LeaveApplication
INNER JOIN LeaveType ON LeaveApplication.leaveID = LeaveType.leaveID
LEFT JOIN LeaveBooking ON LeaveApplication.bookingID = LeaveBooking.bookingID
WHERE LeaveApplication.status = 'rejected' AND LeaveApplication.employeeID = '..'
GROUP BY LeaveApplication.leaveID, LeaveApplication.status;

--แจ้งวันลาที่เหลืออยู่ /
SELECT sickRemain, personalRemain, vacationRemain, maternityRemain FROM Information WHERE employeeID = '..';

-- แท็บ Booking --
--ส่งคำขอลางาน /
SELECT leaveName FROM LeaveType;
INSERT INTO LeaveApplication(bookingID, employeeID, leaveID, bookingDate, reason, document, startDate, endDate, status) VALUES ('[value-1]','[value-2]','[value-3]',CURRENT_TIMESTAMP,'[value-5]','[value-6]','[value-7]','[value-8]','waiting');

UPDATE Information INNER JOIN LeaveApplication ON Information.employeeID = LeaveApplication.employeeID AND LeaveApplication.status = 'approved'
SET sickRemain = sickRemain - (SELECT DATEDIFF(DATE(endDate),DATE(startDate)) FROM LeaveApplication WHERE bookingID = '..');
--ในแผนกมีคนลาพร้อมกันกี่คน กี่วัน /
SELECT COUNT(LeaveApplication.status) AS approved, DATEDIFF(LeaveApplication.endDate, LeaveApplication.startDate) AS day FROM LeaveApplication 
INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
AND Position.departmentID = '...' WHERE LeaveApplication.status = 'approved' GROUP BY LeaveApplication.bookingDate, LeaveApplication.status;

-- แท็บ Status --
--รายละเอียดแต่ละคำขอลา /

SELECT * FROM LeaveApplication WHERE employeeID = '..';


----- หน้า 32 Manager Home page -----
-- แท็บ DashBoard Manager --
--มีพนักงานในแผนกลากี่คน /
SELECT DATE(LeaveApplication.startDate), info.firstName, info.lastName, Position.positionID, COUNT(Position.positionID) AS amount FROM LeaveApplication 
INNER JOIN Information info ON LeaveApplication.employeeID = info.employeeID
LEFT JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
WHERE LeaveApplication.status = 'approved' AND Position.departmentID = '..' GROUP BY Position.positionID;
--มีขอลากี่ booking /
SELECT status, COUNT(LeaveApplication.status) FROM LeaveApplication 
INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
WHERE LeaveApplication.status = 'waiting' AND Position.departmentID = '..' GROUP BY LeaveApplication.status;
--มาสายกี่คน /
SELECT type, COUNT(type) FROM DailyTime 
INNER JOIN PromotionHistory ON DailyTime.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName 
WHERE type = 'late' AND Position.departmentID = '..' AND date BETWEEN '..' AND '..' GROUP BY type;

-- แท็บ LeaveRequest -- /
SELECT LeaveApp.* FROM LeaveApplication LeaveApp
INNER JOIN PromotionHistory ON LeaveApp.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
AND Position.departmentID = 'HR000' WHERE LeaveApp.status = 'waiting';
--
INSERT INTO LeaveBooking(bookingID, confirmation, managerNote) VALUES ('[value-1]','[value-2]','[value-3]');


----- หน้า 33 Document Request page -----
-- แท็บ Request --
--แสดงตัวเลือก /
SELECT documentName FROM Document;
--ส่งคำขอเอกสารจากรายชื่อ เหตุผล
INSERT INTO DocumentRequest(requestID, documentID, employeeID, purpose, requestDate, status) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]',CURRENT_TIMESTAMP,'waiting');
INSERT INTO RequestBooking(requestID, confirmationDate, status) VALUES ('[value-1]',CURRENT_TIMESTAMP,'waiting');

-- แท็บ Status -- /

SELECT confirmationDate, status, managerNote FROM RequestBooking WHERE employeeID = '..';


----- หน้า 34 HR Document Request page (HR Manager) -----
--แสดงคำขอเอกสาร /
SELECT * FROM DocumentRequest WHERE status = 'waiting';
INSERT INTO RequestBooking(requestID, confirmationDate, status, managerNote) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]');
-- ไม่แน่ใจว่าต้องมี update กับ delete ต่ออีกไหม

----- หน้า 35 Payment page -----
-- แท็บ Banking -- /
--แสดงรายละเอียดข้อมูลเกี่ยวกับธนาคาร
SELECT bankName, bankAccount FROM Information WHERE employeeID = '..';

-- แท็บ get PaySlip --
--ข้อมูลส่วนตัว /
SELECT info.employeeID, info.firstName, info.lastName, info.phoneNumber, info.bankName, info.bankAccount, dpm.departmentName, pro.positionName FROM Information info 
INNER JOIN PromotionHistory pro ON info.employeeID = pro.employeeID AND pro.stopDate IS NULL
LEFT JOIN Position pos ON pro.positionName = pos.positionName
LEFT JOIN Department dpm ON pos.departmentID = dpm.departmentID
WHERE info.employeeID = '0e38af30-7a6a4201-9584-42264f2684fc';
--การเงิน /
SELECT MONTH(Monthly.month) AS month, pro.salary, SUM(OTcalculate.OTincome) AS overtime, SUM(OTcalculate.OTHrs) AS OTHrs, 
(pro.salary + SUM(OTcalculate.OTincome)) AS incomeTotal,
SUM(Deduction_view.absentDeduct) AS absent, SUM(Deduction_view.lateEarlyDeduct) AS lateEarly,
(SUM(Deduction_view.absentDeduct) + SUM(Deduction_view.lateEarlyDeduct)) AS deductTotal,
(pro.salary + SUM(OTcalculate.OTincome) - SUM(Deduction_view.absentDeduct) - SUM(Deduction_view.lateEarlyDeduct)) AS netPay 
FROM MonthlyPaySlip Monthly
INNER JOIN PromotionHistory pro ON Monthly.employeeID = pro.employeeID
LEFT JOIN OTcalculate ON Monthly.employeeID = OTcalculate.employeeID
LEFT JOIN Deduction_view ON Monthly.employeeID = Deduction_view.employeeID
WHERE Monthly.employeeID = '1ac39e28-8e18-4a54-b56a-14a53fac104c' AND pro.stopDate IS NULL
AND MONTH(Monthly.month) = '04' AND YEAR(Monthly.month) = '2022' 
AND DATE(OTcalculate.clockOut) BETWEEN '2022-03-25' AND '2022-04-25'
AND Deduction_view.date BETWEEN '2022-03-25' AND '2022-04-25';


----- หน้า 36 Deduction page -----
CREATE VIEW Deduction_view AS
SELECT DailyTime_view.employeeID, DailyTime_view.date, DailyTime_view.type, 
CAST(((pro.salary/30) * COUNT(CASE WHEN DailyTime_view.type = 'absent' THEN DailyTime_view.date ELSE NULL END)) AS DECIMAL(10,2)) AS absentDeduct,
CAST(((((pro.salary/30)/8)/60) * DailyTime_view.lateHrs) AS DECIMAL(10,2)) AS lateEarlyDeduct
FROM DailyTime_view
INNER JOIN PromotionHistory pro  ON DailyTime_view.employeeID = pro.employeeID
WHERE pro.stopDate IS NULL GROUP BY DailyTime_view.date, DailyTime_view.type;

-- แท็บ Absent -- /
SELECT date, type, absentDeduct FROM Deduction_view WHERE Deduction_view.type = 'absent' AND employeeID = '..' AND date BETWEEN '..' AND '..';

-- แท็บ Late/EarlyLeave -- /
SELECT Deduction_view.date, TIME(DailyTime_view.clockIn), TIME(DailyTime_view.clockOut), Deduction_view.type, Deduction_view.lateEarlyDeduct FROM Deduction_view
INNER JOIN DailyTime_view ON Deduction_view.employeeID = DailyTime_view.employeeID 
AND Deduction_view.date = DailyTime_view.date WHERE DailyTime_view.clockIn IS NOT NULL AND DailyTime_view.clockOut IS NOT NULL 
AND Deduction_view.lateEarlyDeduct IS NOT NULL Deduction_view.employeeID = '..'
AND Deduction_view.date BETWEEN '..' AND '..' GROUP BY Deduction_view.date;

-- แท็บ OverLeave -- 
CREATE VIEW OverLeave AS
SELECT info.employeeID, LeaveType.leaveName, 
(CASE
	WHEN LeaveType.leaveName = 'sick leave' AND info.sickRemain < 0 THEN
		CAST(ABS(((pro.salary/30) * info.sickRemain)) AS DECIMAL(10,2))
    WHEN LeaveType.leaveName = 'personal leave' AND info.personalRemain < 0 THEN
		CAST(ABS(((pro.salary/30) * info.personalRemain)) AS DECIMAL(10,2))
    WHEN LeaveType.leaveName = 'vacation leave' AND info.vacationRemain < 0 THEN
    	CAST(ABS(((pro.salary/30) * info.vacationRemain)) AS DECIMAL(10,2))
    WHEN LeaveType.leaveName = 'maternity leave' AND info.maternityRemain < 0 THEN
		CAST(ABS(((pro.salary/30) * info.maternityRemain)) AS DECIMAL(10,2))
END) AS overLeaveDeduct FROM LeaveType, Information info
INNER JOIN PromotionHistory pro ON info.employeeID = pro.employeeID

SELECT leaveName, overLeaveDeduct FROM OverLeave WHERE employeeID = '..';


----- หน้า 38 Promotion History page (ADMIN) -----
--อัพเดตข้อมูลพนักงานปัจจุบัน เวลา update 
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]',NULL,'[value-5]');
--update ตำแหน่งเก่า
UPDATE PromotionHistory SET stopDate = '[value-1]' WHERE employeeID = '..';
--update role ใหม่ (ถ้าเลื่อนยศ)
UPDATE Information SET roleID = '[value-1]' WHERE employeeID = '..';

----- หน้า 40 Manage Employee page (ADMIN) -----
--แท็บ AddEmployee --
--แอดมินเพิ่มรายละเอียดพนักงานใหม่
INSERT INTO Information(employeeID, roleID, identificationNo, firstName, lastName, DOB, sex, phoneNumber, email, address, photo, sickRemain, personalRemain, vacationRemain, maternityRemain, passwordHash, bankName, bankAccount) 
VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-16]','[value-17]','[value-18]');
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'sickRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'personalRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'vacationRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'maternityRemain'),
--
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]');

--แท็บ RemoveEmployee --
DELETE * WHERE employeeID = '..';
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]');

----------- Complex -----------
-- ส่งคำขอแจ้งเตือน --
--Manager
INSERT INTO Notification(senderID, status, date, content) VALUES ('[value-1]','waiting',CURRENT_DATE,'[value-4]');
--Admin
SELECT * FROM Notification WHERE status = 'waiting';
UPDATE Notification SET status = '..' WHERE notifficationID = '..';
--ตอนแจ้งเตือน
SELECT content, date FROM Notification;

-- คำขอลางาน --
INSERT INTO DocumentRequest(requestID, documentID, employeeID, purpose, requestDate, status) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]',CURRENT_TIMESTAMP,'waiting');
INSERT INTO RequestBooking(requestID, confirmationDate, status) VALUES ('[value-1]',CURRENT_TIMESTAMP,'waiting');
--ลบวันลา
UPDATE Information INNER JOIN LeaveApplication ON Information.employeeID = LeaveApplication.employeeID AND LeaveApplication.status = 'approved'
SET sickRemain = sickRemain - (SELECT DATEDIFF(DATE(endDate),DATE(startDate)) FROM LeaveApplication WHERE bookingID = '..');

-- เลื่อนตำแหน่ง --
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]',NULL,'[value-5]');
UPDATE PromotionHistory SET stopDate = '..' WHERE employeeID = '';
UPDATE Information SET roleID = '..' WHERE employeeID = '';

-- เพิ่มพนักงาน --
INSERT INTO Information(employeeID, roleID, identificationNo, firstName, lastName, DOB, sex, phoneNumber, email, address, photo, sickRemain, personalRemain, vacationRemain, maternityRemain, passwordHash, bankName, bankAccount) 
VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]',
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'sickRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'personalRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'vacationRemain'),
(SELECT dayAvailable FROM LeaveType WHERE leaveName = 'maternityRemain'),'[value-16]','[value-17]','[value-18]');
INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES ('[value-1]','[value-2]','[value-3]', NULL ,'[value-5]');

-- พนักงานออก --
UPDATE Information SET SickRemain = NULL, personalRemain = NULL, vacationRemain = NULL, maternityRemain = NULL, roleID = NULL, passwordHash = NULL WHERE employeeID = '..';
UPDATE PromotionHistory SET stopDate = '..' WHERE employeeID = '..';


----------- Advanced -----------
-- สรุปแต่ละ status + type + managernote
SELECT DATE(leaveapp.startDate) AS startDate, DATE(leaveapp.endDate) AS endDate, LeaveType.leaveName, 
DATEDIFF(leaveapp.endDate, leaveapp.startDate)+1 AS sumDate FROM LeaveApplication leaveapp 
INNER JOIN LeaveType ON leaveapp.leaveID = LeaveType.leaveID
WHERE leaveapp.status = 'approved' AND leaveapp.employeeID = '..'
GROUP BY leaveapp.leaveID, leaveapp.status;
SELECT COUNT(status) AS approved FROM LeaveApplication WHERE status = 'approved' AND employeeID = '..';
--
SELECT COUNT(status) AS waiting FROM LeaveApplication WHERE status = 'waiting' AND employeeID = '..';
--
SELECT COUNT(LeaveApplication.status) AS rejected, LeaveType.leaveName, LeaveBooking.managerNote FROM LeaveApplication
INNER JOIN LeaveType ON LeaveApplication.leaveID = LeaveType.leaveID
LEFT JOIN LeaveBooking ON LeaveApplication.bookingID = LeaveBooking.bookingID
WHERE LeaveApplication.status = 'rejected' AND LeaveApplication.employeeID = '..'
GROUP BY LeaveApplication.leaveID, LeaveApplication.status;

-- จำนวนคนในแผนกที่ลาพร้อมกันในช่วงที่เลือก --
SELECT COUNT(LeaveApplication.status) AS approved, DATEDIFF(LeaveApplication.endDate, LeaveApplication.startDate) AS day FROM LeaveApplication 
INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
AND Position.departmentID = '...' WHERE LeaveApplication.status = 'approved' GROUP BY LeaveApplication.bookingDate, LeaveApplication.status;

-- Dashboard ของ manager
--มีพนักงานในแผนกลากี่คน 
SELECT DATE(LeaveApplication.startDate), info.firstName, info.lastName, Position.positionID, COUNT(Position.positionID) AS amount FROM LeaveApplication 
INNER JOIN Information info ON LeaveApplication.employeeID = info.employeeID
LEFT JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
WHERE LeaveApplication.status = 'approved' AND Position.departmentID = '..' GROUP BY Position.positionID;
--มีขอลากี่ booking 
SELECT status, COUNT(LeaveApplication.status) FROM LeaveApplication 
INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
WHERE LeaveApplication.status = 'waiting' AND Position.departmentID = '..' GROUP BY LeaveApplication.status;
--มาสายกี่คน 
SELECT type, COUNT(type) FROM DailyTime 
INNER JOIN PromotionHistory ON DailyTime.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName 
WHERE type = 'late' AND Position.departmentID = '..' AND date BETWEEN '..' AND '..' GROUP BY type;

-- Pay slip
--ข้อมูลส่วนตัว 
SELECT info.employeeID, info.firstName, info.lastName, info.phoneNumber, info.bankName, info.bankAccount, dpm.departmentName, pro.positionName FROM Information info 
INNER JOIN PromotionHistory pro ON info.employeeID = pro.employeeID AND pro.stopDate IS NULL
LEFT JOIN Position pos ON pro.positionName = pos.positionName
LEFT JOIN Department dpm ON pos.departmentID = dpm.departmentID
WHERE info.employeeID = '0e38af30-7a6a4201-9584-42264f2684fc';
--การเงิน 
SELECT MONTH(Monthly.month) AS month, pro.salary, SUM(OTcalculate.OTincome) AS overtime, SUM(OTcalculate.OTHrs) AS OTHrs, 
(pro.salary + SUM(OTcalculate.OTincome)) AS incomeTotal,
SUM(Deduction_view.absentDeduct) AS absent, SUM(Deduction_view.lateEarlyDeduct) AS lateEarly,
(SUM(Deduction_view.absentDeduct) + SUM(Deduction_view.lateEarlyDeduct)) AS deductTotal,
(pro.salary + SUM(OTcalculate.OTincome) - SUM(Deduction_view.absentDeduct) - SUM(Deduction_view.lateEarlyDeduct)) AS netPay 
FROM MonthlyPaySlip Monthly
INNER JOIN PromotionHistory pro ON Monthly.employeeID = pro.employeeID
LEFT JOIN OTcalculate ON Monthly.employeeID = OTcalculate.employeeID
LEFT JOIN Deduction_view ON Monthly.employeeID = Deduction_view.employeeID
WHERE Monthly.employeeID = '1ac39e28-8e18-4a54-b56a-14a53fac104c' AND pro.stopDate IS NULL
AND MONTH(Monthly.month) = '04' AND YEAR(Monthly.month) = '2022' 
AND DATE(OTcalculate.clockOut) BETWEEN '2022-03-25' AND '2022-04-25'
AND Deduction_view.date BETWEEN '2022-03-25' AND '2022-04-25';

-- คำนวณการขาดงาน
SELECT DailyTime_view.employeeID, DailyTime_view.date, DailyTime_view.type, ((pro.salary/30) * COUNT(DailyTime_view.date)) AS absentDeduct 
FROM PromotionHistory pro 
INNER JOIN DailyTime_view ON pro.employeeID = DailyTime_view.employeeID
WHERE pro.stopDate IS NULL AND DailyTime_view.type = 'absent'
AND pro.employeeID = '..' AND date BETWEEN '..' AND '..';

-- คำนวณการมาสายหรืออกก่อนเวลา
SELECT daily.*,((((pro.salary/30)/8)/60) * daily.lateHrs) AS lateEarlyDeduct FROM PromotionHistory pro
INNER JOIN DailyTime daily ON pro.employeeID = daily.employeeID
WHERE pro.stopDate IS NULL AND pro.employeeID = '..';

-- คำนวณการลางานเกินวันอนูญาต

SELECT LeaveType.leaveName, 
(CASE
	WHEN LeaveType.leaveName = 'sick leave' AND info.sickRemain < 0 THEN
		CAST(ABS(((pro.salary/30) * info.sickRemain)) AS DECIMAL(10,2))
    WHEN LeaveType.leaveName = 'personal leave' AND info.personalRemain < 0 THEN
		CAST(ABS(((pro.salary/30) * info.personalRemain)) AS DECIMAL(10,2))
    WHEN LeaveType.leaveName = 'vacation leave' AND info.vacationRemain < 0 THEN
    	CAST(ABS(((pro.salary/30) * info.vacationRemain)) AS DECIMAL(10,2))
    WHEN LeaveType.leaveName = 'maternity leave' AND info.maternityRemain < 0 THEN
		CAST(ABS(((pro.salary/30) * info.maternityRemain)) AS DECIMAL(10,2))
END) AS overLeaveDeduct FROM LeaveType, Information info
INNER JOIN PromotionHistory pro ON info.employeeID = pro.employeeID
WHERE info.employeeID = '..';
