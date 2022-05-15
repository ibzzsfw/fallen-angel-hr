import excuteQuery from '../../../config/db';


//ไม่แน่ใจต้อง status = 'waiting' ไหม
export default async(req, res) => {
    try {
        const results = await excuteQuery({
            query: `SELECT requestDate, documentName AS DocumentType, purpose, status FROM documentrequest 
            INNER JOIN document ON documentrequest.documentID = document.documentID ORDER BY requestDate;`,
            values: [],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}

//endPoint: http://localhost:3000/api/document/getDocBookingStatus