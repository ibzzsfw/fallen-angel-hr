import excuteQuery from "../../../config/db";


export default async(req, res) => {
    let employeeid = (req.headers.employeeid)
    try {
        const result = await excuteQuery({
            query: "SELECT info.employeeID, info.firstName, info.lastName, info.phoneNumber, info.bankName, info.bankAccount, dpm.departmentName, pos.positionName FROM Information info INNER JOIN PromotionHistory pro ON info.employeeID = pro.employeeID AND pro.stopDate IS NULL LEFT JOIN Position pos ON pro.positionName = pos.positionID LEFT JOIN Department dpm ON pos.departmentID = dpm.departmentID WHERE info.employeeID = ?",
            values: [employeeid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}