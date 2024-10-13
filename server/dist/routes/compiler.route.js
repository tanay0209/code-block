"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compiler_controller_1 = require("../controllers/compiler.controller");
const verify_token_anonymous_1 = require("../middleware/verify-token-anonymous");
const verify_token_1 = require("../middleware/verify-token");
const CompilerRouter = express_1.default.Router();
CompilerRouter.post("/save", verify_token_anonymous_1.verifyTokenAnonymous, compiler_controller_1.saveCode);
CompilerRouter.get("/get-code/:id", verify_token_anonymous_1.verifyTokenAnonymous, compiler_controller_1.getCode);
CompilerRouter.get("/get-all-codes", compiler_controller_1.getAllCodes);
CompilerRouter.delete("/delete-code/:id", verify_token_1.verifyToken, compiler_controller_1.deleteCode);
CompilerRouter.put("/update-code/:id", verify_token_1.verifyToken, compiler_controller_1.updateCode);
exports.default = CompilerRouter;
