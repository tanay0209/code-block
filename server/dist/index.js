"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const dbConnect_1 = require("./lib/dbConnect");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compiler_route_1 = __importDefault(require("./routes/compiler.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true, origin: process.env.CLIENT_URL }));
app.set("trust proxy", 1);
(0, dbConnect_1.dbConnect)();
app.use("/compiler", compiler_route_1.default);
app.use("/user", user_route_1.default);
app.listen(PORT, () => {
    console.log("Server is running");
});
