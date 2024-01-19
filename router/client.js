const express = require("express");
const ClientController = require("../controllers/client");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get("/clients", [md_auth.asureAuth], ClientController.getClients);
api.post("/client", [md_auth.asureAuth], ClientController.createClient);
api.patch("/client/:id",[md_auth.asureAuth],ClientController.updateClient);
api.delete("/client/:id", [md_auth.asureAuth], ClientController.deleteClient);

module.exports = api;
