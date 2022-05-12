import excuteQuery from '../../../../config/db';

export default async (req, res) => {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM LeaveType",
            values: [],
        });
        res.status(200)
    } catch (error) {
        res.status(500);
    }
}