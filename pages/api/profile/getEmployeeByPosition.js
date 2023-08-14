import { openDB } from '../../../config/sqlite';

const getEmployeeByPosition = async (req, res) => {

    const db = await openDB();

    let positionid = req.headers.positionid

    const queryString = `
        SELECT firstName, lastName, PromotionHistory.salary, PromotionHistory.employeeID 
        FROM PromotionHistory 
        INNER JOIN Information 
        ON PromotionHistory.employeeID = Information.employeeID
        WHERE stopDate IS NULL 
        AND positionName = '${positionid}'
    `;

    if (req.method === 'GET') {
        try {
            const result = await db.all(queryString);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default getEmployeeByPosition;