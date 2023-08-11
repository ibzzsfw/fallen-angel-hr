/* eslint-disable import/no-anonymous-default-export */
import excuteQuery from '../../../config/db';

export default async (req, res) => {

    if (req.method === 'GET') {
        try {
            const result = await excuteQuery({
                query: `SELECT * FROM UserRole`,
                values: [],
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}