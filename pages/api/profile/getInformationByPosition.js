import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let employeeid = req.headers.employeeid

    try {
        const result = await excuteQuery({
            query: `SELECT PromotionHistory.positionName AS positionID, Position.salary, Position.clockIn, Position.clockOut, PromotionHistory.employeeID 
            FROM PromotionHistory INNER JOIN Position ON PromotionHistory.positionName = Position.positionID
            WHERE employeeID = ? AND ISNULL(stopDate)`,
            values: [employeeid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}