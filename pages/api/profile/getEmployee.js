import excuteQuery from '../../../config/db';

export default async(req, res) => {

    let positionid = req.headers.positionid
    
    try {
        const result = await excuteQuery({
            query: `SELECT * FROM promotionhistory WHERE positionName = ? AND ISNULL(stopDate);`,
            values: [positionid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}