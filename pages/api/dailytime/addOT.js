import excuteQuery from '../../../config/db';

export default async(req, res) => {

    let employeeid = req.body.employeeid
    let clockout = req.body.date
    let positionid = req.body.positionid

    try {
        const results = await excuteQuery({
            query: "INSERT INTO overtime(employeeID, clockout, positionID) VALUES (?,?, ?);",
            values: [employeeid, clockout, positionid],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}