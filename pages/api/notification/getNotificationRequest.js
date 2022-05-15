import excuteQuery from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export default async(req, res) => {

    try {
        const results = await excuteQuery({
            query: `SELECT senderID, title, date, content FROM notification WHERE status = 'waiting'`,
            values: [],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}

//endPoin: http://localhost:3000/api/notification/getNoificationRequest