import excuteQuery from '../../../config/db';


export default async(req, res) => {
    let results = await excuteQuery.transaction()
        .query(`INSERT INTO PromotionHistory(employeeID, positionName, startDate, stopDate, salary) 
    VALUES (?,?,?,?,?);`, [employeeid, positionname, startdate, enddate])

    .query()
        .query()
}