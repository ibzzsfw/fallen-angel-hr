import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let employeeid = req.headers.employeeid;

    try {
        const result = await excuteQuery({
            query: "SELECT sickRemain AS Sick, personalRemain AS Personal, vacationRemain AS Vacation, maternityRemain AS Materity FROM information WHERE employeeID = ?",
            values: [employeeid], 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}