import express, { Router } from "express"
import { deleteCode, getAllCodes, getCode, saveCode, updateCode } from "../controllers/compiler.controller"
import { verifyTokenAnonymous } from "../middleware/verify-token-anonymous"
import { verifyToken } from "../middleware/verify-token"

const CompilerRouter: Router = express.Router()


CompilerRouter.post("/save", verifyTokenAnonymous, saveCode)

CompilerRouter.get("/get-code/:id", verifyTokenAnonymous, getCode)
CompilerRouter.get("/get-all-codes", getAllCodes)

CompilerRouter.delete("/delete-code/:id", verifyToken, deleteCode)

CompilerRouter.put("/update-code/:id", verifyToken, updateCode)


export default CompilerRouter