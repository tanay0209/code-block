import mongoose from "mongoose";
import { CodeModel } from "./code.model";

interface IUserSchema {
    email: string,
    username: string,
    password: string,
    picture: string,
    code: mongoose.Types.ObjectId[]
}

const UserSchema: mongoose.Schema = new mongoose.Schema<IUserSchema>({
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Code"
        }
    ]
}, { timestamps: true })


export const UserModel = (mongoose.models.User as mongoose.Model<IUserSchema>) || (mongoose.model<IUserSchema>("User", UserSchema))
