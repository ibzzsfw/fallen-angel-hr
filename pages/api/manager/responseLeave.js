import { db } from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {

    let bookingid = req.body.bookingid
    let employeeid = req.body.employeeid
    let leaveid = req.body.leaveid
    let startdate = req.body.startdate
    let enddate = req.body.enddate
    let managernote = req.body.managernote
    let confirmation = req.body.confirmation
    // get day from date diff of startdate and enddate
    let duration = (confirmation === 'approved') ? 2 : 0
    let col = ''

    if (confirmation === 'approved') {
        if (leaveid === 'bcf8bb8e-1f94-48df-8616-bfaed07ce088') {
            col = 'personalRemain'
        }
        if (leaveid === 'c507aff5-8b10-4342-a796-888b06ca12c0') {
            col = 'sickRemain'
        }
        if (leaveid === 'dbf95d5a-f3cf-4c12-8d26-79ad999114dc') {
            col = 'vacationRemain'
        }
        if (leaveid === 'fe2ca9a7-8b1f-48ef-8f7c-1ba69897a1b6') {
            col = 'maternityRemain'
        }
    }

    try {
        let result = await db.transaction()
            .query('UPDATE LeaveApplication SET status = ? WHERE bookingID = ?;', [confirmation, bookingid])
            .query('UPDATE LeaveBooking SET confirmation = ?, managerNote = ?;', [confirmation, managernote])
            .query('UPDATE Information SET ' + col + ' = ' + col + ' - ? WHERE employeeID = ?;', [duration, employeeid])
            // .query('UPDATE Information SET '+col+' = '+col+' - (CASE WHEN ? = approved THEN DATEDIFF(?,?) ELSE 0) WHERE employeeID = ?;', [confirmation, enddate, startdate, employeeid])
            .commit()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}