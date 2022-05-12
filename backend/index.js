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
import StatusTab from "./controllers/Controller.js";
import ShowNotification from './controllers/Controller.js';
import ShowDocumentName from './controllers/Controller.js';
import ShowBankAccount from './controllers/Controller.js';
import ShowLeaveRemain from './controllers/Controller.js';
import SummaryLeave from './controllers/Controller.js';
import AbsentTab from './controllers/Controller.js';
import TableBookingStatus from './controllers/Controller.js';


// import UserRole from './controllers/Controller.js';
// import ShowInfo from './controllers/Controller.js';
// import ShowEducation from './controllers/Controller.js';
// import ShowPromotionHistory from './controllers/Controller.js';
// import IncomeByMonth from './controllers/Controller.js';
// import ShowPositionName from './controllers/Controller.js';
// import CountStatus from './controllers/Controller.js';
// import RequestLeave from './controllers/Controller.js';
// import Controller from "./controllers/Controller.js";


const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    port: '3306',
    user: 'b3c6b9362228e6',
    password: '53446057',
    database: 'heroku_174ba6c18c17d0c',
});

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3306, () => console.log("server is running on port 3306"));


app.get("/getLeaveType", (req, res) => {
    connection.query("SELECT * FROM LeaveType", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.get('/ShowCardBookingStatus', (req, res) => Controller.CardBookingStatus(req, res, connection));
app.get('/ShowTableBookingStatus', (req, res) => Controller.TableBookingStatus(req, res, connection));
app.get('/ShowAbsentTab', (req, res) => Controller.AbsentTab(req, res, connection));
app.get('/ShowLeaveRemain', (req, res) => Controller.ShowLeaveRemain(req, res, connection));
app.get('/getBankAccount', (req, res) => Controller.ShowBankAccount(req, res, connection));
app.get('/ShowSummaryLeave', (req, res) => Controller.SummaryLeave(req, res, connection));

app.get('/getBankAccount', (req, res) => Controller.ShowBankAccount(req, res, connection));

app.get("/ShowNotification", (req, res) => Controller.ShowNotification(req, res, connection));

//app.get("/getShowNotification", (req, res) => Controller.ShowNotification(req, res, connection));
//app.get("/getStatusTab", (req, res) => Controller.StatusTab(req, res, connection));
//app.get("/ShowDocumentName", (req, res, connection) => Controller.ShowDocumentName(req, res, connection));
//app.get("/getShowInfo", (req, res) => Controller.ShowInfo(req, res, connection));


// app.get("/getUserRole", (req, res) => Controller.UserRole(req, res, connection));
//app.get("/getShowInfo", (req, res) => Controller.ShowInfo(req, res, connection));
//app.get("/getShowEducation", (req, res) => Controller.ShowEducation(req, res, connection));
//app.get("/getShowPromotionHistory", (req, res) => Controller.ShowProtionmoHistory(req, res, connection));
//app.get("/getIncomeByMonth", (req, res) => Controller.IncomeByMonth(req, res, connection));
//app.get("/getShowPositionName", (req, res) => Controller.ShowPoitionName(req, res, connection));
//app.get("/getLeaveCount", (req, res) => Controller.CountStatus(req, res, connection));
//app.get("/geRequestLeave", (req, res) => Controller.RequestLeave(req, res, connection));