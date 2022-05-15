import excuteQuery from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export default async(req, res) => {

    let employeeid = '0e38af30-7a6a-4201-9584-42264f2684fc'
    let documentid = 'fd6a4083-2483-4b43-879a-30a4b02695d7'
    let purpose = req.body.purpose

    try {
        const results = await excuteQuery({
            query: `INSERT INTO DocumentRequest(requestID, documentID, employeeID, purpose) VALUES (?, ?, ?, ?)`,
            values: [uuidv4(), documentid, employeeid, purpose],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}

//endPoint: http://localhost:3000/api/document/addDocumentRequest
//เหลือลองทำ useEffect