import { db } from '../../../config/db';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {

    let employeeid = uuidv4()
    let roleid = req.body.roleid
    let positionid = req.body.positionid
    let identification = req.body.identification
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let sex = req.body.sex
    let email = req.body.email
    let bankname = req.body.bankname
    let bankaccount = req.body.bankaccount
    let password = req.body.password
    let salary = req.body.salary
    let maternityremain = (sex==='W') ? 90 : 0

    try {
        let result = await db.transaction()
            .query('INSERT INTO Information(employeeID, roleID, identificationNo, firstName, lastName, sex, email, passwordHash, bankName, bankAccount) VALUES (?,?,?,?,?,?,?,?,?,?);', [employeeid, roleid, identification, firstname, lastname, sex, email, password, bankname, bankaccount, maternityremain])
            .query('INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) VALUES (?,?,NOW(), NULL ,?);', [employeeid, positionid, salary])
            .commit()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}