import excuteQuery from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export default async(req, res) => {

    let senderid = req.body.senderid
    let content = req.body.content
    let title = req.body.title

    try {
        const results = await excuteQuery({
            query: "INSERT INTO Notification(NotificationID, senderID, status, date, content, title) VALUES (?, ?, 'waiting', NOW(), ?, ?)",
            values: [uuidv4(), '9244b6b0-c51a-4fc2-a363-1c7d9b2fa5dc', content, title],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}