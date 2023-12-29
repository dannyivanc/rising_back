const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const clientRoutes = require("./router/client")
const transactionRoutes= require("./router/transaction")

const courseRoutes = require("./router/course");
const convocatoriaRoutes = require("./router/convocatoria");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static("uploads"));


app.use(cors());
// app.use('/',authRoutes)
app.use(`/`, authRoutes);
app.use(`/`, userRoutes);
app.use(`/`, clientRoutes);
app.use(`/`, transactionRoutes);
app.use(`/`, courseRoutes);
app.use(`/`, convocatoriaRoutes);





module.exports = app;
