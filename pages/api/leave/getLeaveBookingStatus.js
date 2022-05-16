// import excuteQuery from '../../../config/db';

// export default async (req, res) => {

//     let employeeid = req.headers.employeeid;

//     try {
//         const results = await excuteQuery({
//             query: `SELECT leaveapplication.*, confirmation, managerNote 
//             FROM leaveapplication INNER JOIN leavebooking ON leavebooking.bookingID = leaveapplication.bookingID
//             WHERE employeeID = ?`,
//             values: [employeeid],
//         });
//         res.status(200).json(results);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }


import excuteQuery from '../../../config/db';

export default async (req, res) => {

    try {
        const results = await excuteQuery({
            query: `SELECT leaveapplication.*, confirmation, managerNote, leaveName, department.departmentName, position.positionName
            FROM leaveapplication INNER JOIN leavebooking ON leavebooking.bookingID = leaveapplication.bookingID
            INNER JOIN leavetype ON leaveapplication.leaveID = leavetype.leaveID
            INNER JOIN promotionhistory ON promotionhistory.employeeID = leaveapplication.employeeID
            INNER JOIN position ON position.positionID = promotionhistory.positionName
            INNER JOIN department ON department.departmentID = position.departmentID`,
            values: [],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}
