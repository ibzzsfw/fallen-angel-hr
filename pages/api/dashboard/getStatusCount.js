import { openDB } from '../../../config/sqlite';

const getStatusCount = async (req, res) => {

    const db = await openDB();

    if (req.method === 'GET') {
        try {
            const result = await db.all(`SELECT type, COUNT(type) AS countStatus FROM Dailytime_view INNER JOIN PromotionHistory ON DailyTime_view.employeeID = PromotionHistory.employeeID LEFT JOIN Position ON PromotionHistory.positionName = Position.positionID WHERE Promotionhistory.stopDate IS NULL GROUP BY type`);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default getStatusCount;

// SELECT type, COUNT(type) AS countStatus FROM Dailytime_view INNER JOIN PromotionHistory ON DailyTime_view.employeeID = PromotionHistory.employeeID LEFT JOIN Position ON PromotionHistory.positionName = Position.positionID WHERE Promotionhistory.stopDate IS NULL GROUP BY type