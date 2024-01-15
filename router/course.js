const express = require("express");
const courseController = require("../controllers/course");
const md_auth = require("../middlewares/authenticated");
const multiparty = require("connect-multiparty");
const md_updload = multiparty({ uploadDir: "./uploads/course" });

const api = express.Router();

api.post("/course",[md_auth.asureAuth, md_updload],courseController.createCourse);
api.get("/courses", courseController.getCourse);

api.get("/allcourses", courseController.getAllCourses);
api.patch("/course/:id",[md_auth.asureAuth, md_updload],courseController.updateCourse);
api.delete("/course/:id", [md_auth.asureAuth], courseController.deleteCourse);


module.exports = api;
