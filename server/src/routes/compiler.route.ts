import express, { Router } from "express"
import { getCode, saveCode } from "../controllers/compiler.controller"

const compilerRoutes: Router = express.Router()


compilerRoutes.post("/save", saveCode)
compilerRoutes.get("/get-code/:id", getCode)


export default compilerRoutes