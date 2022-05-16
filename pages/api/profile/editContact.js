import excuteQuery from '../../../config/db';

export default async(req, res) => {
    let email = req.body.email;
    let phonenumber = req.body.phonenumber;
    let address = req.body.address;
    let employeeid = '0e38af30-7a6a-4201-9584-42264f2684fc';
    try {
        const result = await excuteQuery({
            query: `UPDATE Information 
                    SET email = ?, phoneNumber = ?, Address = ? WHERE employeeID = ?`,
            values: [email, phonenumber, address, employeeid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

//endPoint: http://localhost:3000/api/profile/editContact