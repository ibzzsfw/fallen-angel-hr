import excuteQuery from '../../../config/db';

export default async (req, res) => {

    try {
        const result = await excuteQuery({
            query: "SELECT type, COUNT(type) AS countStatus FROM Dailytime_view INNER JOIN PromotionHistory ON DailyTime_view.employeeID = PromotionHistory.employeeID LEFT JOIN Position ON PromotionHistory.positionName = Position.positionID WHERE Promotionhistory.stopDate IS NULL GROUP BY type",
            values: [], 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}