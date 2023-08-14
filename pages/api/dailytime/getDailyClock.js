import { openDB } from '../../../config/sqlite';

const getDailyClock = async (req, res) => {

    const db = await openDB();

    let employeeID = '1ac39e28-8e18-4a54-b56a-14a53fac104c'
    let date = new Date(2022, 2, 1).toUTCString();

    const queryString = `
        SELECT clockIn, clockOut 
        FROM DailyTime
        WHERE employeeID = '${employeeID}' 
        AND date = '${date}'
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

export default getDailyClock;