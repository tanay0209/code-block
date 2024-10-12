import mongoose from "mongoose";
import { UserModel } from "./user.model";


interface ICodeSchema {
    code: {
        html: string,
        css: string,
        javascript: string
    },
    user: mongoose.Types.ObjectId,
    username: string,
    title: string
}

const CodeSchema: mongoose.Schema = new mongoose.Schema<ICodeSchema>({
    code: {
        html: String,
        css: String,
        javascript: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String,
    title: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const CodeModel = (mongoose.models.Code as mongoose.Model<ICodeSchema>) || mongoose.model<ICodeSchema>("Code", CodeSchema)
