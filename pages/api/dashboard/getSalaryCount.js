import excuteQuery from '../../../config/db';

export default async (req, res) => {

    try {
        const result = await excuteQuery({
            query: "SELECT employeeID, salary FROM promotionhistory WHERE stopDate IS NULL",
            values: [], 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}