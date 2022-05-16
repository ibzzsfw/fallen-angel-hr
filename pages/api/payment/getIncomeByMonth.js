import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let employeeid = req.headers.employeeid;

    try {
        const result = await excuteQuery({
            query: "SELECT salary, SUM(OTincome) AS overtime, DATE(clockOut) AS date, TIME(clockOut) AS clockOut, OTincome, SUM(salary + OTincome) AS sumIncome FROM otcalculate INNER JOIN promotionhistory ON otcalculate.employeeid = promotionhistory.employeeid WHERE otcalculate.employeeid = ? AND stopDate IS NULL GROUP BY MONTH(clockOut)",
            values: [employeeid], 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}