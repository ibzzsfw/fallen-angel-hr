import excuteQuery from '../../../config/db';

export default async (req, res) => {

    try {
        const result = await excuteQuery({
            query: "SELECT COUNT(promotionhistory.employeeID) AS headCount FROM promotionhistory INNER JOIN position ON promotionhistory.positionName = position.positionID WHERE promotionhistory.stopDate IS NULL",
            values: [], 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}