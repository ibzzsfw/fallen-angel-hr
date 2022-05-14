import excuteQuery from '../../../config/db';

export default async(req, res) => {
    let departmentid = (req.headers.departmentid)
    try {
        const result = await excuteQuery({
            query: `SELECT positionName FROM position INNER JOIN department ON department.departmentID = position.departmentID WHERE position.departmentID = ?;`,
            values: [departmentid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}