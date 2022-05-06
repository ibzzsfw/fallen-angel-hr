import express from "express";
import mysql from 'mysql2';
import cors from "cors";

// controllers import
import UserRole from './controllers/Controller.js';
import ShowInfo from './controllers/Controller.js';
import ShowEducation from './controllers/Controller.js';
import ShowPromotionHistory from './controllers/Controller.js';
import IncomeByMonth from './controllers/Controller.js';
import ShowPositionName from './controllers/Controller.js';
import CountStatus from './controllers/Controller.js';
import RequestLeave from './controllers/Controller.js';
import Controller from "./controllers/Controller.js";

const connection = mysql.createConnection({
    host: 'SG-fallen-angel-hr-6098-mysql-master.servers.mongodirector.com',
    port: '3306',
    user: 'sgroot',
    password: '9cCzZPgxx,yn3g1B',
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

//app.get("/getShowInfo", (req, res) => Controller.ShowInfo(req, res, connection));





// app.get("/getUserRole", (req, res) => Controller.UserRole(req, res, connection));
//app.get("/getShowInfo", (req, res) => Controller.ShowInfo(req, res, connection));
//app.get("/getShowEducation", (req, res) => Controller.ShowEducation(req, res, connection));
//app.get("/getShowPromotionHistory", (req, res) => Controller.ShowProtionmoHistory(req, res, connection));
//app.get("/getIncomeByMonth", (req, res) => Controller.IncomeByMonth(req, res, connection));
//app.get("/getShowPositionName", (req, res) => Controller.ShowPoitionName(req, res, connection));
//app.get("/getLeaveCount", (req, res) => Controller.CountStatus(req, res, connection));
//app.get("/geRequestLeave", (req, res) => Controller.RequestLeave(req, res, connection));

app.listen(3306, () => console.log("server is running on port 3306"));