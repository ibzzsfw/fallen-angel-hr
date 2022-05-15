import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let employeeid = req.headers.employeeid;
    let duration = req.headers.duration;
    let leaveid = req.headers.leaveid;

    try {
        const result = await excuteQuery({
            query: `SELECT status, COUNT(status) AS amount FROM LeaveApplication INNER JOIN leavetype ON leaveapplication.leaveID = leavetype.leaveID WHERE leaveapplication.leaveID = ? AND (bookingDate BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND NOW()) GROUP BY status`,
            values: [leaveid, duration],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}