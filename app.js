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
const reportRoutes= require("./router/report")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static("uploads"));


app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Reemplaza con la URL de tu frontend
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

app.use(`/`, authRoutes);
app.use(`/`, userRoutes);
app.use(`/`, clientRoutes);
app.use(`/`, transactionRoutes);
app.use(`/`, courseRoutes);
app.use(`/`, convocatoriaRoutes);
app.use(`/`, reportRoutes);





module.exports = app;
