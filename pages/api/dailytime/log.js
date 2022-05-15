import excuteQuery from '../../../config/db';

export default async (req, res) => {

    let employeeid = req.headers.employeeid;
    let type = req.headers.type;

    try {
        const result = await excuteQuery({
            query: "SELECT DailyTime_view.date, TIME(DailyTime_view.clockIn) AS clockIn, TIME(DailyTime_view.clockOut) AS clockOut, DailyTime_view.type AS type, CAST((((pro.salary/30)/8)/60) * DailyTime_view.lateHrs AS DECIMAL(10,2)) AS lateEarlyDeduct, OTcalculate.OTincome FROM DailyTime_view INNER JOIN PromotionHistory pro ON DailyTime_view.employeeID = pro.employeeID LEFT JOIN OTcalculate ON DailyTime_view.employeeID = OTcalculate.employeeID AND DailyTime_view.date = DATE(OTcalculate.clockOut) WHERE DailyTime_view.employeeID = ? AND DailyTime_view.type != ? GROUP BY DailyTime_view.date",
            values: [employeeid, type], 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}