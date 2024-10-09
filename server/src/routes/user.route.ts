import express, { Router } from "express";
import { logout, signup, login } from "../controllers/user.controller";

const UserRouter: Router = express.Router()

UserRouter.post("/signup", signup)
UserRouter.post("/login", login)
UserRouter.get("/logout", logout)

export default UserRouter