import express from "express";
import mysql from 'mysql2';
import cors from "cors";

// controllers import
import UserRole from './controllers/userRole.js';

const connection = mysql.createConnection({
    host: 'SG-fallen-angel-hr-6098-mysql-master.servers.mongodirector.com',
    port: '3306',
    user: 'sgroot',
    password: 'VuFMRb4nI4Tj@e69',
    database: 'fallen-angel-hr',
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/getLeaveType", (req, res) => {
    connection.query("SELECT * FROM LeaveType", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
// app.get("/getUserRole", (req, res) => UserRole.UserRole(req, res, connection));

app.listen(3306, () => console.log("server is running on port 3306"));