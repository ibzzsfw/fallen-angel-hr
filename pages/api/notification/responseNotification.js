import excuteQuery from '../../../config/db';

export default async(req, res) => {

    let status = req.body.status
    let notificationid = req.body.notificationid

    try {
        const results = await excuteQuery({
            query: "UPDATE Notification SET status = ? WHERE notificationID = ?;",
            values: [status, notificationid],
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}