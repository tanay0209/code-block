"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const verify_token_1 = require("../middleware/verify-token");
const compiler_controller_1 = require("../controllers/compiler.controller");
const UserRouter = express_1.default.Router();
UserRouter.post("/signup", user_controller_1.signup);
UserRouter.post("/login", user_controller_1.login);
UserRouter.get("/logout", user_controller_1.logout);
UserRouter.get("/user-details", verify_token_1.verifyToken, user_controller_1.userDetails);
UserRouter.get("/my-codes", verify_token_1.verifyToken, compiler_controller_1.getUserCodes);
exports.default = UserRouter;
