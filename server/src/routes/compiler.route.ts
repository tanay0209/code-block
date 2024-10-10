import express, { Router } from "express"
import { getCode, saveCode } from "../controllers/compiler.controller"
import { verifyTokenAnonymous } from "../middleware/verify-token-anonymous"

const CompilerRouter: Router = express.Router()


CompilerRouter.post("/save", verifyTokenAnonymous, saveCode)
CompilerRouter.get("/get-code/:id", getCode)


export default CompilerRouter