import excuteQuery from '../../../config/db';

export default async(req, res) => {
    let employeeid = (req.headers.employeeid)
    try {
        const result = await excuteQuery({
            query: `SELECT firstName, lastName, identificationNo, DOB, sex, UserRole.roleName, employeeID,  email, 
            phoneNumber, address, bankName, bankAccount, photo, passwordHash FROM Information  INNER JOIN UserRole ON Information.roleID = UserRole.roleID WHERE employeeID = ?;`,
            values: [employeeid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}