"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CodeSchema = new mongoose_1.default.Schema({
    code: {
        html: String,
        css: String,
        javascript: String
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String,
    title: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.CodeModel = mongoose_1.default.models.Code || mongoose_1.default.model("Code", CodeSchema);
