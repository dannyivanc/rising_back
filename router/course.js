const express = require("express");
const CourseController = require("../controllers/course");
const md_auth = require("../middlewares/authenticated");
const multiparty = require("connect-multiparty");
const md_updload = multiparty({ uploadDir: "./uploads/course" });

const api = express.Router();

api.post("/course",[md_auth.asureAuth, md_updload],CourseController.createCourse);
api.get("/course", CourseController.getCourse);
api.get("/allcourses", CourseController.getAllCourses);
api.patch("/course/:id",[md_auth.asureAuth, md_updload],CourseController.updateCourse);
api.delete("/course/:id", [md_auth.asureAuth], CourseController.deleteCourse);


module.exports = api;
