import mongoose from "mongoose";
import { UserModel } from "./user.model";


interface ICodeSchema {
    code: {
        html: string,
        css: string,
        javascript: string
    },
    user: mongoose.Schema.Types.ObjectId,
    username: string
}

const CodeSchema: mongoose.Schema = new mongoose.Schema<ICodeSchema>({
    code: {
        html: String,
        css: String,
        javascript: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    },
    username: String
}, { timestamps: true })


export const CodeModel = (mongoose.models.Code as mongoose.Model<ICodeSchema>) || mongoose.model<ICodeSchema>("Code", CodeSchema)
