import { db } from '../../../config/db';

export default async (req, res) => {
    let employeeid = req.body.employeeid
    let positionname = req.body.positionname

    try {
        let result = await db.transaction()
            .query('INSERT INTO PromotionHistory(employeeID, positionName, stopDate) VALUES (?,?,NOW());', [employeeid, positionname])
            .query('DELETE * FROM Informaion WHERE employeeID = ?;', [employeeid])
            .commit()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}