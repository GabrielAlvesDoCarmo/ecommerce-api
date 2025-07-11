import express, {Router} from "express";
import {UsersController} from "../controllers/users.controller";
import asyncHandler from "express-async-handler";

export const userRouter: Router = express.Router();

// Get all Users
userRouter.get("/users", asyncHandler(UsersController.getAll));
//Get user for id
userRouter.get("/users/:id", asyncHandler(UsersController.getById));
//Put change data user
userRouter.put("/users/:id",asyncHandler(UsersController.update));
// Post send user
userRouter.post("/users", asyncHandler(UsersController.save));
//Delete user
userRouter.delete("/users/:id",asyncHandler(UsersController.delete));