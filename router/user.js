const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", [md_auth.asureAuth,md_auth.roleAuth], UserController.getUsers);
api.post("/user", [md_auth.asureAuth,md_auth.roleAuth], UserController.createUser);
api.patch("/user/:id",[md_auth.asureAuth,md_auth.roleAuth],UserController.updateUser);
api.delete("/user/:id", [md_auth.asureAuth,md_auth.roleAuth], UserController.deleteUser);

module.exports = api;
