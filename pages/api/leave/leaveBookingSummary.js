import { httpGet } from '../baseHttp';

const leaveBookingSummary = async (req, res) => {

    let employeeid = req.headers.employeeid;
    let duration = req.headers.duration;
    let leaveid = req.headers.leaveid;

    const queryString = `
        SELECT status, COUNT(status) AS amount 
        FROM LeaveApplication 
        INNER JOIN leavetype 
        ON leaveapplication.leaveID = leavetype.leaveID 
        WHERE leaveapplication.leaveID = ${leaveid} 
        AND (bookingDate BETWEEN DATE_SUB(NOW(), INTERVAL ${duration} DAY) 
        AND NOW()) GROUP BY status
    `;

    const { status, result } = await httpGet(req.method, queryString);

    res.status(status).json(result);
}

export default leaveBookingSummary;