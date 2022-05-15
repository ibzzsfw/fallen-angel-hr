import excuteQuery from '../../../config/db';

export default async(req, res) => {
    try {
        const results = await excuteQuery({
            query: `SELECT documentName AS Type ,COUNT(status) AS amount from document LEFT JOIN documentrequest 
            ON documentrequest.documentID = document.documentID GROUP BY documentName;`,
            values: [],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}

//endPoint: http://localhost:3000/api/document/getDocumentSummary