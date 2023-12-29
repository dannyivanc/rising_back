const express = require("express");
const TransactionController = require("../controllers/transaction");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/transaction", TransactionController.createTransaction);
api.get("/transaction/:clientid",[md_auth.asureAuth,md_auth.roleAuth], TransactionController.getTransactions);
api.get("/transactionverificate/:transactionid",[md_auth.asureAuth], TransactionController.getVerificateTransaction);
api.delete("/transaction/:id", [md_auth.asureAuth,md_auth.roleAuth], TransactionController.deleteTransaction);

api.get("/transactionsend",[md_auth.asureAuth], TransactionController.getTransactionsSend);
api.patch("/transactionupdate/:id",[md_auth.asureAuth],TransactionController.updateTransaction);


module.exports = api;
