import { openDB } from '../../../config/sqlite';

const getPosition = async (req, res) => {

    const db = await openDB();

    let departmentid = req.headers.departmentid

    const queryString = `
        SELECT * 
        FROM position 
        WHERE departmentID = '${departmentid}'
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

export default getPosition;