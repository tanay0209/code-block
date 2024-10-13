"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connection = {};
const dbConnect = async () => {
    if (connection.isConnected) {
        console.log("DB already connected");
        return;
    }
    try {
        const db = await mongoose_1.default.connect(process.env.MONGODB_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected");
    }
    catch (error) {
        console.log("DB connected failed", error);
        process.exit(1);
    }
};
exports.dbConnect = dbConnect;
