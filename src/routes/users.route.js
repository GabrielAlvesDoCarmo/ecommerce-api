"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var users_controller_1 = require("../controllers/users.controller");
exports.userRouter = express_1.default.Router();
// Get all Users
exports.userRouter.get("/users", users_controller_1.UsersController.getAll);
//Get user for id
exports.userRouter.get("/users/:id", users_controller_1.UsersController.getById);
//Put change data user
exports.userRouter.put("/users/:id", users_controller_1.UsersController.change);
// Post send user
exports.userRouter.post("/users", users_controller_1.UsersController.save);
//Delete user
exports.userRouter.delete("/users/:id", users_controller_1.UsersController.delete);
