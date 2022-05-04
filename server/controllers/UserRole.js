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

const ShowInfo = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query("SELECT * FROM Information WHERE employeeID = ?", [employeeID], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

/*
const ShowInfo = (req, res, connection) => {
    let employeeID = (req.heders.employeeID || '')
    connection.query("SELECT * FROM Information WHERE employeeID = employeeID", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};
*/
const ShowEducation = (req, res, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query("SELECT * FROM Education WHERE employeeID = ?", [employeeID], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

const ShowPromoHis = (res, req, connection) => {
    let employeeID = (req.headers.employeeID || '')
    connection.query("SELECT * FROM PromotionHistory WHERE employeeID = ?", [employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

const IncomeByMonth = (res, req, connection) => {
    let salary = (req.headers.salary || '')
    let OT = (req.headers.OT || '')
    let other = (req.headers.other || '')
    let employeeID = (req.headers.employeeID || '')
    connection.query("SELECT SUM(? + ? + ?) FROM Income WHERE employeeID = ? GROUP BY month;", [salary, OT, other, employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

const ShowPosName = (res, req, connection) => {
    let Position = (req.headers.Position || '')
    let positionID = (req.headers.positionID || '')
        //let positionName = (req.headers.positionName || '')
        //let OverTime = (req.headers.OverTime || '')
    connection.query("SELECT Position.positionName FROM Position, OverTime WHERE OverTime.positionID = ?.? AND OverTime.employeeID = ?;", [Position, positionID, employeeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

const LeaveCount = (res, req, connection) => {
    let status = (req.headers.status)
    let employeeID = (req.headers.employeeID)
    if (status == 'approved') {
        connection.query("SELECT COUNT(status) FROM LeaveApplication WHERE status = ? AND employeeID = ?;", [status, employeeID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
    } else if (status == 'waiting') {
        connection.query("SELECT COUNT(status) FROM LeaveApplication WHERE status = ? AND employeeID = ?;", [status, employeeID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
    } else if (status == 'rejected') {
        connection.query("SELECT COUNT(status) FROM LeaveApplication WHERE status = ? AND employeeID = ?;", [status, employeeID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
    }
};



export default {
    UserRole,
    ShowInfo,
    ShowEducation,
    ShowPromoHis,
    IncomeByMonth,
    ShowPosName,
    LeaveCount,
}