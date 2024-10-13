"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        type: String,
        default: "https://imgs.search.brave.com/aFupscysGb87JhaIxF2caAgaJSPmcK6OJS6J5TUZyJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzEwLzQzLzc3/LzM2MF9GXzQxMDQz/NzczM19oZHE0UTNR/T0g5dXdoMG1jcUFo/UkZ6T0tmckNSMjRU/YS5qcGc"
    },
    code: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Code"
        }
    ]
}, { timestamps: true });
exports.UserModel = mongoose_1.default.models.User || (mongoose_1.default.model("User", UserSchema));
