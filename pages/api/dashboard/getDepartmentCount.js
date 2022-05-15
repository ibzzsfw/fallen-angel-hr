import excuteQuery from '../../../config/db';

export default async (req, res) => {

    try {
        const result = await excuteQuery({
            query: "SELECT departmentName, COUNT(promotionhistory.positionName) AS countDepartment FROM promotionhistory INNER JOIN position ON promotionhistory.positionName = position.positionID LEFT JOIN department ON position.departmentID = department.departmentID WHERE promotionhistory.stopDate IS NULL GROUP BY department.departmentID",
            values: [], 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}