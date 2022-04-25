const UserRole = (req, res, connection) => {

    connection.query("SELECT * FROM UserRole", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

export default UserRole;