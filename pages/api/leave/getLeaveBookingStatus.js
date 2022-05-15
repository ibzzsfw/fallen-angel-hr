import excuteQuery from '../../../config/db';

export default async(req, res) => {
    try {
        const results = await excuteQuery({
            query: `SELECT bookingDate AS BookingDate, leaveName AS Type, startDate AS Start, endDate AS End, status FROM leaveapplication 
            INNER JOIN leavetype ON leaveapplication.leaveID = leavetype.leaveID ORDER BY bookingDate;`,
            values: [],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}

//endPoint: http://localhost:3000/api/document/getDocBookingStatus