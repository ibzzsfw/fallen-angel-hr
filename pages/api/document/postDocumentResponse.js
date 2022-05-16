import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let confirmation = req.body.confirmation;
    let requestid = req.body.requestid;

    try {

        if (confirmation == 'rejected') {
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