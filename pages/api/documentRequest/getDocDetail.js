import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let employeeid = req.headers.employeeid;

    try {
        const result = await excuteQuery({
            query: "SELECT documentRequest.*, documentName FROM documentRequest INNER JOIN document ON documentRequest.documentID = document.documentID WHERE employeeID = ?",
            values: [employeeid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}