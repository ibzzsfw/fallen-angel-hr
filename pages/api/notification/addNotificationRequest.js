import excuteQuery from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export default async(req, res) => {

    let senderid = '1b08fc14-d18c-4738-ba76-287285ab79d2'
    let content = req.body.content
    let title = req.body.title

    try {
        const results = await excuteQuery({
            query: "INSERT INTO Notification(NotificationID, senderID, status, date, content, title) VALUES (?, ?, 'waiting', NOW(), ?, ?)",
            values: [uuidv4(), senderid, content, title],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}

//เหลือลองทำ useEffect