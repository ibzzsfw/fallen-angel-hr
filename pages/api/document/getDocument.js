import excuteQuery from '../../../config/db';


export default async (req, res) => {
    if (req.method === 'GET') {
        try {
            const results = await excuteQuery({
                query: `SELECT * FROM Document`,
                values: [],
            });
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

//endPoint: http://localhost:3000/api/document/getDocBookingStatus