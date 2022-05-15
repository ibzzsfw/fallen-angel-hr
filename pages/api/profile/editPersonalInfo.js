import excuteQuery from '../../../config/db';

export default async(req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let employeeid = '0e38af30-7a6a-4201-9584-42264f2684fc';
    let identificationno = req.body.identificationno;
    let sex = req.body.sex;
    try {
        const result = await excuteQuery({
            query: `UPDATE Information 
                    SET firstName = ?, lastName = ?, employeeid = ?, identificationNo = ?, sex = ?
                    WHERE employeeID = ?`,
            values: [firstname, lastname, employeeid, identificationno, sex, employeeid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

//endPoint: http://localhost:3000/api/profile/editPersonalInfo