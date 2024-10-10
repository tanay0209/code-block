import express, { Router } from "express";
import { logout, signup, login, userDetails } from "../controllers/user.controller";
import { verifyToken } from "../middleware/verify-token";

const UserRouter: Router = express.Router()

UserRouter.post("/signup", signup)
UserRouter.post("/login", login)
UserRouter.get("/logout", logout)
UserRouter.get("/user-details", verifyToken, userDetails)

export default UserRouter