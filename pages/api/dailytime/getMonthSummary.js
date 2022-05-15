import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let employeeid = req.headers.employeeid;
    let type = req.headers.type;

    try {
        const result = await excuteQuery({
            query: "SELECT MONTH(date) AS month, type, COUNT(type) AS count FROM DailyTime_view WHERE employeeID = ? AND type != ? GROUP BY MONTH(date), type",
            values: [employeeid, type], 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}