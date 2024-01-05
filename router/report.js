const express = require("express");
const multiparty = require("connect-multiparty");
const reportController = require("../controllers/report");
const md_auth = require("../middlewares/authenticated");

const md_updload = multiparty({ uploadDir: "./uploads/course" });
const api = express.Router();


api.get("/clientsforreport", [md_auth.asureAuth,md_auth.roleAuth], reportController.clientsReport);
api.get("/clienttransactions/:id", [md_auth.asureAuth,md_auth.roleAuth], reportController.clientTransactions);

api.get("/coursesforreport", [md_auth.asureAuth,md_auth.roleAuth], reportController.coursesForReport);
// api.get("/coursestransactions/:id", [md_auth.asureAuth,md_auth.roleAuth], reportController.clientTransactions);

module.exports = api;
