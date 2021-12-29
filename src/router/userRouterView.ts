import { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserValidator } from "../validator/UserValidator";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const userRouterView = Router();

userRouterView.get("/welcome", UserController.welcomePage);
userRouterView.get("/signup", UserController.signupPage);
userRouterView.get("/login", UserController.loginPage);
