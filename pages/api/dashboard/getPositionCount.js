import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let departmentid = req.headers.departmentid;

    try {
        const result = await excuteQuery({
            query: "SELECT position.positionName, COUNT(promotionhistory.employeeID) AS countPosition FROM promotionhistory INNER JOIN position ON promotionhistory.positionName = position.positionID WHERE promotionhistory.stopDate IS NULL GROUP BY promotionhistory.positionName",
            values: [departmentid], 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}