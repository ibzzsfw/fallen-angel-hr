import excuteQuery from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {

    if (req.method === 'POST') {
        let employeeid = '0e38af30-7a6a-4201-9584-42264f2684fc'
        let purpose = req.body.purpose
        let documentid = req.body.documentid

        try {
            const results = await excuteQuery({
                query: `INSERT INTO DocumentRequest(requestID, documentID, employeeID, purpose, status) VALUES (?, ?, ?, ?, 'waiting')`,
                values: [uuidv4(), documentid, employeeid, purpose],
            });
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}