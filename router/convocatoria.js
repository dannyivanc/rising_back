const express = require("express");
const convocatoriaController = require("../controllers/convocatoria");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();
api.post("/convocatoria", [md_auth.asureAuth], convocatoriaController.createConvocatoria);
api.get("/convocatoria", convocatoriaController.getConvocatorias);
api.patch("/convocatoria/:id",[md_auth.asureAuth],convocatoriaController.updateConvocatoria);
api.delete("/convocatoria/:id", [md_auth.asureAuth], convocatoriaController.deleteConvocatoria);
api.get("/convocatoria/:path", convocatoriaController.getConvocatoria);
api.delete("/deletePrevConvocatorias/:fecha", [md_auth.asureAuth], convocatoriaController.deletePrevConvocatorias);
module.exports = api;
