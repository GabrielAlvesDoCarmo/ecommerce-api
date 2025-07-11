import express, {Router} from "express";
import {UsersController} from "../controllers/users.controller";

export const userRouter: Router = express.Router();

// Get all Users
userRouter.get("/users", UsersController.getAll);
//Get user for id
userRouter.get("/users/:id", UsersController.getById);
//Put change data user
userRouter.put("/users/:id",UsersController.update);
// Post send user
userRouter.post("/users", UsersController.save);
//Delete user
userRouter.delete("/users/:id",UsersController.delete)