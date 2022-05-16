import excuteQuery from '../../../config/db';

//ไม่แน่ใจต้อง status = 'waiting' ไหม
export default async(req, res) => {

    let confirmation = req.body.confirmation;
    //let status = 'approved' || 'rejected';
    let requestid = req.body.requestid;

    try {

        if (confirmation == 'reject') {
            const results = await excuteQuery({
                query: `UPDATE documentRequest SET status = ? WHERE requestID = ?`,
                values: [confirmation, requestid],
            });
            res.status(200).json(results);
        } else if (confirmation == 'approved') {
            const results = await excuteQuery({
                query: `UPDATE documentRequest SET status = ? WHERE requestID = ?`,
                values: [confirmation, requestid],
            });
            res.status(200).json(results);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


//endPoint: http://localhost:3000/api/document/getDocumentResponse