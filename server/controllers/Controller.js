import express from "express";

const UserRole = (req, res, connection) => {
    connection.query("SELECT * FROM UserRole", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//----- หน้า 24 Profile page -----
//--แสดงข้อมูลส่วนตัว /
const ShowInfo = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT employeeID, identificationNo, firstName, lastName, DOB, email, phoneNumber, address, photo FROM Information WHERE employeeID = ?;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//---แสดงประวัติการศึกษา 
const ShowEducation = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT * FROM Education WHERE employeeID = ?`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//--แสดงประวัติการเลื่อนตำแหน่ง
const ShowPromotionHistory = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT * FROM PromotionHistory WHERE employeeID = ?`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};


//--แสดงจำนวนครั้งการลา แบ่งตามประเภทการลา 
const CountEachTypeOfLeave = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT status, COUNT(status) FROM LeaveApplication 
                WHERE employeeID = ? GROUP BY status;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//--แสดงจำนวนครั้งที่ขอคำร้อง เอกสาร แบ่งตามสถานะของคำร้อง /
const CountEachTypeOfRequest = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT status, COUNT(status) FROM DocumentRequest WHERE employeeID = ? GROUP BY status;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//--แสดงสรุปจำนวนวัน เลือกเป็นรายสัปดาห์/เดือน และเวลาเข้าออกงานในวันนั้น ๆ /
const SummaryClockInOut = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')

    connection.query(`SELECT type, COUNT(type) FROM DailyTime WHERE employeeID = ? AND date BETWEEN '2022-03-11' AND '2022-03-17' GROUP BY type;`, [employeeID, , ], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    connection.query(`SELECT date, TIME(clockIn), TIME(clockOut) FROM DailyTime WHERE employeeID = ? AND date = ?;`, [employeeID, ], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//--แสดงรายได้ทั้งหมดต่อเดือน ปี /
const ShowIncomePerMonthYear = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT PromotionHistory.salary, OTcalculate.OTincome,SUM(PromotionHistory.salary + OTcalculate.OTincome) AS income FROM PromotionHistory
                    INNER JOIN OTcalculate ON PromotionHistory.employeeID = OTcalculate.employeeID 
                    WHERE PromotionHistory.employeeID = ? AND PromotionHistory.stopDate IS NULL 
                    AND DATE(OTcalculate.clockOut) BETWEEN '..' AND '..';`, [employeeID, , ], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//--แสดงสรุปจำนวนชั่วโมง/การคำนวณรายได้ ขณะนั้นนับเริ่มจากต้นเดือน /
const SummaryHoursIncomeFromBeginOfMonth = (req, res, connection) => {
    connection.query(`SELECT SUM(OTHrs) FROM OTcalculate WHERE employeeID = ? AND MONTH(clockOut) = '..' 
                AND YEAR(clockOut) = '..';`, [employeeID, , ], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//--แสดงชื่อตำแหน่ง /
const ShowPositionName = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query("SELECT positionName FROM PromotionHistory WHERE employeeID = ? AND stopDate IS NULL;;", [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//--แสดงชื่อแผนก /
const ShowDepartmentName = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT departmentName FROM Department INNER JOIN Position ON Department.departmentID = Position.departmentID 
                    LEFT JOIN PromotionHistory ON Position.positionName = PromotionHistory.positionName WHERE PromotionHistory.employeeID = ? AND PromotionHistory.stopDate IS NULL;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//----- หน้า 27 Nottification -----
//-- แท็บ Notification -- /
const ShowNotification = (req, connection) => {
    connection.query(`SELECT content, date FROM Notification;`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//----- หน้า 28 DailyTime page -----
//-- แถบ Summary --
//--แสดงเวลาเข้าและออกงานของวันนั้นน ๆ /
const ShowDailyClockInOut = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let date = (req.headers.employeeID || '')
    connection.query("SELECT clockIn, clockOut FROM DailyTime WHERE employeeID = ? AND date = ?;", [employeeID, date], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//--สรุปจำนวนการมาทำงาน/มาสายในแต่ละเดือน/ปี /
const SummaryWorkPerMonthYear = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT type, COUNT(type) FROM DailyTime WHERE employeeID = ? AND date 
                BETWEEN '2022-03-01' AND '2022-03-31' GROUP BY type ;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//-- ตาราง Log /
const ShowLogTable = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let type = (req.headers.type || '')
    connection.query(`SELECT DailyTime_view.date, TIME(DailyTime_view.clockIn) AS clockIn, TIME(DailyTime_view.clockOut) AS clockOut, DailyTime_view.type AS type, 
                CAST((((pro.salary/30)/8)/60) * DailyTime_view.lateHrs AS DECIMAL(10,2)) AS lateEarlyDeduct, OTcalculate.OTincome FROM DailyTime_view 
                INNER JOIN PromotionHistory pro ON DailyTime_view.employeeID = pro.employeeID
                LEFT JOIN OTcalculate ON DailyTime_view.employeeID = OTcalculate.employeeID AND DailyTime_view.date = DATE(OTcalculate.clockOut)
                WHERE DailyTime_view.employeeID = ?
                AND DailyTime_view.type NOT IN (?) GROUP BY DailyTime_view.date;`, [employeeID, type], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//----- หน้า 30 Leave page -----
//-- แท็บ Summary --
//--สรุปวันลา /
const SummaryLeave = (req, res, connection) => {
    //let status = (req.headers.status);
    let status = 'approved'
        //let employeeID = (req.headers.employeeID || '')
    let employeeID = '0e38af30-7a6a-4201-9584-42264f2684fc'
    if (status == 'approved') {
        connection.query(`SELECT DATE(leaveapp.startDate) AS startDate, COUNT(status) AS approved ,DATE(leaveapp.endDate) AS endDate, LeaveType.leaveName, 
                    DATEDIFF(leaveapp.endDate, leaveapp.startDate)+1 AS sumDate FROM LeaveApplication leaveapp 
                    INNER JOIN LeaveType ON leaveapp.leaveID = LeaveType.leaveID
                    WHERE leaveapp.status = ? AND leaveapp.employeeID = ?
                    GROUP BY leaveapp.leaveID, leaveapp.status;`, [status, employeeID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
    } else
    if (status == 'waiting') {
        connection.query(`SELECT COUNT(status) AS waiting FROM LeaveApplication WHERE status = ? AND employeeID = ?;`, [status, employeeID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
    } else if (status == 'rejected') {
        connection.query(`SELECT COUNT(LeaveApplication.status) AS rejected, LeaveType.leaveName, LeaveBooking.managerNote FROM LeaveApplication
                    INNER JOIN LeaveType ON LeaveApplication.leaveID = LeaveType.leaveID
                    LEFT JOIN LeaveBooking ON LeaveApplication.bookingID = LeaveBooking.bookingID
                    WHERE LeaveApplication.status = ? AND LeaveApplication.employeeID = ?
                    GROUP BY LeaveApplication.leaveID, LeaveApplication.status;`, [status, employeeID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }
};
//--ส่ งคำขอลางาน /
const RequestLeave = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let bookingID = (req.headers.bookingID || '')
    let leaveID = (req.headers.leaveID || '')
    let bookingDate = (req.headers.bookingDate || '')
    let reason = (req.headers.reason || '')
    let document = (req.headers.document || '')
    let startDate = (req.headers.startDate || '')
    let endDate = (req.headers.endDate || '')
    let status = (req.headers.status || '')
    connection.query("INSERT INTO LeaveApplication(bookingID, employeeID, leaveID, bookingDate, reason, document, startDate, endDate, status) VALUES (?,?,?,?,?,?,?,?,?)", [bookingID, employeeID, leaveID, bookingDate, reason, document, startDate, endDate, status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};


const CountAbsentLate = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query("SELECT type, COUNT(type) AS count FROM DailyTime WHERE employeeID = ? GROUP BY type;", [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};


//--แจ้งวันลาที่เหลืออยู่ /
const ShowLeaveRemain = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query("SELECT sickRemain, personalRemain, vacationRemain, maternityRemain FROM information WHERE employeeID = ?;", [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//-- แท็บ Status --
//--รายละเอียดแต่ละคำขอลา /
const ShowLeaveDeatils = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query("SELECT * FROM LeaveApplication WHERE employeeID = ?", [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//-- -- - หน้ า 32 Manager Home page-- -- -
// Dashboard Manager
//มีพนักงานในแผนกลากี่คน **ช่วงวันที่ ให้ชื่อแสดงทุกวันที่ยังอยู่ในช่วงลา
// ใช้ร่วมกัย CountLeaveInDpmAtSameTime
//มีขอลากี่ booking 
const CountBooking = (req, res, connection) => {
    let departmentID = (req.headers.departmentID || '')
    let status = (req.headers.status || '')
    connection.query(`SELECT COUNT(LeaveApplication.status) FROM LeaveApplication INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID 
                    AND PromotionHistory.stopDate IS NULL LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName AND Position.departmentID = ? 
                    WHERE LeaveApplication.status = ? GROUP BY LeaveApplication.bookingDate, LeaveApplication.status;`, [departmentID, status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(err);
            res.send(result);
        }
    });
};

//มาสายกี่คน
const CountLate = (req, res, connection) => {
    let type = (req.headers.type || '')
    let departmentID = (req.headers.departmentID || '')
    let date = (req.headers.date || '')
    connection.query(`SELECT type, COUNT(type) FROM DailyTime
                INNER JOIN PromotionHistory ON DailyTime.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
                LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName 
                WHERE type = ? AND Position.departmentID = ? AND date BETWEEN ? AND ? GROUP BY type;`, [type, departmentID, date, date], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(err);
            res.send(result);
        }
    });
};


//----- หน้า 33 Document Request page -----
// แท็บ LeaveRequest--
// Document request page
const ShowDocumentName = (req, res, connection) => {
    connection.query(`SELECT documentName FROM Document;`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

// ส่งคำขอเอกสารจากรายชื่อ เหตุผล 
const LeaveRequestFromNamePurpose = (req, res, connection) => {
    let requestID = (req.headers.requestID || '')
    let documentID = (req.headers.documentID || '')
    let employeeID = (req.headers.employeeID || '')
    let purpose = (req.headers.purpose || '')
    let requestDate = (req.headers.requestDate || '')
    let status = (req.headers.status || '')
        // new date , now
    connection.query(`INSERT INTO DocumentRequest(requestID, documentID, employeeID, purpose, requestDate, status) 
                VALUES (?,?,?,?,CURRENT_TIMESTAMP,?);`, [requestID, documentID, employeeID, purpose, , status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    connection.query(`INSERT INTO RequestBooking(requestID, confirmationDate, status) VALUES (?,?,?);`, [requestID, confirmationDate, status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//-- แท็บ Status -- /
const StatusTab = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT confirmationDate, status, managerNote FROM RequestBooking WHERE employeeID = ?;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

// หน้า 34 HR Document Request page (HR Manager) -----
//--แสดงคำขอเอกสาร /
const ShowDocumentRequest = (req, res, connection) => {
    let status = (req.headers.status || '')
    connection.query(`SELECT * FROM DocumentRequest WHERE status = ?;`, [status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    connection.query(`INSERT INTO RequestBooking(requestID, confirmationDate, status, managerNote) 
                VALUES (?,?,?,?);`, [requestID, confirmationDate, status, managerNote], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}



// หน้า 35 Payment page -----
// แท็บ Banking--
// แสดงรายละเอียดข้ อมูลเกี่ ยวกั บธนาคาร

const ShowBankAccount = (req, res, connection) => {
    let employeeID = '0e38af30-7a6a-4201-9584-42264f2684fc';
    connection.query(`SELECT bankName, bankAccount FROM Information WHERE employeeID = ?`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

// แท็บ get PaySlip --
// ข้อมูลส่วนตัว
const PaySlipInfo = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT info.employeeID, info.firstName, info.lastName, info.phoneNumber, info.bankName, info.bankAccount, dpm.departmentName, pro.positionName FROM Information info 
                    INNER JOIN PromotionHistory pro ON info.employeeID = pro.employeeID AND pro.stopDate IS NULL
                    LEFT JOIN Position pos ON pro.positionName = pos.positionName
                    LEFT JOIN Department dpm ON pos.departmentID = dpm.departmentID
                    WHERE info.employeeID = ?;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

// การเงิน
const PaySlipFinance = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT MONTH(Monthly.month) AS month, pro.salary, SUM(OTcalculate.OTincome) AS overtime, SUM(OTcalculate.OTHrs) AS OTHrs, 
                (pro.salary + SUM(OTcalculate.OTincome)) AS incomeTotal,
                SUM(Deduction_view.absentDeduct) AS absent, SUM(Deduction_view.lateEarlyDeduct) AS lateEarly,
                (SUM(Deduction_view.absentDeduct) + SUM(Deduction_view.lateEarlyDeduct)) AS deductTotal,
                (pro.salary + SUM(OTcalculate.OTincome) - SUM(Deduction_view.absentDeduct) - SUM(Deduction_view.lateEarlyDeduct)) AS netPay 
                FROM MonthlyPaySlip Monthly
                INNER JOIN PromotionHistory pro ON Monthly.employeeID = pro.employeeID
                LEFT JOIN OTcalculate ON Monthly.employeeID = OTcalculate.employeeID
                LEFT JOIN Deduction_view ON Monthly.employeeID = Deduction_view.employeeID
                WHERE Monthly.employeeID = ? AND pro.stopDate IS NULL
                AND MONTH(Monthly.month) = ? AND YEAR(Monthly.month) = ? 
                AND DATE(OTcalculate.clockOut) BETWEEN ? AND ?
                AND Deduction_view.date BETWEEN ? AND ?;`, [employeeID, month, year, month, month, month, month], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

// หน้า 36 Deduction page -----
const AbsentTab = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT date, type, absentDeduct FROM Deduction_view WHERE Deduction_view.type = ?
                AND employeeID = ? AND date BETWEEN '..' AND '..';`, [type, employeeID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

// แท็บ Late/EarlyLeave --
const LateEarlyLeaveTab = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT Deduction_view.date, TIME(DailyTime_view.clockIn), TIME(DailyTime_view.clockOut), Deduction_view.type, Deduction_view.lateEarlyDeduct 
                FROM Deduction_view
                INNER JOIN DailyTime_view ON Deduction_view.employeeID = DailyTime_view.employeeID 
                AND Deduction_view.date = DailyTime_view.date WHERE DailyTime_view.clockIn IS NOT NULL AND DailyTime_view.clockOut IS NOT NULL 
                AND Deduction_view.lateEarlyDeduct IS NOT NULL Deduction_view.employeeID = ?
                AND Deduction_view.date BETWEEN '..' AND '..' GROUP BY Deduction_view.date;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//-- แท็บ OverLeave -- 
const OverLeaveTab = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT leaveName, overLeaveDeduct FROM OverLeave WHERE employeeID = ?;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

// หน้า 38 Promotion History page (ADMIN) -----
// อัพเดตข้อมูลพนักงานปัจจุบัน
const UpdateEmployeeInfo = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let positionName = (req.headers.positionName || '')
    let startDate = (req.headers.startDate || '')
        //let stopDate = (req.headers.stopDate || '')
    let salary = (req.headers.salary || '')
    connection.query(`INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) 
                VALUES (?,?,?,NULL,?);`, [employeeID, positionName, startDate, salary], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

// update ตำแหน่งเก่า
const UpdateOldPosition = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let stopDate = (req.headers.stopDate || '')
    connection.query(`UPDATE PromotionHistory SET stopDate = ? WHERE employeeID = ?;`, [stopDate, employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

// update role ใหม่ (ถ้าเลื่อนยศ)
const UpdateRole = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let roleID = (req.headers.roleID || '')
    connection.query(`UPDATE Information SET roleID = ? WHERE employeeID = ?;`, [roleID, employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

// หน้า 40 Manage Employee page (ADMIN) -----
// แท็บ AddEmployee --
// แอดมินเพิ่มรายละเอียดพนักงานใหม่
// ใช้ร่วมกับ AddEmployee


// แท็บ RemoveEmployee --
const RemoveEmployee = async(req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    const Remove1 = connection.query(`DELETE * WHERE employeeID = ?;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    const Remove2 = connection.query(`INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES (?,?,?,?,?);`, [employeeID, positionName, startDate, stopDate, salary], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}


//----------- Complex -----------
//-- ส่งคำขอแจ้งเตือน --
//--Manager
const ManageRequestSendNotification = (req, res, connection) => {
    let senderID = (req.headers.senderID || '');
    let status = 'waiting';
    let date = (req.headers.date || '');
    let content = (req.headers.content || '');
    connection.query(`INSERT INTO Notification(senderID, status, date, content) VALUES (?,?,?,?);`, [senderID, status, date, content], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};
//--Admin
const AdminRequestSendNotification = (req, res, connection) => {
    let status = 'waiting'
    let notifficationID = (req.headers.notifficationID || '')
    connection.query(`SELECT * FROM Notification WHERE status = ?;`, [status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    connection.query(`UPDATE Notification SET status = ? WHERE notifficationID = ?;`, [status, notifficationID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};
//ตอนแจ้งเตือน
// ใช้ร่วมกับ ShowNotification

//-- คำขอลางาน --
// ใช้ร่วมกับ LeaveRequestFromNamePurpose
const RequestLeaveBooking = (req, res, connection) => {
    let requestID = (req.headers.requestID || '')
    let documentID = (req.headers.documentID || '')
    let employeeID = (req.headers.employeeID || '')
    let purpose = (req.headers.purpose || '')
    let requestDate = new Date();
    //let requestDate = (req.headers.requestDate || '')
    let confirmationDate = new Date();
    let status = 'waiting';
    let bookingID = (req.headers.status || '')
    connection.query(`INSERT INTO DocumentRequest(requestID, documentID, employeeID, purpose, requestDate, status) 
                    VALUES (?,?,?,?,?,?);`, [requestID, documentID, employeeID, purpose, requestDate, status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    connection.query(`INSERT INTO RequestBooking(requestID, confirmationDate, status) 
                    VALUES (?,?,?);`, [requestID, confirmationDate, status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//--ลบวันลา
const ReduceDayRemain = async(req, res, connection) => {
    let status = (req.headers.status || '')
    let bookingID = (req.headers.bookingID || '')
    const RDRM1 = await connection.query(`UPDATE Information INNER JOIN LeaveApplication ON Information.employeeID = LeaveApplication.employeeID 
                    AND LeaveApplication.status = ?`, [status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(RDRM1);
            res.send(RDRM1);
        }
    });
    const RDRM2 = await connection.query(`SET sickRemain = sickRemain - (SELECT DATEDIFF(DATE(endDate),DATE(startDate)) 
                    FROM LeaveApplication WHERE bookingID = ?);`, [bookingID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(RDRM2);
            res.send(RDRM2);
        }
    });

}



//-- เลื่อนตำแหน่ง --
const Promote = (req, res, connection) => { //เปลี่ยนเป็นของ manager แทน
    let employeeID = (req.headers.employeeID || '')
    let positionName = (req.headers.positionName || '')
    let startDate = (req.headers.startDate || '')
    let stopDate = (req.headers.stopDate || '')
    let salary = (req.headers.salary || '')
    connection.query(`INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) 
                VALUES (?,?,?,?,?);`, [employeeID, positionName, startDate, stopDate, salary], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    connection.query(`UPDATE PromotionHistory SET stopDate = ? WHERE employeeID = ?;`, [stopDate, employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    connection.query(`UPDATE Information SET roleID = ? WHERE employeeID = ?;`, [roleID, employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//-- เพิ่มพนักงาน --
const AddEmployee = async(req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let roleID = (req.headers.roleID || '')
    let identificationNo = (req.headers.identificationNo || '')
    let firstName = (req.headers.firstName || '')
    let lastName = (req.headers.lastName || '')
    let sex = (req.headers.sex || '')
    let email = (req.headers.email || '')
    let bankName = (req.headers.bankName || '')
    let bankAccount = (req.headers.bankAccount || '')
    let passwordHash = (req.headers.passwordHash || '')
        // roleid identri firstname  alstname sex email bankaccount bank
        //defaurlt pasword as identification no
    const AddEmployee1 = await connection.query(`INSERT INTO Information(employeeID, roleID, identificationNo, firstName, lastName, sex, email, passwordHash, bankName, bankAccount) 
                VALUES (?,?,?,?,?,?,?,?,?,?);`, [employeeID, roleID, identificationNo, firstName, lastName, sex, email, passwordHash, bankName, bankAccount], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(AddEmployee1);
            res.send(AddEmployee1);
        }
    });
    if (sex == 'M') {
        let maternityRemain = NULL;
        const AddEmployee2 = await connection.query(`SELECT dayAvailable FROM LeaveType WHERE leaveName = 'sickRemain' AND leaveName = 'personalRemain' 
            AND leaveName = 'vacationRemain' AND leaveName = ?`, [maternityRemain], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(AddEmployee2);
                res.send(AddEmployee2);
            }
        });
    } else if (sex == 'W') {
        const AddEmployee2 = await connection.query(`SELECT dayAvailable FROM LeaveType WHERE leaveName = 'sickRemain' AND leaveName = 'personalRemain' 
            AND leaveName = 'vacationRemain' AND leaveName = 'maternityRemain'`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(AddEmployee2);
                res.send(AddEmployee2);
            }
        });
    }
    const AddEmployee3 = await connection.query(`INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) 
                VALUES (?,?,?, NULL ,?);`, [employeeID, positionName, startDate, salary], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(AddEmployee3);
            res.send(AddEmployee3);
        }
    });
}

//-- พนักงานออก --
const EmployeeLeftJob = async(req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let stopDate = (req.headers.employeeID || '')
    const result1 = await connection.query(`UPDATE Information SET SickRemain = ?, personalRemain = ?, vacationRemain = ?, 
                maternityRemain = ?, roleID = ?, passwordHash = ? WHERE employeeID = ?;`, [NULL, NULL, NULL, NULL, NULL, NULL, employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result1);
            res.send(result1);
        }
    })
    const result2 = await connection.query(`UPDATE PromotionHistory SET stopDate = ? WHERE employeeID = ?;`, [stopDate, employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result2);
            res.send(result2);
        }
    })
}

//----------- Advanced -----------
//-- สรุปแต่ละ status + type + managernote
const SummaryStatusTypeManagernote = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let status = (req.headers.status || '')
    connection.query(`SELECT DATE(leaveapp.startDate) AS startDate, DATE(leaveapp.endDate) AS endDate, LeaveType.leaveName, 
                DATEDIFF(leaveapp.endDate, leaveapp.startDate)+1 AS sumDate FROM LeaveApplication leaveapp 
                INNER JOIN LeaveType ON leaveapp.leaveID = LeaveType.leaveID
                WHERE leaveapp.status = ? AND leaveapp.employeeID = ?
                GROUP BY leaveapp.leaveID, leaveapp.status;`, [status, employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//-- จำนวนคนในแผนกที่ลาพร้อมกันในช่วงที่เลือก --
const CountLeaveInDpmAtSameTime = (req, res, connection) => {
    let departmentID = (req.headers.departmentID || '')
    let status = (req.headers.status || '')
    connection.query(`SELECT COUNT(LeaveApplication.status) AS approved, DATEDIFF(LeaveApplication.endDate, LeaveApplication.startDate) AS day FROM LeaveApplication 
                INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
                LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
                AND Position.departmentID = ? WHERE LeaveApplication.status = ? GROUP BY LeaveApplication.bookingDate, LeaveApplication.status;`, [departmentID, status], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

//-- จำนวนคนในแผนกที่ลาพร้อมกันในช่วงที่เลือก --
// ใช้ร่วมกับ CountLeaveInDpmAtSameTime

//-- Dashboard ของ manager
//--มีพนักงานในแผนกลากี่คน 
const CountLeaveInDpm = (req, res, connection) => {
    let status = (req.headers.status || '')
    let departmentID = (req.headers.departmentID || '')
    connection.query(`SELECT DATE(LeaveApplication.startDate), info.firstName, info.lastName, Position.positionID, COUNT(Position.positionID) AS amount FROM LeaveApplication 
                INNER JOIN Information info ON LeaveApplication.employeeID = info.employeeID
                LEFT JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
                LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
                WHERE LeaveApplication.status = ? AND Position.departmentID = ? GROUP BY Position.positionID;`, [status, departmentID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//--มีขอลากี่ booking 
const CountWaitingBooking = (req, res, connection) => {
    let status = 'waiting';
    let departmentID = (req.headers.departmentID || '')
    connection.query(`SELECT status, COUNT(LeaveApplication.status) FROM LeaveApplication 
                INNER JOIN PromotionHistory ON LeaveApplication.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
                LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName
                WHERE LeaveApplication.status = ? AND Position.departmentID = ? GROUP BY LeaveApplication.status;`, [status, departmentID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//--มาสายกี่คน 
const CountLateDuring = (req, res, connection) => {
    let status = (req.headers.status || '')
    let departmentID = (req.headers.departmentID || '') // เติมส่วนของ Date
        //let date = (req.headers.)
    connection.query(`SELECT type, COUNT(type) FROM DailyTime 
                INNER JOIN PromotionHistory ON DailyTime.employeeID = PromotionHistory.employeeID AND PromotionHistory.stopDate IS NULL
                LEFT JOIN Position ON PromotionHistory.positionName = Position.positionName 
                WHERE type = ?' AND Position.departmentID = ? AND date BETWEEN ? AND ? GROUP BY type;`, [status, departmentID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//-- Pay slip
//--ข้อมูลส่วนตัว  ใช้ร่วมกับ PaySlipInfo 
//การเงิน ใช้ร่วมกับ PaySlipFinance อย่าลืมเช็ค date

//-- คำนวณการขาดงาน ติดปัญหาเรื่อง date
const CalculateAbsent = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    let startDate = (req.headers.date || '')
    let endDate = (req.headers.date || '')
    connection.query(`SELECT DailyTime_view.employeeID, DailyTime_view.date, DailyTime_view.type, ((pro.salary/30) * COUNT(DailyTime_view.date)) AS absentDeduct 
                FROM PromotionHistory pro 
                INNER JOIN DailyTime_view ON pro.employeeID = DailyTime_view.employeeID
                WHERE pro.stopDate IS NULL AND DailyTime_view.type = 'absent'
                AND pro.employeeID = ? AND date BETWEEN ? AND ?;`, [employeeID, startDate, endDate], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//-- คำนวณการมาสายหรืออกก่อนเวลา
const CalculateLeaveEarlyLate = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT daily.*,((((pro.salary/30)/8)/60) * daily.lateHrs) AS lateEarlyDeduct FROM PromotionHistory pro
                INNER JOIN DailyTime daily ON pro.employeeID = daily.employeeID
                WHERE pro.stopDate IS NULL AND pro.employeeID = ?;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

//-- คำนวณการลางานเกินวันอนูญาต
const CalculateExcessLeave = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query(`SELECT leaveName, overLeaveDeduct FROM OverLeave WHERE employeeID = ?;`, [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

export default {
    // total 52
    ShowInfo,
    UserRole,
    RequestLeave,
    ShowEducation,
    ShowPositionName,
    CountEachTypeOfLeave,
    ShowPromotionHistory,
    CountEachTypeOfRequest,
    SummaryHoursIncomeFromBeginOfMonth,
    LeaveRequestFromNamePurpose,
    CountLeaveInDpmAtSameTime,
    SummaryWorkPerMonthYear,
    ShowIncomePerMonthYear,
    CountWaitingBooking,
    ShowDocumentRequest,
    ShowDailyClockInOut,
    UpdateEmployeeInfo,
    ShowDepartmentName,
    LateEarlyLeaveTab,
    SummaryClockInOut,
    ShowDocumentName,
    ShowNotification,
    ShowLeaveDeatils,
    CountAbsentLate,
    ShowLeaveRemain,
    ShowBankAccount,
    PaySlipFinance,
    CountBooking,
    SummaryLeave,
    ShowLogTable,
    OverLeaveTab,
    PaySlipInfo,
    CountLate,
    StatusTab,
    AbsentTab,
    UpdateOldPosition,
    UpdateRole,
    ReduceDayRemain,
    RemoveEmployee,
    ManageRequestSendNotification,
    AdminRequestSendNotification,
    RequestLeaveBooking,
    Promote,
    AddEmployee,
    EmployeeLeftJob,
    CountLeaveInDpm,
    CountLateDuring,
    CalculateAbsent,
    CalculateLeaveEarlyLate,
    CalculateExcessLeave,
    SummaryStatusTypeManagernote,
}