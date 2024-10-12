import express, { Router } from "express";
import { logout, signup, login, userDetails } from "../controllers/user.controller";
import { verifyToken } from "../middleware/verify-token";
import { getUserCodes } from "../controllers/compiler.controller";

const UserRouter: Router = express.Router()

UserRouter.post("/signup", signup)
UserRouter.post("/login", login)


UserRouter.get("/logout", logout)
UserRouter.get("/user-details", verifyToken, userDetails)
UserRouter.get("/my-codes", verifyToken, getUserCodes)

export default UserRouter