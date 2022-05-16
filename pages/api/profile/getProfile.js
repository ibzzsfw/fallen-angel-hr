import excuteQuery from '../../../config/db';

export default async (req, res) => {
    let employeeid = (req.headers.employeeid)
    try {
        const result = await excuteQuery({
            query: `
SELECT
	Information.employeeID,
	Information.roleID,
	Information.identificationNo,
	Information.firstName,
	Information.lastName,
	Information.DOB AS dob,
	Information.sex,
	Information.phoneNumber,
	Information.email,
	Information.address,
	Information.photo,
	Information.bankName,
	Information.bankAccount,
	Position.positionName,
	Position.positionID
FROM
	Information INNER JOIN Promotionhistory ON Information.employeeID = Promotionhistory.employeeID
	INNER JOIN Position ON position.positionID = promotionHistory.positionName
WHERE
	ISNULL(Promotionhistory.stopDate)
	AND Information.employeeID = ?;`,
            values: [employeeid],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}