import { db } from '../../../config/db';

export default async (req, res) => {
    
    let employeeid = req.body.employeeid
    let positionid = req.body.positionid

    try {
        let result = await db.transaction()
            .query('UPDATE PromotionHistory SET stopDate = NOW() WHERE employeeID = ? AND ISNULL(stopDate);', [employeeid])
            .query(`INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES (?, ?, NOW(), NULL, (SELECT salary FROM Position WHERE positionID = ?));`, [employeeid, positionid, positionid])
            .commit()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}