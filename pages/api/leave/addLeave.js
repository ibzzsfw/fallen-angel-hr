import { db } from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {

    let bookingid = uuidv4()
    let employeeid = req.body.employeeid
    let leaveid = req.body.leaveid
    let reason = req.body.reason
    let startdate = req.body.startdate
    let enddate = req.body.enddate

    try {
        let result = await db.transaction()
            .query('INSERT INTO LeaveApplication(bookingID, employeeID, leaveID, reason, startDate, endDate) VALUES (?,?,?,?,?,?);', [bookingid, employeeid, leaveid, reason, startdate, enddate])
            .query('INSERT INTO LeaveBooking(bookingID, confirmation) VALUES (?,?);', [bookingid, 'waiting'])
            .commit()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}