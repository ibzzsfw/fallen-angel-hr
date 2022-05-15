import excuteQuery from '../../../config/db';
export default async (req, res) => {

    let status = req.headers.status;
    
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM Notification WHERE status = ?",
            values: [status],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}
