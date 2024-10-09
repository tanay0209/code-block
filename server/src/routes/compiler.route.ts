import express, { Router } from "express"
import { getCode, saveCode } from "../controllers/compiler.controller"

const CompilerRouter: Router = express.Router()


CompilerRouter.post("/save", saveCode)
CompilerRouter.get("/get-code/:id", getCode)


export default CompilerRouter