import excuteQuery from '../../../config/db';

export default async(req, res) => {

    let positionid = req.headers.positionid
    
    try {
        const result = await excuteQuery({
            query: `SELECT firstName, lastName, PromotionHistory.salary, PromotionHistory.employeeID FROM PromotionHistory INNER JOIN Information ON PromotionHistory.employeeID = Information.employeeID WHERE ISNULL(stopDate) AND positionName = ?`,
            values: [positionid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}