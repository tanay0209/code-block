import express, { Router } from "express"
import { saveCode } from "../controllers/compiler.controller"

const compilerRoutes: Router = express.Router()


compilerRoutes.post("/save", saveCode)


export default compilerRoutes