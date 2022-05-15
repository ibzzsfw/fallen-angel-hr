import { db } from '../../../config/db';

export default async (req, res) => {
  let employeeid = req.body.employeeid

    try {
        let result = await db.transaction()
            .query('UPDATE PromotionHistory SET stopDate = NOW() WHERE employeeID = ? AND ISNULL(stopDate)', [employeeid])
            .query('UPDATE Information SET sickRemain = NULL, personalRemain = NULL, vacationRemain = NULL, maternityRemain = NULL, roleID = NULL, passwordHash = NULL WHERE employeeID = ?;', [employeeid])
            .commit()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}