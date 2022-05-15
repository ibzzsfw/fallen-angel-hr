import { db } from '../../../config/db';

export default async (req, res) => {
    let employeeid = req.body.employeeid
    let salary = req.body.salary

    try {
        let result = await db.transaction()
            .query('UPDATE PromotionHistory SET salary = ? WHERE employeeID = ? AND ISNULL(stopDate);', [salary, employeeid])
            .commit()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}