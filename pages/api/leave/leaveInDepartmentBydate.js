import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let employeeid = req.headers.employeeid;
    let date = req.headers.date;

    try {
        const result = await excuteQuery({
            query: `SELECT leaveName, status, COUNT(status) AS amount FROM LeaveApplication INNER JOIN leavetype ON leaveapplication.leaveID = leavetype.leaveID WHERE employeeID = ? AND(bookingDate BETWEEN DATE_SUB(NOW(), INTERVAL 365 DAY) AND NOW()) GROUP BY status, leaveapplication.leaveID;`,
            values: [employeeid, duration],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}