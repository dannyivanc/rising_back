const express = require("express");
const multiparty = require("connect-multiparty");
const convocatoriaController = require("../controllers/convocatoria");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/blog" });
const api = express.Router();

api.post("/convocatoria", [md_auth.asureAuth, md_upload], convocatoriaController.createConvocatoria);
api.get("/convocatoria", convocatoriaController.getConvocatorias);
api.patch("/convocatoria/:id",[md_auth.asureAuth, md_upload],convocatoriaController.updateConvocatoria);
api.delete("/convocatoria/:id", [md_auth.asureAuth], convocatoriaController.deleteConvocatoria);
api.get("/convocatoria/:path", convocatoriaController.getConvocatoria);
api.delete("/deletePrevConvocatorias/:fecha", [md_auth.asureAuth], convocatoriaController.deletePrevConvocatorias);
module.exports = api;
