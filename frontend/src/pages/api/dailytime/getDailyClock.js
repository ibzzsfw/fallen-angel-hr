import excuteQuery from '../../../../config/db';

export default async (req, res) => {

    let employeeID = '1ac39e28-8e18-4a54-b56a-14a53fac104c'
    let date = new Date(2022, 2, 1);

    try {
        const result = await excuteQuery({
            query: "SELECT clockIn, clockOut FROM DailyTime WHERE employeeID = ? AND date = ?",
            values: [employeeID, date],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}