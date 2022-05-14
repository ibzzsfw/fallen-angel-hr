//import serverlessMysql from 'serverless-mysql';
import excuteQuery from "../../../config/db";


export default async(req, res) => {
    let employeeid = (req.headers.employeeid)
    try {
        const result = await excuteQuery({
            query: `SELECT SUM(deduct) FROM deduction where employeeID = ?;`,
            values: [employeeid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}