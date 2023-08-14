import { openDB } from '../../../config/sqlite';

const getDepartment = async (req, res) => {

    const db = await openDB();

    const queryString = `SELECT * FROM department`;

    if (req.method === 'GET') {
        try {
            const result = await db.all(queryString);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default getDepartment;