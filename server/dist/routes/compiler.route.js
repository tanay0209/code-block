"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compiler_controller_1 = require("../controllers/compiler.controller");
const compilerRoutes = express_1.default.Router();
compilerRoutes.post("/save", compiler_controller_1.saveCode);
exports.default = compilerRoutes;
