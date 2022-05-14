import excuteQuery from '../../../config/db';

export default async(req, res) => {
    let firstname = req.headers.firstname;
    let lastname = req.headers.lastname;
    let employeeid = req.headers.employeeid;
    let identificationno = req.headers.identificationno;
    let dob = req.headers.dob;
    let sex = req.headers.sex;
    try {
        const result = await excuteQuery({
            query: `UPDATE Information 
                    SET firstName = ?, lastName = ?, employeeid = ?, identificationNo = ?, DOB = ?, sex = ?`,
            values: [firstname, lastname, employeeid, identificationno, dob, sex],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}